'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from "react-slick";

import BikeCard from './BikeCard';

import styles from '../styles/bikeCard.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';

const SimilarBikes = ({ bikes, currentBike, rateTypeUrl, basePath }) => {
    const [isClient, setIsClient] = useState(false);
    const [title, setTitle] = useState('Other bikes at this price');
    const [similarBikes, setSimilarBikes] = useState([]);
    const [rateType, setRateType] = useState(() => {
        // Initialize rateType based on rateTypeUrl
        if (rateTypeUrl === 'travel') return currentBike.travelPrice;
        if (rateTypeUrl === 'city') return currentBike.cityPrice;
        if (rateTypeUrl === 'sale') return currentBike.salePrice;
        return currentBike.monthPrice;
    });

    useEffect(() => {
        if (rateTypeUrl === 'travel') {
            setRateType(currentBike.travelPrice);
        } else if (rateTypeUrl === 'city') {
            setRateType(currentBike.cityPrice);
        } else if (rateTypeUrl === 'sale') {
            setRateType(currentBike.salePrice);
        } else {
            setRateType(currentBike.monthPrice);
        }
    }, [rateTypeUrl, currentBike]);

    useEffect(() => {
        setIsClient(true);
    }, [rateType, rateTypeUrl, currentBike]);

    useEffect(() => {
        if (!bikes || !Array.isArray(bikes)) return;

        let filteredBikes = bikes.filter(bike => rateType === rateType && bike.id !== currentBike.id);
        let newTitle = `More bikes at $${rateType}/day`;

        if (rateTypeUrl === 'sale') {
            filteredBikes = bikes.filter(bike => bike.salePrice === rateType && bike.id !== currentBike.id);
            newTitle = `Other bikes for sale at $${rateType}`;
        }

        if (rateTypeUrl === 'monthly') {
            filteredBikes = bikes.filter(bike => bike.monthPrice === rateType && bike.id !== currentBike.id);
            newTitle = `Other bikes at ₫${rateType}/month`;
        }

        if (filteredBikes.length < 2) {
            filteredBikes = bikes.filter(bike => bike.capacity === currentBike.capacity && bike.id !== currentBike.id);
            newTitle = `More Bikes with ${currentBike.capacity}cc`;
        }

        if (filteredBikes.length < 2) {
            filteredBikes = bikes.filter(bike => bike.type !== currentBike.type && bike.id !== currentBike.id);
            newTitle = `Other ${currentBike.type} bikes`;
        }

        setSimilarBikes(filteredBikes);
        setTitle(newTitle);
    }, [bikes, currentBike]);

    var settings = {
        autoplay: similarBikes.length > 1,
        dots: false,
        arrows: false,
        infinite: similarBikes.length > 1,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 712,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <>
            {isClient && similarBikes.length > 0 && (
                <section className={styles.similar}>
                    <h4>
                        {title}
                    </h4>
                    {similarBikes.length > 1 ? (
                        <Slider {...settings}>
                            {similarBikes.map(bike => (
                                <Link href={`/${basePath}/${bike.id}`} key={bike.id}>
                                    <BikeCard key={bike.id} bike={bike} basePath={basePath} inDetails={true} />
                                </Link>
                            ))}
                        </Slider>
                    ) : (
                        <Link href={`/${basePath}/${similarBikes[0].id}`}>
                            <div className={styles.bikeCard}>
                                <Image
                                    src={similarBikes[0].images[0].thumbURL}
                                    alt={`${similarBikes[0].model} ${similarBikes[0].name}`}
                                    width={300}
                                    height={225}
                                />
                                <h3>{`${similarBikes[0].model} ${similarBikes[0].name} ${similarBikes[0].capacity}cc`}</h3>
                            </div>
                        </Link>
                    )}
                </section>
            )}
        </>
    );
};

export default SimilarBikes;
