import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/bikeCard.module.css';

const BikeCard = ({ bike }) => {
    const baseUrlThumb = `https://phung-motorbike.pockethost.io/api/files/${bike.collectionId}/${bike.id}/`;

    const blurDataURL = '/public/placeHolderThumb.webp';
    const fallbackImage = '/public/placeHolderThumb.webp';

    return (
        <div className={styles.bikeCard}>
            <Image
                src={
                    bike.thumb && bike.thumb.length > 0
                        ? `${baseUrlThumb}${bike.thumb[0]}`
                        : fallbackImage
                }
                alt={
                    bike.model && bike.name
                        ? `${bike.model} ${bike.name}`
                        : 'Motorbike for rent at Phung Motorbike'
                }
                width={300}
                height={225}
                placeholder="blur" // Correct usage
                blurDataURL={blurDataURL}
                unoptimized
                onError={(e) => {
                    e.target.src = fallbackImage;
                }}
            />
            <h2>{`${bike.model} ${bike.name} ${bike.capacity}cc`}</h2>
            <p>${bike.cityPrice}/day</p>
            <p>${bike.monthPrice}/month</p>
            <Link href={`/motorbikes-for-rent-hanoi/${bike.model}-${bike.name}`}>
                <button>Details</button>
            </Link>

        </div>
    );
};

export default BikeCard;
