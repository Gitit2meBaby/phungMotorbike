import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/bikeCard.module.css';

const BikeCard = ({ bike }) => {
    const fallbackImage = '/placeHolderThumb.webp';

    const imageUrl = bike.images && bike.images.length > 0 && bike.images[0].thumbURL
        ? bike.images[0].thumbURL
        : fallbackImage;

    const altText = bike.model && bike.name
        ? `${bike.model} ${bike.name}`
        : 'Motorbike for rent at Phung Motorbike';

    return (
        <div className={styles.bikeCard}>
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
            <h2>{`${bike.model} ${bike.name} ${bike.capacity}cc`}</h2>
            <p>${bike.cityPrice}/day</p>
            <p>${bike.monthPrice}/month</p>
            <Link href={`/motorbikes-for-rent-hanoi/${bike.type}/${bike.model}-${bike.name}/${bike.id}`}>
                <button>Details</button>
            </Link>

        </div>
    );
};

export default BikeCard;
