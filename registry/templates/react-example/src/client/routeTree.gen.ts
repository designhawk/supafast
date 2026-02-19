import { rootRoute } from "./__root.tsx";
import { Route as rootRoute_0 } from "./routes/index.tsx";

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof rootRoute_0;
      parentRoute: typeof rootRoute;
    };
  }
}

export const routeTree = rootRoute.addChildren([rootRoute_0]);
