// import NodeCache from 'node-cache';

// // Create a global cache instance
// let globalCache;

// // Check if running in Node.js environment
// if (typeof global !== 'undefined') {
//     // Use global for Node.js
//     globalCache = global.bikeCache || new NodeCache({ stdTTL: 0 });
//     // Ensure the cache persists across hot reloads in development
//     if (process.env.NODE_ENV !== 'production') {
//         global.bikeCache = globalCache;
//     }
// } else {
//     // Use a regular cache for client-side
//     globalCache = new NodeCache({ stdTTL: 0 });
// }

// export default globalCache;

