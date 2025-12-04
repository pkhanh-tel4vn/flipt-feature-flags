"use client";

import { useEffect, useMemo } from "react";
import {
  useFliptVariantWithAttachments,
  parseVariantAttachment,
} from "@/libs/feature-flags/useFliptVariantWithContext";
import { ResourceProvider, ResourceData } from "./ResourceContext";

export default function Resource({ children }: { children: React.ReactNode }) {
  const variants = useFliptVariantWithAttachments("tenant-resource", "");

  console.log(variants);
  // Extract resources from variant attachments
  const resources = useMemo<ResourceData | null>(() => {
    if (!variants?.variantAttachment) {
      return null;
    }

    const parsed = parseVariantAttachment<Record<string, string>>(
      variants.variantAttachment
    );

    if (!parsed) {
      return null;
    }

    return {
      logo: parsed["logo"],
      cssUrl: parsed["custom_css"],
    };
  }, [variants]);

  // Dynamically inject CSS when cssUrl is available
  useEffect(() => {
    if (!resources?.cssUrl) {
      return;
    }

    // Check if link already exists to avoid duplicates
    const existingLink = document.querySelector(
      `link[data-resource-css="${resources.cssUrl}"]`
    );

    if (existingLink) {
      return;
    }

    // Create and inject CSS link
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = resources.cssUrl;
    link.setAttribute("data-resource-css", resources.cssUrl);
    document.head.appendChild(link);

    // Cleanup function to remove link when component unmounts or cssUrl changes
    return () => {
      const linkToRemove = document.querySelector(
        `link[data-resource-css="${resources.cssUrl}"]`
      );
      if (linkToRemove) {
        linkToRemove.remove();
      }
    };
  }, [resources?.cssUrl]);

  return <ResourceProvider resources={resources}>{children}</ResourceProvider>;
}
