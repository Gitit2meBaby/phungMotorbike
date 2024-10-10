'use client'
import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const SliderBasic = ({ bike, settings, fallbackImage, useFullUrl = false, width = 300, height = 225 }) => {

    console.log('bike', bike);

    return (
        <>
            <Slider {...settings}>
                {bike.images.map((image, index) => (
                    <div key={index}>
                        <Image
                            src={useFullUrl ? image.fullURL : image.thumbURL || fallbackImage}
                            alt={`${bike.model} ${bike.name} ${index + 1}`}
                            width={width}
                            height={height}
                        />
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default SliderBasic;
