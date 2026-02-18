// No-op stub for privacy-friendly version (no authentication)
export const auth = {} as const;
export const store = {
  codeVerifier: null,
  inviteCode: null,
  state: null,
};

export function createGoogleProvider() {
  return null;
}

export function decodeOAuthState(): null {
  return null;
}

export async function signInSocial() {
  throw new Error("Authentication disabled in local-only mode");
}

export async function signOut() {
  // No-op
}
