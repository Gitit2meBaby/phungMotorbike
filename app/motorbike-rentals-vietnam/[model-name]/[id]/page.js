import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const SimilarBikes = dynamic(() => import('../../../../components/SimilarBikes'), { ssr: false });

export default async function BikeDetailPage({ params }) {
    const { id } = params;

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const apiUrl = `${baseUrl}/api/bikes/?force=true`;

    const res = await fetch(apiUrl, {
        next: { revalidate: 0 }
    });

    if (!res.ok) {
        console.error('Failed to fetch bike data:', res.statusText);
        return <p>Error fetching bike data.</p>;
    }

    const bikes = await res.json();

    const bike = bikes.find(b => b.id === id);

    if (!bike || bike.message === 'Bike not found') {
        return <p>Bike details not found.</p>;
    }

    // Dynamic schema generation
    const rentalSchema = {
        "@context": "https://schema.org",
        "@type": "Vehicle",
        "name": `${bike.name}`,
        "brand": {
            "@type": "Brand",
            "name": bike.model
        },
        "model": bike.name,
        "image": bike.images[0].thumbURL,
        "description": bike.description,
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": bike.cityPrice,
            "itemCondition": "https://schema.org/UsedCondition",
            "availability": "https://schema.org/InStock"
        },
        "manufacturer": {
            "@type": "Organization",
            "name": "Phung Motorbike",
            "url": "https://phungmotorbike.com",
            "telephone": "+84 965 93 6677",
            "email": "2wheelsvietnam@gmail.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "13 Ngo Huyện, Hàng Trống",
                "addressLocality": "Hoàn Kiếm",
                "addressRegion": "Hanoi",
                "addressCountry": "VN"
            }
        },
        "url": `https://phungmotorbike.com/motorbike-rentals-vietnam/${bike.model}-${bike.name}/${id}`,
        "currenciesAccepted": "VND, USD",
        "paymentAccepted": "Cash, Credit Card",
        "openingHours": ["Mo-Su 08:30-12:00", "Mo-Su 13:00-18:00"],
        "areaServed": {
            "@type": "City",
            "name": "Hanoi",
            "addressCountry": "VN"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(rentalSchema) }}
            />
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
                <Link href={`/bookings/${bike.id}`}>
                    <button>Book Now</button>
                </Link>
            </div>
            <Suspense fallback={<p>Loading similar bikes...</p>}>
                <SimilarBikes currentBike={bike} />
            </Suspense>
        </>
    );
}