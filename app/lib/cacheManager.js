import globalCache from "./globalCache";

// Client-side cache clearing
export function clearClientCache() {
  globalCache.flushAll();
  console.log("Client-side cache cleared");
}
