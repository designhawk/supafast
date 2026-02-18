import { Button } from "@/client/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/client/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle } from "@/client/components/ui/sheet";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect, useState } from "react";

import { rpcClient } from "../rpc/client";

export function DevTools() {
  const navigate = useNavigate();
  const [routerPanelIsOpen, setRouterPanelIsOpen] = useState(false);
  const [queryPanelIsOpen, setQueryPanelIsOpen] = useState(false);
  const [analyticsDialogIsOpen, setAnalyticsDialogIsOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function subscribeToDebugEvents() {
      const subscriptions = await Promise.all([
        rpcClient.debug.live.openDebugPage.call(),
        rpcClient.debug.live.openRouterDevtools.call(),
        rpcClient.debug.live.openQueryDevtools.call(),
        rpcClient.debug.live.openAnalyticsToolbar.call(),
      ]);

      const [debugPageSub, routerSub, querySub, analyticsSub] = subscriptions;

      void (async () => {
        for await (const _ of debugPageSub) {
          if (isCancelled) {
            break;
          }
          void navigate({ to: "/debug" });
        }
      })();

      void (async () => {
        for await (const _ of routerSub) {
          if (isCancelled) {
            break;
          }
          setRouterPanelIsOpen(true);
        }
      })();

      void (async () => {
        for await (const _ of querySub) {
          if (isCancelled) {
            break;
          }
          setQueryPanelIsOpen(true);
        }
      })();

      void (async () => {
        for await (const _ of analyticsSub) {
          if (isCancelled) {
            break;
          }
          setAnalyticsDialogIsOpen(true);
        }
      })();
    }

    void subscribeToDebugEvents();

    return () => {
      isCancelled = true;
    };
  }, [navigate]);

  return (
    <>
      <Sheet onOpenChange={setRouterPanelIsOpen} open={routerPanelIsOpen}>
        <SheetContent className="h-1/2 p-0" side="bottom">
          <SheetTitle className="sr-only">React Router Devtools</SheetTitle>
          <div className="h-full overflow-hidden text-xs">
            <TanStackRouterDevtoolsPanel
              className="h-full"
              setIsOpen={setRouterPanelIsOpen}
            />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet onOpenChange={setQueryPanelIsOpen} open={queryPanelIsOpen}>
        <SheetContent className="h-1/2 p-0" side="bottom">
          <SheetTitle className="sr-only">React Query Devtools</SheetTitle>
          <div className="h-full overflow-hidden text-xs">
            <ReactQueryDevtoolsPanel
              onClose={() => {
                setQueryPanelIsOpen(false);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>

      <Dialog
        onOpenChange={setAnalyticsDialogIsOpen}
        open={analyticsDialogIsOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Analytics Toolbar</DialogTitle>
            <DialogDescription>
              Analytics tracking is disabled in privacy mode.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              PostHog analytics has been removed for privacy compliance. The
              toolbar functionality is disabled.
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setAnalyticsDialogIsOpen(false);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
