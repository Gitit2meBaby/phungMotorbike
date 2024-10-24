"use client";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "../styles/sliderSection.module.css";

const ClientSlider = ({ bikes }) => {
  const settings = {
    autoplay: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {bikes.map((bike) => (
        <div key={bike.id}>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "73.81%",
              maxHeight: "500px",
            }}
          >
            <Image
              src={bike.images[0]?.fullURL || "/placeholder.webp"}
              alt={`${bike.model} ${bike.name} ${bike.capacity}cc`}
              fill
              style={{ objectFit: "contain" }}
              priority={true}
              onError={(e) => {
                e.target.src = "/placeholder.webp";
              }}
            />
          </div>
          <div className={styles.info}>
            <h3>{`${bike.model} ${bike.name} ${bike.capacity}cc`}</h3>
            <p>
              <span>from </span>${bike.cityPrice}usd
            </p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ClientSlider;
