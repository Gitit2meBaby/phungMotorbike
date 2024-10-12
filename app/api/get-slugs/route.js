import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET(req) {
    const collectionRef = collection(db, 'bikes');
    const snapshot = await getDocs(collectionRef);
    const slugs = snapshot.docs.map(doc => doc.data().slug);

    return new Response(JSON.stringify({ slugs }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
