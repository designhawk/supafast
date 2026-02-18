// Local-only mode - no sign-in needed
export function useSignInSocial() {
  return {
    error: null,
    isPending: false,
    signIn: async () => {
      // No-op - authentication disabled in local-only mode
    },
  };
}
