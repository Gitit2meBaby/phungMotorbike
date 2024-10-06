// import { collection, getDocs, query, orderBy } from 'firebase/firestore';
// import { db } from './firebase';
// import { cache } from 'react';

// const listingsCollection = collection(db, 'bikes');

// export const getBikes = cache(async () => {
//     const bikeQuery = query(
//         listingsCollection,
//         orderBy('cityPrice', 'asc')
//     );

//     const snapshot = await getDocs(bikeQuery);
//     return snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//     }));
// });

// // Optionally, if you want to revalidate the data periodically:
// export const revalidate = 36000; // revalidate every 10 hours

import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { cache } from 'react';

const listingsCollection = collection(db, 'bikes');

// Cache the data so it doesn't re-fetch unnecessarily
export const getBikes = cache(async (filters = {}) => {
    const { type, cityPrice, capacity } = filters;

    // Build Firebase query based on filters
    let bikeQuery = query(listingsCollection);

    // Filter by type if provided
    if (type) {
        bikeQuery = query(bikeQuery, where('type', '==', type));
    }

    // Sort by cityPrice or capacity if provided
    if (cityPrice) {
        bikeQuery = query(bikeQuery, orderBy('cityPrice', cityPrice));
    }
    if (capacity) {
        bikeQuery = query(bikeQuery, orderBy('capacity', capacity));
    }

    // Fetch data from Firestore
    const snapshot = await getDocs(bikeQuery);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
});

// Optionally, if you want to revalidate the data periodically:
export const revalidate = 36000; // Revalidate every 10 hours
