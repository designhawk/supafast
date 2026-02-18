import { defineConfig } from "@julr/vite-plugin-validate-env";
import { z } from "zod";

export default defineConfig({
  // Due to this env being used in Node, only use strings and string enums
  schema: {
    // MAIN_VITE_ prefix is available in the electron-main process
    MAIN_VITE_QUESTS_REGISTRY_DIR_PATH: z.string().optional(),
    // VITE_ prefix is available in all processes
    // No cloud/telemetry variables needed for local-only mode
  },
  validator: "standard",
});
