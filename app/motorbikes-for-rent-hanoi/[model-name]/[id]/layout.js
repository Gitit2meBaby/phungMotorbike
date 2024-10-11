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
        description: `At Phung Motorbike, you can rent a ${bike.model} ${bike.name} at only $${bike.cityPrice}/day. Check capacity, price, and more details.`,
        keywords: `${bike.model} ${bike.name} ${bike.capacity}cc, Scooter Rental in Hanoi, Vietnam, ${bike.model} rental`,
        openGraph: {
            title: `${bike.model} ${bike.name}`,
            description: `Rent ${bike.model} ${bike.name} at a competitive rate of $${bike.cityPrice}/day.`,
            images: [
                {
                    url: bike.images[0].thumbURL,
                    width: 300,
                    height: 225,
                    alt: `${bike.model} ${bike.name}`
                }
            ],
            locale: 'en_US',
            type: 'website',
        }
    };
}

import { notFound } from 'next/navigation';
import React from 'react'; // Make sure to import React to use cloneElement

const BikeDetailLayout = async ({ children, params }) => {
    const { id, 'model-name': modelName } = params;

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const apiUrl = `${baseUrl}/api/bikes?force=true`;

    const res = await fetch(apiUrl);
    const bikes = await res.json();
    const bike = bikes.find(b => b.id === id && `${b.model.toLowerCase()}-${b.name.toLowerCase()}` === modelName);

    if (!bike) {
        return notFound(); // Handle 404 if no bike is found
    }

    return (
        <>
            {children}
        </>
    );
};

export default BikeDetailLayout;
