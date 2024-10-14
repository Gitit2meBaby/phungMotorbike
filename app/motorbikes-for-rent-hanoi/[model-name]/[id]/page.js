import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBikes } from '../../../lib/getBikes';

import styles from '../../../../styles/bikeDetail.module.css';
import SliderBasic from '../../../../components/SliderBasic';

import think from '../../../../public/think.png'
import motorcycle from '../../../../public/motorcycle.png'

const SimilarBikes = dynamic(() => import('../../../../components/SimilarBikes'), { ssr: false });

export default async function BikeDetailPage({ params }) {
    const { id } = params;

    // Fetch all bikes using our cached getBikes function
    const bikes = await getBikes();

    // Find the specific bike
    const bike = bikes.find(b => b.id === id);

    if (!bike) {
        return notFound();
    }

    const bikeUrl = `${bike.model.toLowerCase()}-${bike.name.toLowerCase()}`;
    const rateTypeUrl = 'city'
    const basePath = "/motorbikes-for-rent-hanoi"

    const rentalSchema = {
        "@context": "https://schema.org",
        "@type": "Vehicle",
        "name": `${bike.name}`,
        "price": bike.cityPrice,
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
        "url": `https://phungmotorbike.com/motorbikes-for-rent-hanoi/${bike.model}-${bike.name}/${id}`,
        "currenciesAccepted": "VND, USD",
        "paymentAccepted": "Cash, Credit Card",
        "openingHours": ["Mo-Su 08:30-12:00", "Mo-Su 13:00-18:00"],
        "areaServed": {
            "@type": "City",
            "name": "Hanoi",
            "addressCountry": "VN"
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
                            <SliderBasic bike={bike} settings={fullSettings} fallbackImage={fullFallback} useFullUrl={true} width={600} height={450} />
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
                            <SliderBasic bike={bike} settings={thumbSettings} fallbackImage={thumbFallback} />
                        )}
                    </div>
                    <div className={styles.details}>
                        <Image src={motorcycle} width={350} height={350} alt='motorbike icon'></Image>
                        <h2>Daily rate - ${bike.cityPrice} <span>USD</span></h2>
                        <p className={styles.transmission}>Transmission: {bike.type}</p>
                        <p>{bike.description}</p>
                        <div className={styles.disclaimer}></div>
                        <p>Inner city rentals have a maximum of 50km/day and can not be taken outside of Hanoi city limits.</p>
                        <p> All inner city rentals include helmets, a rack for your luggage, a phone holder for easy navigation, and secure rubber straps. You&apos;ll also receive insider tips on the best routes, must-visit destinations, and local attractions in Hanoi.</p>
                        <div className={styles.btnWrapper}>
                            <Link href="/motorbikes-for-rent-hanoi">
                                <button className={styles.btn} aria-label='Return to motorbikes for rent Hanoi'>Return</button>
                            </Link>
                            <Link href={`/bookings/${bike.id}`}>
                                <button className={`${styles.btn} ${styles.pulse}`} aria-label={`Book ${bike.model} ${bike.name} Now`}>Book Now</button>
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
                <h3>Want to explore the countryside?</h3>
                <Link href={`/motorbike-rentals-vietnam/${bikeUrl}/${bike.id}`}>Get this {bike.model} for just ${bike.cityPrice}/day with weekly discounts for longer rental periods!
                </Link>
                <Link href={`/motorbike-rentals-vietnam/${bikeUrl}/${bike.id}`}>
                    <button className={styles.btn} style={{ marginTop: '1rem' }} aria-label={`Show Travel Rates for ${bike.model}`}>Show Travel Rates!</button>
                </Link>
                <h3>Planning to stay a while?</h3>
                <Link href={`/monthly-rentals-hanoi/${bikeUrl}/${bike.id}`}>Special rate for long stays and expats at just ₫{bike.monthPrice}/month!
                </Link>
                <Link href={`/monthly-rentals-hanoi/${bikeUrl}/${bike.id}`}>
                    <button className={styles.btn} style={{ marginTop: '1rem' }} aria-label={`Get Monthly Rates for ${bike.model}`}>Get Monthly Rates!</button>
                </Link>
            </div>

            <div className={styles.divider} style={{ margin: '0 auto' }}></div>

            <Suspense fallback={<p>Loading similar bikes...</p>}>
                <SimilarBikes currentBike={bike} bikes={bikes} rateTypeUrl={rateTypeUrl} basePath={basePath} />
            </Suspense>
        </>
    );
}
