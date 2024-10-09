'use client'
import React from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const SliderBasic = ({ bike }) => {

    const fallbackImage = '/placeHolderThumb.webp';

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <Slider {...settings}>
                {bike.images.map((image, index) => (
                    <div key={index}>
                        <Image
                            src={image.thumbURL || fallbackImage}
                            alt={`${bike.model} ${bike.name} ${index + 1}`}
                            width={300}
                            height={225}
                        />
                    </div>
                ))}
            </Slider>
        </>
    )
}

export default SliderBasic