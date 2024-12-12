// same as Client Slider, but for sale page
"use client";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/forSale.module.css";

const ClientSaleSlider = ({ bikes }) => {
  const settings = {
    autoplay: true,
    dots: true,
    arrows: false,
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
            style={{ position: "relative", width: "100%", paddingTop: "75%" }}
          >
            <Image
              src={bike.images[0]?.fullURL || "/placeholder.webp"}
              alt={`${bike.model} ${bike.name} ${bike.capacity}cc`}
              fill
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.target.src = "/placeholder.webp";
              }}
            />
          </div>
          <div className={styles.info}>
            <h3>{`${bike.model} ${bike.name} ${bike.capacity}cc`}</h3>
            <p>${bike.salePrice}usd</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ClientSaleSlider;
