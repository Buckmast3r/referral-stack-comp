/**
 * Retrieves a cookie value by name on the client side.
 * @param name - The name of the cookie to retrieve.
 * @returns The cookie value or null if not found.
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null; // Ensure this runs only on the client
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}
