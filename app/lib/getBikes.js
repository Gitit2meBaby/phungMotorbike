import { query, where, orderBy, getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';

// Declare the variables globally to hold the cached data
let cachedBikes = null;
let lastFetchTime = 0;
const CACHE_DURATION = 86400000 // 24 hours

export const getBikes = async (filters = {}, forceFirebase = false) => {
    const currentTime = Date.now();

    console.log('Force Firebase:', forceFirebase);
    console.log('Using Cached Data:', cachedBikes ? 'Yes' : 'No');

    // Check if cached data is still valid, unless forceFirebase is true
    if (!forceFirebase && cachedBikes && (currentTime - lastFetchTime < CACHE_DURATION)) {
        console.log('Returning cached bikes');
        return cachedBikes; // Return cached bikes
    }

    // Fallback to the Firebase query if forceFirebase is true or cache is stale
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
        cachedBikes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        lastFetchTime = currentTime;
        console.log('Fetched bikes from Firebase:', cachedBikes.length);

        return cachedBikes; // Return the fresh bikes data from Firebase
    } catch (error) {
        console.error('Error fetching bikes from Firebase:', error);
        throw new Error('Failed to fetch bikes from Firebase');
    }
};
