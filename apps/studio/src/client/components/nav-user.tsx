import { Button } from "@/client/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/client/components/ui/sidebar";
import { SettingsIcon } from "lucide-react";
import { rpcClient } from "@/client/rpc/client";

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="group">
        <SidebarMenuButton
          className="px-1 group-hover:bg-black/10 dark:group-hover:bg-white/10"
          onClick={() => {
            void rpcClient.preferences.openSettingsWindow.call({
              tab: "General",
            });
          }}
          size="default"
        >
          <SettingsIcon className="size-5" />
          <div className="grid flex-1 text-left text-sm/tight">
            <span className="truncate font-medium">Settings</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
