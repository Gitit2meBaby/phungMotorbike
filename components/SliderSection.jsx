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
import wave from '../public/wave.webp'
import cub from '../public/cub.webp'
import jupiter from '../public/jupiter.webp'
import blade from '../public/blade.webp'
import detech from '../public/blade.webp'

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
                    <div style={{ position: 'relative', width: '100%', paddingTop: '73.81%', maxHeight: '500px' }}>
                        <Image
                            src={cub}
                            alt="Honda Cub 50cc"
                            fill
                            style={{ objectFit: 'contain' }}
                            priority={true}
                        />
                    </div>
                    <div className={styles.info}>
                        <h3>Honda Cub 50cc</h3>
                        <p><span>from </span>$6.50usd</p>
                    </div>
                </div>

                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '75%', maxHeight: '500px' }}>
                        <Image
                            src={lifan}
                            alt="Honda XR 190cc"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className={styles.info}>
                        <h3>Honda XR 190cc</h3>
                        <p><span>from </span>$5usd</p>
                    </div>
                </div>

                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '75%', maxHeight: '500px' }}>
                        <Image
                            src={blade}
                            alt="Honda XR 190cc"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className={styles.info}>
                        <h3>Honda Blade 110cc</h3>
                        <p><span>from </span>$6usd</p>
                    </div>
                </div>

                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '75%', maxHeight: '500px' }}>
                        <Image
                            src={jupiter}
                            alt="Honda XR 190cc"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className={styles.info}>
                        <h3>Honda XR 190cc</h3>
                        <p><span>from </span>$5usd</p>
                    </div>
                </div>

                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '73.81%', maxHeight: '500px' }}>
                        <Image
                            src={xr}
                            alt="Honda XR 150cc"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className={styles.info}>
                        <h3>Honda XR 150cc</h3>
                        <p><span>from </span>$13usd</p>
                    </div>
                </div>

                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '73.81%', maxHeight: '500px' }}>
                        <Image
                            src={lead}
                            alt="bike155"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className={styles.info}>
                        <h3>Yamaha Nouvo lx 135cc</h3>
                        <p><span>from </span>$6usd</p>
                    </div>
                </div>

                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '73.81%', maxHeight: '500px' }}>
                        <Image
                            src={detech}
                            alt="Detech Win 130cc"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className={styles.info}>
                        <h3>Detech Win 130cc</h3>
                        <p><span>from </span>$6usd</p>
                    </div>
                </div>

                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '73.81%', maxHeight: '500px' }}>
                        <Image
                            src={wave}
                            alt="hornet"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className={styles.info}>
                        <h3>Honda Wave AT 110cc</h3>
                        <p><span>from </span>$5usd</p>
                    </div>
                </div>
            </Slider>
        </section>
    )
}

export default SliderSection
