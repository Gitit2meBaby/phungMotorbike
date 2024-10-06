import { realtimeDb, storage } from '@/lib/firebase';
import { ref, get } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';

// Fetching bikes data and images for SEO purposes (Server-side or during build)
const getBikesData = async () => {
    try {
        const bikesSnapshot = await get(ref(realtimeDb, 'bikes'));
        const bikesData = bikesSnapshot.val();

        // Get images from Firebase Storage
        const bikesWithImages = await Promise.all(
            Object.keys(bikesData).map(async (key) => {
                const bike = bikesData[key];
                const imageURL = await getDownloadURL(storageRef(storage, `bikes/${bike.image}`));
                return { ...bike, imageURL };
            })
        );

        return bikesWithImages;
    } catch (error) {
        console.error('Error fetching bikes data:', error);
        return [];
    }
};

const Hanoi = async () => {
    const bikes = await getBikesData();

    return (
        <section>
            {bikes.length > 0 ? (
                bikes.map((bike) => (
                    <div key={bike.id}>
                        <h2>{bike.name}</h2>
                        <img src={bike.imageURL} alt={bike.name} />
                        <p>{bike.description}</p>
                    </div>
                ))
            ) : (
                <p>No bikes found.</p>
            )}
        </section>
    );
};

export default Hanoi;
