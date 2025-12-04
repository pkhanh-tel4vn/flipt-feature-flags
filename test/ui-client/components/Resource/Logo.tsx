"use client";

import { useResource } from "./useResource";
import Image from "next/image";

interface LogoProps {
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: React.ReactNode;
}

export default function Logo({
  alt = "Logo",
  width = 100,
  height = 100,
  className,
  fallback,
}: LogoProps) {
  const resources = useResource();

  if (!resources?.logo) {
    return fallback ? <>{fallback}</> : null;
  }

  return (
    <Image
      src={resources.logo}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
