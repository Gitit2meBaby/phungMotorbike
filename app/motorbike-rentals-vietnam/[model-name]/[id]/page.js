import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import styles from '../../../../styles/bikeDetail.module.css';
import SliderBasic from '../../../../components/SliderBasic';

import think from '../../../../public/think.png'
import motorcycle from '../../../../public/motorcycle.png'

const SimilarBikes = dynamic(() => import('../../../../components/SimilarBikes'), { ssr: false });

export default async function BikeDetailPage({ params }) {
    const { id } = params;

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const apiUrl = `${baseUrl}/api/bikes/?force=true`;

    const rateTypeUrl = 'travel'

    const res = await fetch(apiUrl, {
        next: { revalidate: 0 }
    });

    if (!res.ok) {
        console.error('Failed to fetch bike data:', res.statusText);
        return notFound();
    }

    const bikes = await res.json();

    const bike = bikes.find(b => b.id === id);

    if (!bike || bike.message === 'Bike not found') {
        return notFound();
    }

    const monthlyRate = Math.round(bike.travelPrice * 4 * (1 - 0.20));

    const bikeUrl = `${bike.model.toLowerCase()}-${bike.name.toLowerCase()}`;

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
            "price": bike.travelPrice,
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

    // required to change JSON format to allow use as a prop
    const plainBike = {
        ...bike,
        timestamp: {
            seconds: bike.timestamp.seconds,
            nanoseconds: bike.timestamp.nanoseconds
        }
    };

    const thumbSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
    };

    const fullSettings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
    };

    const thumbFallback = '/placeHolderThumb.webp';
    const fullFallback = '/placeHolderFull.webp';

    return (
        <>
            <section className={styles.bikeDetail}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(rentalSchema) }}
                />
                <div className={styles.divider}></div>
                <h1>{bike.model} {bike.name} {bike.capacity}<span>cc</span></h1>
                <div className={styles.deskLayout}>
                    <div className={styles.deskSlider}>
                        {bike.images.length === 1 ? (
                            <Image
                                src={bike.images[0].fullURL}
                                alt={`${bike.model} ${bike.name}`}
                                width={600}
                                height={450}
                            />
                        ) : (
                            <SliderBasic bike={plainBike} settings={fullSettings} fallbackImage={fullFallback} useFullUrl={true} width={600} height={450} />
                        )}
                    </div>
                    <div className={styles.slider}>
                        {bike.images.length === 1 ? (
                            <Image
                                src={bike.images[0].thumbURL}
                                alt={`${bike.model} ${bike.name}`}
                                width={300}
                                height={225}
                            />
                        ) : (
                            <SliderBasic bike={plainBike} settings={thumbSettings} fallbackImage={thumbFallback} />
                        )}
                    </div>
                    <div className={styles.details}>
                        <Image src={motorcycle} width={350} height={350} alt='motorbike icon'></Image>
                        <h2>Daily rate - ${bike.travelPrice} <span>USD</span></h2>
                        <h2>Month rate - ${monthlyRate} <span>USD</span>*</h2>
                        <p className={styles.transmission}>Transmission: {bike.type}</p>
                        <p>{bike.description}</p>
                        <div className={styles.disclaimer}></div>
                        <p><span>*</span>A 5% discount applies to the daily rate for each extra week for our unlimited kilometre rental fleet.</p>
                        <p> Every outer city rental includes helmets, a rack for your luggage, a phone holder for easy navigation, and secure rubber straps. You'll also receive insider tips on the best routes, must-visit destinations, and local attractions across Vietnam.</p>
                        <div className={styles.btnWrapper}>
                            <Link href="/motorbike-rentals-vietnam">
                                <button className={styles.btn}>Return</button>
                            </Link>
                            <Link href={`/bookings/${bike.id}`}>
                                <button className={`${styles.btn} ${styles.pulse}`}>Book Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.imgRow}>
                    <div className={styles.divider}></div>
                    {bike.images.map((image, index) => (
                        <Image
                            key={index}
                            src={image.thumbURL}
                            alt={`${bike.model} ${bike.name} image ${index + 1}`}
                            width={300}
                            height={225}
                        />
                    ))}
                    <div className={styles.divider}></div>

                </div>
            </section>

            <div className={styles.options}>
                <Image src={think} width={300} height={300} alt='thinking emoji'></Image>
                <h3>Staying in Hanoi?</h3>
                <Link href={`/motorbikes-for-rent-hanoi/${bikeUrl}/${bike.id}`}>Get this {bike.model} for just ${bike.cityPrice}/day
                </Link>
                <Link href={`/motorbikes-for-rent-hanoi/${bikeUrl}/${bike.id}`}>
                    <button className={styles.btn} style={{ marginTop: '1rem' }}>Get City Rates!</button>
                </Link>
                <h3>Planning to stay a while?</h3>
                <Link href={`/monthly-rentals-hanoi/${bikeUrl}/${bike.id}`}>Special rate for long stays and expats at just ₫{bike.monthPrice}/month!
                </Link>
                <Link href={`/monthly-rentals-hanoi/${bikeUrl}/${bike.id}`}>
                    <button className={styles.btn} style={{ marginTop: '1rem' }}>Get Monthly Rates!</button>
                </Link>
            </div>

            <div className={styles.divider} style={{ margin: '0 auto' }}></div>

            <Suspense fallback={<p>Loading similar bikes...</p>}>
                <SimilarBikes currentBike={plainBike} bikes={bikes} rateTypeUrl={rateTypeUrl} />
            </Suspense>
        </>
    );
}