// No-op stub for privacy-friendly version (manual updates only)
export type AppUpdaterStatus = {
  type: "inactive";
  notifyUser: false;
};

export class StudioAppUpdater {
  public get status(): AppUpdaterStatus {
    return {
      notifyUser: false,
      type: "inactive",
    };
  }

  public async checkForUpdates() {
    // Auto-updater disabled in privacy mode - use manual updates
    return null;
  }

  public pollForUpdates() {
    // No-op - manual updates only
  }

  public quitAndInstall() {
    // No-op - manual updates only
  }
}
