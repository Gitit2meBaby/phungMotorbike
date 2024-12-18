// Utility function to clear cache (use when updating data)
// Focuses on clearing Nextjs cache
import globalCache from "./globalCache";

export function clearBikeCache() {
  globalCache.flushAll();
  console.log("Bike cache cleared");
}
