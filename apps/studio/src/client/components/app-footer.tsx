import { PRODUCT_NAME } from "@quests/shared";

export function AppFooter() {
  return (
    <footer className="w-full px-8 py-4">
      <p className="text-center text-xs text-muted-foreground">
        {PRODUCT_NAME} - Local AI Development Environment
      </p>
    </footer>
  );
}
