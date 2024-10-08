'use client';
import Image from 'next/image';
import Slider from "react-slick";
import styles from '../styles/similarBikes.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';

const SimilarBikes = ({ bikes, currentBike }) => {
    const [isClient, setIsClient] = useState(false);
    const [title, setTitle] = useState('Other bikes at this price');
    const [similarBikes, setSimilarBikes] = useState([]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!bikes || !Array.isArray(bikes)) return;

        let filteredBikes = bikes.filter(bike => bike.cityPrice === currentBike.cityPrice && bike.id !== currentBike.id);
        let newTitle = `Other bikes at ${currentBike.cityPrice}/day`;

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
        dots: true,
        arrows: false,
        infinite: similarBikes.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            {isClient && similarBikes.length > 0 && (
                <section className={styles.similar}>
                    <h2>
                        {title}
                    </h2>
                    {similarBikes.length > 1 ? (
                        <Slider {...settings}>
                            {similarBikes.map(bike => (
                                <div key={bike.id} className={styles.bikeCard}>
                                    <Image
                                        src={bike.images[0].thumbURL}
                                        alt={`${bike.model} ${bike.name}`}
                                        width={300}
                                        height={225}
                                    />
                                    <h3>{`${bike.model} ${bike.name} ${bike.capacity}cc`}</h3>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className={styles.bikeCard}>
                            <Image
                                src={similarBikes[0].images[0].thumbURL}
                                alt={`${similarBikes[0].model} ${similarBikes[0].name}`}
                                width={300}
                                height={225}
                            />
                            <h3>{`${similarBikes[0].model} ${similarBikes[0].name} ${similarBikes[0].capacity}cc`}</h3>
                        </div>
                    )}
                </section>
            )}
        </>
    );
};

export default SimilarBikes;
