import Image from 'next/image';

export default async function BikeDetailPage({ params }) {
    const { id, 'model-name': modelName } = params;

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const apiUrl = `${baseUrl}/api/bikes`;

    const res = await fetch(apiUrl);
    const bikes = await res.json();
    const bike = bikes.find(b => b.id === id && `${b.model.toLowerCase()}-${b.name.toLowerCase()}` === modelName);

    if (!bike) {
        return <p>Bike details not found.</p>;
    }

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
            <p>{bike.description}</p>
        </div>
    );
}
