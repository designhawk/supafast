// No-op stub for privacy-friendly version (manual updates only)
export function useUpdateNotifications() {
  return {
    checkForUpdates: () => Promise.resolve(),
    quitAndInstall: () => {},
    status: null,
  };
}
