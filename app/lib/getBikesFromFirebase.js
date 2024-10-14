import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';

export async function getBikesFromFirebase() {
    const listingsCollection = collection(db, 'bikes');
    const snapshot = await getDocs(listingsCollection);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
}