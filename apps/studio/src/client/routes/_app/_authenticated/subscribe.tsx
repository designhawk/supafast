// Local-only mode - subscription/billing disabled
import { StarryLayout } from "@/client/components/starry-layout";
import { createIconMeta } from "@/shared/tabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_authenticated/subscribe")({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        {
          title: "Subscribe",
        },
        createIconMeta("quests"),
      ],
    };
  },
});

function RouteComponent() {
  return (
    <StarryLayout>
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-2xl font-bold">Subscription</h1>
        <p className="text-muted-foreground">
          Subscription management is not available in local-only mode.
        </p>
        <p className="text-sm text-muted-foreground">
          Use your own AI provider API keys to access models.
        </p>
      </div>
    </StarryLayout>
  );
}
