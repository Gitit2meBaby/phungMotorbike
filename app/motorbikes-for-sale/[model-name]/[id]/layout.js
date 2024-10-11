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
        title: `${bike.model} ${bike.name} - For sale in Hanoi, Vietnam`,
        description: `For sale, second hand ${bike.model} ${bike.name} in Hanoi, Vietnam. Perfect for exploring the city or travelling the countryside. Well maintained and reliable bikes for sale at Phung Motorbike.`,
        keywords: `${bike.model} ${bike.name} ${bike.capacity}cc, Scooters for sale in Hanoi, Vietnam, ${bike.model} for sale`,
        openGraph: {
            title: `${bike.model} ${bike.name}`,
            description: `Buy a ${bike.model} ${bike.name}${bike.capacity}cc for just ₫${bike.salePrice}.`,
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
    const apiUrl = `${baseUrl}/api/bikes?force=true`;

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
