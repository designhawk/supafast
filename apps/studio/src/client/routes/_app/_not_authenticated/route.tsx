import { createFileRoute, Outlet } from "@tanstack/react-router";

// Route guard removed - local-only mode, no authentication required
export const Route = createFileRoute("/_app/_not_authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
