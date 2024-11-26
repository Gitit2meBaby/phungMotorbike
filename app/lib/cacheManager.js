import globalCache from "./globalCache";

// Client-side cache clearing
export function clearClientCache() {
  console.log("Clearing client cache at:", new Date().toISOString());
  globalCache.flushAll();
  console.log("Client cache cleared");
}
