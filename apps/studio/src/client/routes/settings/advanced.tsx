import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/advanced")({
  component: SettingsAdvancedPage,
});

function SettingsAdvancedPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-accent/30 p-4 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Advanced settings are available in local-only mode.
        </p>
      </div>
    </div>
  );
}
