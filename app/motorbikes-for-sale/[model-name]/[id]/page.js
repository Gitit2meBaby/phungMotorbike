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
import ReturnBtn from '../../../../components/ReturnBtn';

const SimilarBikes = dynamic(() => import('../../../../components/SimilarBikes'), { ssr: false });

export default async function BikeDetailPage({ params }) {

    const { id, 'model-name': modelName } = params;

    // Fetch all bikes using our cached getBikes function
    const bikes = await getBikes();

    const normalize = (str) => {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

    // Find the specific bike
    const bike = bikes.find(b => 
  b.id.toString() === id && 
  `${normalize(b.model)}-${normalize(b.name)}` === modelName
);

if (!bike) {
  return notFound();
}

const bikeUrl = `${normalize(bike.model)}-${normalize(bike.name)}`;
    const rateTypeUrl = 'sale'
    const basePath = '/motorbikes-for-sale';

    // Dynamic schema generation
    const saleSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `${bike.name}`,
        "price": bike.salePrice,
        "brand": {
            "@type": "Brand",
            "name": bike.model
        },
        "model": bike.name,
        "image": bike.images[0].thumbURL,
        "description": bike.description,
        "offers": {
            "@type": "Offer",
            "priceCurrency": "VND",
            "price": bike.salePrice,
            "itemCondition": "https://schema.org/UsedCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
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
            }
        },
        "url": `https://phungmotorbike.com/motorbike-sales-vietnam/${bike.model}-${bike.name}/${id}`,
        "vehicleConfiguration": bike.type,
        "vehicleEngine": {
            "@type": "EngineSpecification",
            "engineDisplacement": {
                "@type": "QuantitativeValue",
                "value": bike.engineCapacity,
                "unitCode": "CMQ"
            }
        },
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
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(saleSchema) }}
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
                                priority
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
                                priority
                            />
                        ) : (
                            <SliderBasic bike={bike} settings={thumbSettings} fallbackImage={thumbFallback} />
                        )}
                    </div>
                    <div className={styles.details}>
                        <Image src={motorcycle} width={350} height={350} alt='motorbike icon' priority></Image>
                        <h2>Selling Price - ${bike.salePrice} <span>USD</span></h2>
                        <p className={styles.transmission}>Transmission: {bike.type}</p>
                        <p>{bike.description}</p>
                        <div className={styles.disclaimer}></div>
                        <p>Experience the freedom of owning your own ride in Vietnam! This well-maintained {bike.model} {bike.name} {bike.capacity}<span>cc</span> is your ticket to endless adventures across the country&apos;s stunning landscapes.</p>

                        <p>As new owners, you will receive the official bluecard and tips for keeping your new ride in top shape. This bike is fully serviced and well maintained throughout its lifetime.</p>

                        <p>Whether you&apos;re planning a short trip or a cross-country expedition, this bike is ready to take you there. Dont miss this opportunity to own a piece of adventure. Your dream of exploring Vietnam on two wheels is closer than you think. Contact us today to make this bike yours!</p>
                        <div className={styles.btnWrapper}>
                            <ReturnBtn bikeId={bike.id} basePath={basePath} />
                            <Link href={`/buy-online/${bike.id}`}>
                                <button className={`${styles.btn} ${styles.pulse}`}>Buy Now</button>
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
                <Image src={think} width={300} height={300} alt="thinking emoji" />
                <h3>Want to rent before you buy?</h3>
                <Link href={`/motorbikes-for-rent-hanoi/${bikeUrl}/${bike.id}`}>
                    Get this {bike.model} for just ${bike.cityPrice}/day
                </Link>
                <Link href={`/motorbikes-for-rent-hanoi/${bikeUrl}/${bike.id}`}>
                    <button className={styles.btn} style={{ marginTop: '1rem' }}>Get City Rates!</button>
                </Link>

                <h3>Just looking for a rental in Hanoi?</h3>
                <Link href={`/monthly-rentals-hanoi/${bikeUrl}/${bike.id}`}>
                    Special rate for long stays and expats at just ₫{bike.monthPrice}/month!
                </Link>
                <Link href={`/monthly-rentals-hanoi/${bikeUrl}/${bike.id}`}>
                    <button className={styles.btn} style={{ marginTop: '1rem' }}>Get Monthly Rates!</button>
                </Link>
            </div>

            <div className={styles.divider} style={{ margin: '0 auto' }}></div>

            <Suspense fallback={<p>Loading similar bikes...</p>}>
                <SimilarBikes currentBike={bike} bikes={bikes} rateTypeUrl={rateTypeUrl} basePath={basePath} />
            </Suspense>
        </>
    );
}