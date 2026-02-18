// Local-only mode - sign-in disabled
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { createIconMeta } from "@/shared/tabs";

export const Route = createFileRoute("/_app/_not_authenticated/sign-in")({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        {
          title: "Sign in",
        },
        createIconMeta("quests"),
      ],
    };
  },
});

function RouteComponent() {
  // Redirect to home - no sign-in needed in local-only mode
  return <Navigate to="/" />;
}
