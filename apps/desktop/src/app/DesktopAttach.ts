// Attaching to a pre-existing server deliberately uses the web pairing flow,
// not the privileged desktop bootstrap token owned by a spawned backend.
export const isSupportedAttachedBackendUrl = (url: URL): boolean =>
  url.protocol === "http:" &&
  (url.hostname === "127.0.0.1" || url.hostname === "[::1]" || url.hostname === "localhost") &&
  url.port.length > 0 &&
  url.username.length === 0 &&
  url.password.length === 0 &&
  url.pathname === "/" &&
  url.search.length === 0 &&
  url.hash.length === 0;
