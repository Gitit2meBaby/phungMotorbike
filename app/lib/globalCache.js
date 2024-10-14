// app/lib/globalCache.js
import NodeCache from 'node-cache';

// Create a global cache instance
const globalCache = global.bikeCache || new NodeCache({ stdTTL: 0 });

// Ensure the cache persists across hot reloads in development
if (process.env.NODE_ENV !== 'production') {
    global.bikeCache = globalCache;
}

export default globalCache;