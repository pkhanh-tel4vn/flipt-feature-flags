"use client";

import { createContext, useContext, ReactNode } from "react";

export interface ResourceData {
  logo?: string;
  cssUrl?: string;
}

const ResourceContext = createContext<ResourceData | null>(null);

export function ResourceProvider({
  children,
  resources,
}: {
  children: ReactNode;
  resources: ResourceData | null;
}) {
  return (
    <ResourceContext.Provider value={resources}>
      {children}
    </ResourceContext.Provider>
  );
}

export function useResource(): ResourceData | null {
  return useContext(ResourceContext);
}
