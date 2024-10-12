'use client'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/forSale.module.css'

import crf from '../public/crf.webp'
import bike2 from '../public/bike2.webp'
import bike3 from '../public/bike3.webp'
import bike4 from '../public/bike4.webp'
import bike5 from '../public/bike5.webp'
import bike6 from '../public/bike6.webp'


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
        <section className={styles.slider}>
            <Slider {...settings}>
                <div>
                    <Image
                        src={bike2}
                        alt="Honda win 125cc"
                        width={600}
                        height={450}
                    />
                    <div className={styles.info}>
                        <h3>Customized Win 125cc</h3>
                        <p>$400usd</p>
                    </div>
                </div>

                <div>
                    <Image
                        src={bike3}
                        alt="Honda win 125cc"
                        width={600}
                        height={450}
                    />
                    <div className={styles.info}>
                        <h3>Customized Win 125cc</h3>
                        <p>$400usd</p>
                    </div>
                </div>

                <div>
                    <Image
                        src={bike4}
                        alt="Honda win 125cc"
                        width={600}
                        height={450}
                    />
                    <div className={styles.info}>
                        <h3>Customized Win 125cc</h3>
                        <p>$400usd</p>
                    </div>
                </div>

                <div>
                    <Image
                        src={bike5}
                        alt="Honda win 125cc"
                        width={600}
                        height={450}
                    />
                    <div className={styles.info}>
                        <h3>Customized Win 125cc</h3>
                        <p>$400usd</p>
                    </div>
                </div>

                <div>
                    <Image
                        src={bike6}
                        alt="Honda win 125cc"
                        width={600}
                        height={450}
                    />
                    <div className={styles.info}>
                        <h3>Customized Win 125cc</h3>
                        <p>$400usd</p>
                    </div>
                </div>

                <div>
                    <Image
                        src={crf}
                        alt="Honda win 125cc"
                        width={600}
                        height={450}
                    />
                    <div className={styles.info}>
                        <h3>Customized Win 125cc</h3>
                        <p>$400usd</p>
                    </div>
                </div>
            </Slider>

        </section>
    )
}

export default SaleSlider