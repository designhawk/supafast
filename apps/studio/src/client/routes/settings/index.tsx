import { AccountInfo } from "@/client/components/account-info";
import { ThemeToggle } from "@/client/components/theme-toggle";
import { Button } from "@/client/components/ui/button";
import { Label } from "@/client/components/ui/label";
import { useTabActions } from "@/client/hooks/use-tab-actions";
import { rpcClient } from "@/client/rpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/")({
  component: SettingsGeneralPage,
});

function About() {
  const { data: appVersion, isLoading: isLoadingVersion } = useQuery(
    rpcClient.preferences.getAppVersion.queryOptions(),
  );

  const { addTab } = useTabActions();

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold">About</h3>
      </div>
      <div className="rounded-lg border bg-accent/30 p-4 shadow-sm">
        <div className="space-y-2">
          <div className="text-sm font-medium">Version</div>
          <div className="text-sm text-muted-foreground">
            {isLoadingVersion ? "Loading..." : appVersion?.version}
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-accent/30 p-4 shadow-sm">
        <div className="space-y-2">
          <div className="text-sm font-medium">Local Mode</div>
          <p className="text-sm text-muted-foreground">
            Running in local-only mode. All data stays on your computer.
          </p>
        </div>
      </div>
    </div>
  );
}

function InterfaceAndTheme() {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold">Interface</h3>
      </div>
      <div className="rounded-lg border bg-accent/30 p-4 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="theme-toggle">Theme</Label>
              <p className="text-sm text-muted-foreground">
                Choose your preferred color scheme.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsGeneralPage() {
  return (
    <div className="space-y-4">
      <AccountInfo />
      <InterfaceAndTheme />
      <About />
    </div>
  );
}
