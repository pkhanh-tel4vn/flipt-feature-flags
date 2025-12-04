"use client";

import { useMemo } from "react";

/**
 * Gets the current domain from window.location.hostname
 * Falls back to a default if not available (SSR)
 */
export function useDomain(): string {
  return useMemo(() => {
    if (typeof window !== "undefined") {
      //   return window.location.hostname;
      //   return "vexere.tel4vn.com";
      return "crm-phuongchau.tel4vn.com";
    }
    // Fallback for SSR or when window is not available
    return "";
  }, []);
}

/**
 * Gets the entity ID for Flipt evaluation
 * Can be customized based on your auth/user system
 */
export function useEntityId(): string {
  return useMemo(() => {
    // TODO: Replace with actual user ID from your auth system
    // For now, using a default value
    // You could get this from:
    // - localStorage.getItem('userId')
    // - Auth context (e.g., useUser() from your auth library)
    // - Session storage
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("flipt-entity-id");
      if (storedUserId) {
        return storedUserId;
      }
    }
    return "demo-user";
  }, []);
}

/**
 * Gets the Flipt context object with domain
 * Can be extended with additional context properties
 */
export function useFliptContext(): Record<string, string> {
  const domain = useDomain();

  return useMemo(() => {
    const context: Record<string, string> = {};

    if (domain) {
      context.domain = domain;
    }
    console.log(context);

    // Add more context properties here as needed
    // e.g., context.tenant = getTenant();
    // e.g., context.environment = getEnvironment();

    return context;
  }, [domain]);
}
