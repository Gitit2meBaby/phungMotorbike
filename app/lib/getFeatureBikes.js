// app/lib/getFeatureBikes.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { cache } from 'react';

export const getFeatureBikes = cache(async () => {
    try {
        const bikesCollectionRef = collection(db, 'featureBikes');
        const bikesSnapshot = await getDocs(bikesCollectionRef);
        const bikesData = [];
        
        bikesSnapshot.forEach((doc) => {
            bikesData.push({ id: doc.id, ...doc.data() });
        });
        
        return bikesData;
    } catch (error) {
        console.error("Error fetching featured bikes:", error);
        return [];
    }
});