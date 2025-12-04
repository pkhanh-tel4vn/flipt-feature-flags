"use client";

import { useMemo, useCallback, useRef } from "react";
import {
  useFliptVariant,
  useFliptBoolean,
  useFliptSelector,
} from "@flipt-io/flipt-client-react";
import { useEntityId, useFliptContext } from "./useFliptContext";

// Type for FliptClient - matches the interface expected by useFliptSelector
interface FliptClient {
  evaluateVariant(params: {
    flagKey: string;
    entityId: string;
    context: Record<string, string>;
  }): {
    variantKey: string;
    variantAttachment?: string | null;
    match: boolean;
    reason: string;
  };
}

/**
 * Wrapper around useFliptVariant that automatically includes
 * domain and entityId from centralized context
 */
export function useFliptVariantWithContext(
  flagKey: string,
  fallback: string,
  additionalContext?: Record<string, string>
): string {
  const entityId = useEntityId();
  const context = useFliptContext();

  // Merge additional context with default context
  const mergedContext = {
    ...context,
    ...additionalContext,
  };

  return useFliptVariant(flagKey, fallback, entityId, mergedContext);
}

/**
 * Returns the full variant evaluation result including variantKey and attachments
 * Note: variantAttachment is a string (often JSON) that can be parsed if needed
 */
export function useFliptVariantWithAttachments(
  flagKey: string,
  fallback: string,
  additionalContext?: Record<string, string>
): {
  variantKey: string;
  variantAttachment: string | null;
  match: boolean;
  reason: string;
} {
  const entityId = useEntityId();
  const context = useFliptContext();

  // Merge additional context with default context - memoized to prevent recreating on every render
  // Using JSON.stringify for stable comparison of context objects
  const contextKey = useMemo(
    () => JSON.stringify({ ...context, ...additionalContext }),
    [context, additionalContext]
  );

  const mergedContext = useMemo(() => {
    return {
      ...context,
      ...additionalContext,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextKey]);

  // Create stable fallback value
  const fallbackResult = useMemo(
    () => ({
      variantKey: fallback,
      variantAttachment: null as string | null,
      match: false,
      reason: "ERROR",
    }),
    [fallback]
  );

  // Cache previous result to ensure stable reference
  const cachedResultRef = useRef<{
    variantKey: string;
    variantAttachment: string | null;
    match: boolean;
    reason: string;
  } | null>(null);

  // Memoize the selector function to ensure it's stable
  const selector = useCallback(
    (client: FliptClient | null, isLoading: boolean, error: Error | null) => {
      if (client && !isLoading && !error) {
        try {
          const evaluation = client.evaluateVariant({
            flagKey,
            entityId,
            context: mergedContext,
          });
          console.log(evaluation);
          const newResult = {
            variantKey: evaluation.variantKey,
            variantAttachment: evaluation.variantAttachment || null,
            match: evaluation.match,
            reason: evaluation.reason,
          };

          // Return cached result if values are the same (stable reference)
          if (
            cachedResultRef.current &&
            cachedResultRef.current.variantKey === newResult.variantKey &&
            cachedResultRef.current.variantAttachment ===
              newResult.variantAttachment &&
            cachedResultRef.current.match === newResult.match &&
            cachedResultRef.current.reason === newResult.reason
          ) {
            return cachedResultRef.current;
          }

          // Cache and return new result
          cachedResultRef.current = newResult;
          return newResult;
        } catch (e) {
          console.error(`Error evaluating variant flag ${flagKey}:`, e);
        }
      }

      // Handle fallback - also cache it for stability
      if (
        cachedResultRef.current &&
        cachedResultRef.current.variantKey === fallbackResult.variantKey &&
        cachedResultRef.current.variantAttachment ===
          fallbackResult.variantAttachment &&
        cachedResultRef.current.match === fallbackResult.match &&
        cachedResultRef.current.reason === fallbackResult.reason
      ) {
        return cachedResultRef.current;
      }

      cachedResultRef.current = fallbackResult;
      return fallbackResult;
    },
    [flagKey, entityId, mergedContext, fallbackResult]
  );

  const result = useFliptSelector(selector);

  return result;
}

export function useFliptBooleanVariantWithContext(
  flagKey: string,
  fallback: boolean,
  additionalContext?: Record<string, string>
): boolean {
  const entityId = useEntityId();
  const context = useFliptContext();

  const mergedContext = {
    ...context,
    ...additionalContext,
  };

  return useFliptBoolean(flagKey, fallback, entityId, mergedContext);
}

/**
 * Helper function to parse variantAttachment as JSON
 * Returns null if parsing fails or attachment is null
 */
export function parseVariantAttachment<T = Record<string, unknown>>(
  variantAttachment: string | null
): T | null {
  if (!variantAttachment) {
    return null;
  }

  try {
    return JSON.parse(variantAttachment) as T;
  } catch (e) {
    console.error("Failed to parse variantAttachment as JSON:", e);
    return null;
  }
}
