import { createRootRoute } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { IfxFooter, IfxNavbar, IfxNavbarItem } from "@infineon/infineon-design-system-react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <IfxNavbar application-name="React Example">
        <IfxNavbarItem slot="left-item" href="/" target="_self">
          Home
        </IfxNavbarItem>
      </IfxNavbar>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <IfxFooter />
      <ScrollRestoration />
    </>
  );
}
