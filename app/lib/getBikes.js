// import { query, where, orderBy, getDocs, collection } from 'firebase/firestore';
// import { db } from './firebase';

// // Declare the variables globally to hold the cached data
// let cachedBikes = null;
// let lastFetchTime = 0;
// const CACHE_DURATION = 86400000 // 24 hours

// export const getBikes = async (filters = {}, forceFirebase = false) => {
//     const currentTime = Date.now();

//     // Check if cached data is still valid, unless forceFirebase is true
//     if (!forceFirebase && cachedBikes && (currentTime - lastFetchTime < CACHE_DURATION)) {
//         return cachedBikes; // Return cached bikes
//     }

//     // Fallback to the Firebase query if forceFirebase is true or cache is stale
//     const { type, cityPrice, capacity } = filters;

//     const listingsCollection = collection(db, 'bikes');

//     let bikeQuery = query(listingsCollection);

//     if (type) {
//         bikeQuery = query(bikeQuery, where('type', '==', type));
//     }

//     if (cityPrice) {
//         bikeQuery = query(bikeQuery, orderBy('cityPrice', cityPrice));
//     }

//     if (capacity) {
//         bikeQuery = query(bikeQuery, orderBy('capacity', capacity));
//     }

//     try {
//         const snapshot = await getDocs(bikeQuery);
//         cachedBikes = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data(),
//         }));

//         lastFetchTime = currentTime;

//         return cachedBikes; // Return the fresh bikes data from Firebase
//     } catch (error) {
//         console.error('Error fetching bikes from Firebase:', error);
//         throw new Error('Failed to fetch bikes from Firebase');
//     }
// };

import { query, where, orderBy, getDocs, collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 86400 }); // 24 hours TTL
const CACHE_KEY = 'allBikes';

let unsubscribe = null;

// Setup real-time listener for changes
const setupRealtimeListener = () => {
    if (unsubscribe) unsubscribe();

    const bikesRef = collection(db, 'bikes');
    unsubscribe = onSnapshot(bikesRef, (snapshot) => {
        if (snapshot.docChanges().length > 0) {
            console.log('Changes detected in Firebase, invalidating cache');
            cache.del(CACHE_KEY);
        }
    });
};

export const getBikes = async (filters = {}, forceFirebase = false) => {
    if (!forceFirebase && cache.has(CACHE_KEY)) {
        console.log('Returning cached data');
        return cache.get(CACHE_KEY);
    }

    console.log('Fetching fresh data from Firebase');
    const { type, cityPrice, capacity } = filters;
    const listingsCollection = collection(db, 'bikes');
    let bikeQuery = query(listingsCollection);

    if (type) {
        bikeQuery = query(bikeQuery, where('type', '==', type));
    }
    if (cityPrice) {
        bikeQuery = query(bikeQuery, orderBy('cityPrice', cityPrice));
    }
    if (capacity) {
        bikeQuery = query(bikeQuery, orderBy('capacity', capacity));
    }

    try {
        const snapshot = await getDocs(bikeQuery);
        const bikes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        cache.set(CACHE_KEY, bikes);
        setupRealtimeListener(); // Setup listener after successful fetch

        return bikes;
    } catch (error) {
        console.error('Error fetching bikes from Firebase:', error);
        throw new Error('Failed to fetch bikes from Firebase');
    }
};