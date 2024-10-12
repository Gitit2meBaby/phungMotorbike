'use client'
import Image from 'next/image';
import React from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from '../styles/sliderSection.module.css'

import lifan from '../public/lifan.webp'
import lead from '../public/lead.webp'
import xr from '../public/xr.webp'
import rsx from '../public/rsx.webp'
import cub from '../public/cub.webp'
import jupiter from '../public/jupiter.webp'
import detech from '../public/detech.webp'

const SliderSection = () => {

    var settings = {
        autoplay: true,
        arrows: false,
        dots: false,
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
                        src={cub}
                        alt="piaggio"
                        width={420}
                        height={310}
                        layout="responsive"
                        priority='high'
                    />
                    <div className={styles.info}>
                        <h3>Honda Lead 110cc</h3>
                        <p><span>from </span>$6usd</p>
                    </div>
                </div>
                <div>
                    <Image
                        src={lifan}
                        alt="Honda XR 190cc"
                        width={600}
                        height={450}
                        priority
                        layout="responsive"
                    />
                    <div className={styles.info}>
                        <h3>Honda XR 190cc</h3>
                        <p><span>from </span>$5usd</p>
                    </div>
                </div>
                <div>
                    <Image
                        src={jupiter}
                        alt="Honda XR 190cc"
                        width={600}
                        height={450}
                        priority
                        layout="responsive"
                    />
                    <div className={styles.info}>
                        <h3>Honda XR 190cc</h3>
                        <p><span>from </span>$5usd</p>
                    </div>
                </div>
                <div>
                    <Image
                        src={xr}
                        alt="Honda CRF 250"
                        width={420}
                        height={310}
                        layout="responsive"
                        priority='high'
                    />
                    <div className={styles.info}>
                        <h3>Honda CRF 250</h3>
                        <p><span>from </span>$40usd</p>
                    </div>
                </div>
                <div>
                    <Image
                        src={lead}
                        alt="bike155"
                        width={420}
                        height={310}
                        layout="responsive"
                        priority='high'
                    />
                    <div className={styles.info}>
                        <h3>Yamaha Nouvo lx 135cc</h3>
                        <p><span>from </span>$6usd</p>
                    </div>
                </div>
                <div>
                    <Image
                        src={detech}
                        alt="bike155"
                        width={420}
                        height={310}
                        layout="responsive"
                        priority='high'
                    />
                    <div className={styles.info}>
                        <h3>Yamaha Nouvo lx 135cc</h3>
                        <p><span>from </span>$6usd</p>
                    </div>
                </div>
                <div>
                    <Image
                        src={rsx}
                        alt="hornet"
                        width={420}
                        height={310}
                        layout="responsive"
                        priority='high'
                    />
                    <div className={styles.info}>
                        <h3>Honda CB 500x</h3>
                        <p><span>from </span>$55usd</p>
                    </div>
                </div>
            </Slider>
        </section>
    )
}

export default SliderSection