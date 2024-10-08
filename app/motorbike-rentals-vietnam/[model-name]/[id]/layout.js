export async function generateMetadata({ params }) {
    const { id, 'model-name': modelName } = params;

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const apiUrl = `${baseUrl}/api/bikes`;

    const res = await fetch(apiUrl);
    const bikes = await res.json();
    const bike = bikes.find(b => b.id === id && `${b.model.toLowerCase()}-${b.name.toLowerCase()}` === modelName);

    if (!bike) {
        return { title: 'Bike Not Found' };
    }

    return {
        title: `${bike.model} ${bike.name} - For rent in Hanoi, Vietnam`,
        description: `Rent the reliable and stylish ${bike.model} ${bike.name} in Hanoi, Vietnam, for just $${bike.cityPrice}/day. Perfect for exploring the city. Check pricing, capacity, and availability.`,
        keywords: `${bike.model} ${bike.name} ${bike.capacity}cc, Scooter Rental in Hanoi, Vietnam, ${bike.model} rental`,
        openGraph: {
            title: `${bike.model} ${bike.name}`,
            description: `Rent ${bike.model} ${bike.name} at a competitive rate of $${bike.cityPrice}/day.`,
            images: [
                {
                    url: bike.images[0].fullURL,
                    width: 600,
                    height: 450,
                    alt: `${bike.model} ${bike.name}`
                }
            ],
            locale: 'en_US',
            type: 'website',
        },
    };
}


import { notFound } from 'next/navigation';

const BikeDetailLayout = async ({ children, params }) => {
    const { id, 'model-name': modelName } = params;

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const apiUrl = `${baseUrl}/api/bikes`;

    const res = await fetch(apiUrl);
    const bikes = await res.json();
    const bike = bikes.find(b => b.id === id && `${b.model.toLowerCase()}-${b.name.toLowerCase()}` === modelName);

    if (!bike) {
        return notFound();
    }


    return (
        <>
            {children}
        </>
    );
};

export default BikeDetailLayout;
