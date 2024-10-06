import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { cache } from 'react';

const listingsCollection = collection(db, 'bikes');

export const getBikes = cache(async () => {
    const bikeQuery = query(
        listingsCollection,
        orderBy('cityPrice', 'asc')
    );

    const snapshot = await getDocs(bikeQuery);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
});

// Optionally, if you want to revalidate the data periodically:
export const revalidate = 36000; // revalidate every 10 hours