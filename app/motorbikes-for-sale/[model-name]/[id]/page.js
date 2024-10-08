import Image from 'next/image';
import { notFound } from 'next/navigation';

const BikeDetailPage = async ({ params }) => {
    const { id, 'model-name': modelName } = params;

    // Fetch all bikes from your initial API
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const apiUrl = `${baseUrl}/api/bikes`;

    try {
        const res = await fetch(apiUrl);

        if (!res.ok) {
            return notFound(); // Handle if the API does not return valid data
        }

        const bikes = await res.json();
        const bike = bikes.find(b => b.id === id && `${b.model.toLowerCase()}-${b.name.toLowerCase()}` === modelName);

        if (!bike) {
            return notFound(); // Show 404 if the bike isn't found in the list
        }

        // Return bike detail page with the bike's data
        return (
            <div>
                <h1>{bike.model} {bike.name}</h1>
                <Image
                    src={bike.images[0].thumbURL}
                    alt={`${bike.model} ${bike.name}`}
                    width={300}
                    height={225}
                />
                <p>Type: {bike.type}</p>
                <p>Capacity: {bike.capacity}cc</p>
                <p>Price: ${bike.cityPrice}/day, ${bike.monthPrice}/month</p>
            </div>
        );
    } catch (error) {
        console.error('Error fetching bike data:', error);
        return notFound();
    }
};

export default BikeDetailPage;
