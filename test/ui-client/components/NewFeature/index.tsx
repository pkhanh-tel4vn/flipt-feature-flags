"use client";

import { useFliptBooleanVariantWithContext } from "@/libs/feature-flags/useFliptVariantWithContext";

export default function NewFeature() {
  const isNewFeatureEnabled = useFliptBooleanVariantWithContext(
    "new-feature",
    false
  );
  console.log(isNewFeatureEnabled);

  return isNewFeatureEnabled ? <div>New Feature</div> : null;
}
