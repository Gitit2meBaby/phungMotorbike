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

const BikeCard = ({ bike, basePath, inDetails }) => {
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
        <>
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
                    <h2 className={mynerve.className} style={inDetails ? { margin: '.8rem 0 .3rem 0' } : {}}>{`${bike.model} ${bike.name} ${bike.capacity}cc`}
                    </h2>

                    {basePath === '/motorbikes-for-rent-hanoi' && !inDetails && <p>${bike.cityPrice}<span>/day (USD)</span></p>}
                    {basePath === '/motorbike-rentals-vietnam' && !inDetails &&
                        <>
                            <p>${bike.travelPrice}<span>/day (USD)</span></p>
                            <p className={styles.discount}>*discounts apply after the 1st week</p>
                        </>}
                    {basePath === '/motorbikes-for-sale' && !inDetails && <p>${bike.salePrice}<span>USD</span></p>}
                </div>

                <p className={styles.description}>{bike.description}</p>

                <div className={styles.btnWrapper}
                    style={inDetails ? { borderBottom: 'none', marginTop: '1.5rem' } : { borderBottom: '1px solid #e97f26' }}>
                    <Link href={`bookings/${bike.id}`}>
                        <button className={styles.activeBtn}>Book Now</button>
                    </Link>
                    <Link href={`${basePath}/${modelSlug}-${nameSlug}/${bike.id}`}>
                        <button className={styles.btn}>Details</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BikeCard;
