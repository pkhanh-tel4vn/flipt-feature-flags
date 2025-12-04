"use client";

import { FliptProvider } from "@flipt-io/flipt-client-react";

const FeatureFlag = ({ children }: { children: React.ReactNode }) => {
  return (
    <FliptProvider
      options={{
        environment: "Development",
        namespace: "tel4vn",
        url: "http://localhost:8080",
        authentication: {
          clientToken: "s3cr3t!",
        },
      }}
    >
      {children}
    </FliptProvider>
  );
};

export default FeatureFlag;
