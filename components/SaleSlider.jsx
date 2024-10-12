'use client'
import React from 'react'
import Image from 'next/image';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/forSale.module.css'

import crf from '../public/crf.webp'
import sirius from '../public/sirius.webp'
import dream from '../public/dream.webp'
import attila from '../public/attila.webp'
import lifanCustom from '../public/lifanCustom.webp'


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
                    <div style={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
                        <Image
                            src={sirius}
                            alt="Yamaha sirius 115cc"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.info}>
                        <h3>Yamaha sirius 115cc</h3>
                        <p>$500usd</p>
                    </div>
                </div>

                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
                        <Image
                            src={dream}
                            alt="Honda Dream 110cc"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.info}>
                        <h3>Honda Dream 110cc</h3>
                        <p>$600usd</p>
                    </div>
                </div>

                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
                        <Image
                            src={attila}
                            alt="Sym Attila 125cc"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.info}>
                        <h3>Sym Attila 125cc</h3>
                        <p>$300usd</p>
                    </div>
                </div>

                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
                        <Image
                            src={lifanCustom}
                            alt="Lifan custom 150cc"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.info}>
                        <h3>Lifan custom 150cc</h3>
                        <p>$800usd</p>
                    </div>
                </div>

                <div>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
                        <Image
                            src={crf}
                            alt="Honda CRF 250cc"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.info}>
                        <h3>Honda CRF 250cc</h3>
                        <p>$4000usd</p>
                    </div>
                </div>
            </Slider>
        </section>
    )
}

export default SaleSlider
