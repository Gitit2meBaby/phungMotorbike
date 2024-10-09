import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mynerve } from 'next/font/google';

import styles from '../styles/bikeCard.module.css';

// Move the font loader to the top-level scope
const mynerve = Mynerve({
    weight: ['400'],
    subsets: ['latin'],
});

const BikeCard = ({ bike, basePath }) => {
    const fallbackImage = '/placeHolderThumb.webp';

    const imageUrl = bike.images && bike.images.length > 0 && bike.images[0].thumbURL
        ? bike.images[0].thumbURL
        : fallbackImage;

    const altText = bike.model && bike.name
        ? `${bike.name}`
        : 'Motorbike for rent at Phung Motorbike';

    const modelSlug = bike.model.toLowerCase().replace(/\s+/g, '-');
    const nameSlug = bike.name.toLowerCase().replace(/\s+/g, '-');

    return (
        <section>
            <div className={styles.bikeCard}>
                <div className={styles.polaroid}>
                    <Image
                        src={imageUrl}
                        alt={altText}
                        width={300}
                        height={225}
                        placeholder="blur"
                        blurDataURL={fallbackImage}
                        unoptimized
                        onError={(e) => {
                            e.target.src = fallbackImage;
                        }}
                    />
                    <h2 className={mynerve.className}>{`${bike.model} ${bike.name} ${bike.capacity}cc`}</h2>
                    {basePath === '/motorbikes-for-rent-hanoi' && <p>${bike.cityPrice}<span>/day</span></p>}
                    {basePath === '/motorbike-rentals-vietnam' && <p>${bike.travelPrice}<span>/day <span>(weekly discounts)</span></span></p>}
                    {basePath === '/motorbikes-for-sale' && <p>{bike.salePrice}<span>/month</span></p>}
                </div>

                <p className={styles.description}>{bike.description}</p>

                <div className={styles.btnWrapper}>
                    <Link href={`bookings/${bike.id}`}>
                        <button className={styles.activeBtn}>Book Now</button>
                    </Link>
                    <Link href={`${basePath}/${modelSlug}-${nameSlug}/${bike.id}`}>
                        <button className={styles.btn}>Details</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BikeCard;
