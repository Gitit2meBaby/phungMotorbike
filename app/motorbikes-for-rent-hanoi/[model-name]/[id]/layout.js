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
        description: `${bike.model} ${bike.name} for rent at only $${bike.cityPrice}/day. Check capacity, price, and more details.`,
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
            ]
        }
    };
}

import { notFound } from 'next/navigation';
import React from 'react'; // Make sure to import React to use cloneElement

const BikeDetailLayout = async ({ children, params }) => {
    const { id, 'model-name': modelName } = params;

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const apiUrl = `${baseUrl}/api/bikes`;

    const res = await fetch(apiUrl);
    const bikes = await res.json();
    const bike = bikes.find(b => b.id === id && `${b.model.toLowerCase()}-${b.name.toLowerCase()}` === modelName);

    if (!bike) {
        return notFound(); // Handle 404 if no bike is found
    }

    const rentalSchema = {
        "@context": "https://schema.org",
        "@type": "RentalVehicle",
        "name": `${bike.model} ${bike.name}`,
        "model": `${bike.model}`,
        "image": bike.images[0].thumbURL,
        "description": `${bike.description}`,
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": `${bike.cityPrice}`,
            "itemCondition": "https://schema.org/UsedCondition",
            "availability": "https://schema.org/InStock"
        },
        "agent": "Phung Motorbike",
        "location": "13 Ngo Huyện, Hàng Trống, Hoàn Kiếm, Hanoi, Vietnam",
        "areaServed": "Hanoi, Vietnam",
        "email": "2wheelsvietnam@gmail.com",
        "keywords": `motorbike rental Hanoi, Vietnam scooter rental, Hanoi scooter rental`,
        "telephone": "+84 965 93 6677",
        "url": `https://phungmotorbike.com/motorbike-rentals-vietnam/${bike.model}-${bike.name}/${id}`,
        "currenciesAccepted": "VND, USD",
        "paymentAccepted": "Cash, Credit Card",
        "openingHours": ["Mo-Su 08:30-12:00, 13:00-18:00"],
    };

    return (
        <>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(rentalSchema) }}
                />
            </head>
            <section>{children}</section>
        </>
    );
};

export default BikeDetailLayout;
