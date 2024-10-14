// Utility function to clear cache (use when updating data)
export function clearBikeCache() {
    globalCache.flushAll();
    console.log('Bike cache cleared');
}