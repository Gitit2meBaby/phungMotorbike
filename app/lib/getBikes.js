import globalCache from './globalCache';
import { getBikesFromFirebase } from './getBikesFromFirebase';

// Key for storing all bikes
const ALL_BIKES_KEY = 'ALL_BIKES';

export async function getBikes(filters = {}) {
    // Check the cache first
    let allBikes = globalCache.get(ALL_BIKES_KEY);

    if (!allBikes) {
        console.log('Fetching all bikes from Firebase');
        try {
            allBikes = await getBikesFromFirebase();

            // Transform the bikes data to ensure it's serializable
            allBikes = allBikes.map(bike => ({
                id: bike.id,
                type: bike.type,
                timestamp: bike.timestamp ? {
                    seconds: bike.timestamp.seconds,
                    nanoseconds: bike.timestamp.nanoseconds
                } : null,
                images: bike.images,
                capacity: bike.capacity,
                cityPrice: bike.cityPrice,
                description: bike.description,
                salePrice: bike.salePrice,
                model: bike.model,
                travelPrice: bike.travelPrice,
                monthPrice: bike.monthPrice,
                name: bike.name
            }));

            // Store the fetched bikes in the cache
            globalCache.set(ALL_BIKES_KEY, allBikes);

        } catch (error) {
            if (error.code === 'resource-exhausted' || error.message.includes('quota exceeded')) {
                alert("Error: Quota exceeded. Please try again later."); 
            } else {
                console.error("Error fetching bikes from Firebase:", error);
            }
        }
    } else {
        console.log('Using cached bikes');
    }

    // Apply filters and return bikes
    return allBikes ? allBikes.filter(bike => {
        for (const [key, value] of Object.entries(filters)) {
            if (bike[key] !== value) return false;
        }
        return true;
    }) : [];
}
