"use client";

import { useFliptVariantWithContext } from "@/libs/feature-flags/useFliptVariantWithContext";
import CCP from "../CCP";
import CRM from "../CRM";

export default function Feature() {
  const variant = useFliptVariantWithContext("service-type", "callcenter");
  console.log(variant);
  let component = <CCP />;
  if (variant === "callcenter") {
    component = <CCP />;
  } else if (variant === "pbx") {
    component = <CRM />;
  }
  return component;
}
