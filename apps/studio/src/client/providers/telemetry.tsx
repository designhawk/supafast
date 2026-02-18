import type { ReactNode } from "react";

// No-op provider for privacy-friendly version
export function TelemetryProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
