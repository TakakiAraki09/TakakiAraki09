
/**
 * State parameter data for OAuth flow (encoded in state parameter)
 */
export interface OAuthState {
  returnTo: string;
  nonce: string;
}

/**
 * PKCE code pair for OAuth authorization
 */
export interface PkcePair {
  codeVerifier: string;
  codeChallenge: string;
}
/**
 * Generate random bytes using Web Crypto API (works in both Node.js and browser)
 */
function getRandomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  // Use Web Crypto API (available in both Node.js 19+ and browsers)
  if (typeof globalThis.crypto !== "undefined" && globalThis.crypto.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    // Fallback for older Node.js versions
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nodeCrypto = require("node:crypto");
    const randomBytes = nodeCrypto.randomBytes(length);
    bytes.set(randomBytes);
  }
  return bytes;
}

/**
 * Convert bytes to base64url string
 */
function bytesToBase64Url(bytes: Uint8Array): string {
  // Convert to base64
  const base64 = btoa(String.fromCharCode(...bytes));
  // Convert to base64url (replace + with -, / with _, remove =)
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Generate a cryptographically secure code verifier for PKCE
 * MAL requires 43-128 characters from [A-Za-z0-9-._~]
 */
export function generateCodeVerifier(): string {
  // Generate 96 random bytes, encode as base64url (128 chars)
  const bytes = getRandomBytes(96);
  return bytesToBase64Url(bytes);
}

/**
 * Generate code challenge from code verifier
 * MAL only supports "plain" method (code_challenge = code_verifier)
 */
export function generateCodeChallenge(verifier: string): string {
  return verifier;
}

/**
 * Generate a PKCE pair (code_verifier and code_challenge)
 */
export function generatePkcePair(): PkcePair {
  const codeVerifier = generateCodeVerifier();
  return {
    codeVerifier,
    codeChallenge: generateCodeChallenge(codeVerifier),
  };
}

/**
 * Convert bytes to hex string
 */
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Encode string to base64url (isomorphic)
 */
function stringToBase64Url(str: string): string {
  // Use TextEncoder for UTF-8 encoding
  const bytes = new TextEncoder().encode(str);
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Decode base64url to string (isomorphic)
 */
function base64UrlToString(base64url: string): string {
  // Convert base64url to base64
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  // Add padding if needed
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Generate state parameter for CSRF protection
 * Encodes returnTo URL and a random nonce
 */
export function generateState(returnTo: string): string {
  const nonceBytes = getRandomBytes(16);
  const nonce = bytesToHex(nonceBytes);
  const stateData: OAuthState = { returnTo, nonce };
  return stringToBase64Url(JSON.stringify(stateData));
}

/**
 * Parse state parameter back to OAuthState
 * Returns null if parsing fails (potential tampering)
 */
export function parseState(state: string): OAuthState | null {
  try {
    const decoded = base64UrlToString(state);
    const parsed = JSON.parse(decoded) as unknown;
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "returnTo" in parsed &&
      "nonce" in parsed &&
      typeof parsed.returnTo === "string" &&
      typeof parsed.nonce === "string"
    ) {
      return parsed as OAuthState;
    }
    return null;
  } catch {
    return null;
  }
}
