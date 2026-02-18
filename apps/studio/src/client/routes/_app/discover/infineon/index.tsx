import { DiscoverPageLayout } from "@/client/components/discover-page-layout";
import { rpcClient } from "@/client/rpc/client";
import { createIconMeta } from "@/shared/tabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/discover/infineon/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Infineon Templates - Discover",
      },
      createIconMeta("infineon"),
    ],
  }),
  loader: async () => {
    const templates =
      await rpcClient.workspace.registry.template.listCustomTemplates.call();
    return {
      templates,
    };
  },
});

function RouteComponent() {
  const { templates } = Route.useLoaderData();

  return (
    <DiscoverPageLayout
      breadcrumbs={[
        { label: "Discover", to: "/discover" },
        { label: "Infineon Templates" },
      ]}
      category="templates"
      description="Infineon Design System components for enterprise applications"
      items={templates}
      title="Infineon Templates"
    />
  );
}
