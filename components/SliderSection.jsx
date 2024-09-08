'use client'
import Image from 'next/image';
import React from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/globals.css'
import styles from '../styles/sliderSection.module.css'

import crf from '../assets/bikes/crf.webp'
import vespa from '../assets/bikes/vespa.webp'
import bike155 from '../assets/bikes/bike155.webp'
import hornet from '../assets/bikes/hornet.webp'
import piaggio from '../assets/bikes/piaggio.webp'

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
                        src={crf}
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
                        src={vespa}
                        alt="Vespa"
                        width={420}
                        height={310}
                        layout="responsive"
                        priority='high'
                    />
                    <div className={styles.info}>
                        <h3>Sym Attila 125cc</h3>
                        <p><span>from </span>$5usd</p>
                    </div>
                </div>
                <div>
                    <Image
                        src={bike155}
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
                        src={hornet}
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
                <div>
                    <Image
                        src={piaggio}
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
            </Slider>
        </section>
    )
}

export default SliderSection