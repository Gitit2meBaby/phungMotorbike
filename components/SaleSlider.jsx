'use client'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/forSale.module.css'

import win from '../assets/bikes/win.webp'
import cub from '../assets/bikes/cub.webp'
import nuovo from '../assets/bikes/nuovo.webp'

const SaleSlider = () => {
    var settings = {
        autoplay: true,
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <section>
            <Slider {...settings}>
                <div>
                    <Image
                        src={win}
                        alt="Honda win 125cc"
                        width={350}
                        height={350}
                    />
                    <div className={styles.info}>
                        <h3>Customized Win 125cc</h3>
                        <p>$400usd</p>
                    </div>
                </div>

                <div>
                    <Image
                        src={cub}
                        alt="Honda cub 50cc"
                        width={350}
                        height={350}
                    />
                    <div className={styles.info}>
                        <h3>Real Honda Cub 50ccc</h3>
                        <p>$700usd</p>
                    </div>
                </div>

                <div>
                    <Image
                        src={nuovo}
                        alt="Yamaha Nuovo 135cc"
                        width={350}
                        height={350}
                    />
                    <div className={styles.info}>
                        <h3>Yamaha Nuovo lx 135cc</h3>
                        <p>$300usd</p>
                    </div>
                </div>
            </Slider>

        </section>
    )
}

export default SaleSlider