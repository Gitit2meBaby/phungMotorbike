import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Mynerve } from "next/font/google";

import styles from "../styles/bikeCard.module.css";

// font for polaroid titles
const mynerve = Mynerve({
  weight: ["400"],
  subsets: ["latin"],
});

const BikeCard = ({ bike, basePath, inDetails, inAdmin, deletedBike }) => {
  // Fallback image URL saved locally
  const fallbackImage = "/placeHolderThumb.webp";
  const pathname = usePathname();

  const imageUrl =
    bike.images && bike.images.length > 0 && bike.images[0].thumbURL
      ? bike.images[0].thumbURL
      : fallbackImage;

  const altText =
    bike.model && bike.name
      ? `${bike.name}`
      : "Motorbike for rent at Phung Motorbike";

  const modelSlug = bike.model.toLowerCase().replace(/\s+/g, "-");
  const nameSlug = bike.name.toLowerCase().replace(/\s+/g, "-");

  // helps add a param for the form redirect to booking page (ie priceType)
  const formRedirectUrl =
    basePath === "/motorbikes-for-sale"
      ? `/buy-online/${bike.id}?priceType=sale`
      : `/bookings/${bike.id}?priceType=${
          basePath === "/motorbikes-for-rent-hanoi" ? "city" : "travel"
        }`;

  const buttonText =
    basePath === "/motorbikes-for-sale" ? "Buy Now" : "Book Now";

  // Return null (or don't render) if this bike is the deleted bike
  if (bike.id === deletedBike) {
    return null;
  }

  const handleClick = () => {
    sessionStorage.setItem("lastBikeListPath", pathname);
  };

  return (
    <>
      <div
        className={styles.bikeCard}
        id={`bike-${bike.id}`}
        style={bike.id === deletedBike ? { display: "none" } : {}}
      >
        <div className={styles.polaroid}>
          <Image
            src={imageUrl}
            alt={altText}
            width={300}
            height={225}
            placeholder="blur"
            blurDataURL={fallbackImage}
            unoptimized
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
          <h2
            className={mynerve.className}
            style={inDetails ? { margin: ".8rem 0 .3rem 0" } : {}}
          >
            {`${bike.model} ${bike.name} ${bike.capacity}cc`}
          </h2>

          {basePath === "/motorbikes-for-rent-hanoi" && !inDetails && (
            <p>
              ${bike.cityPrice}
              <span>/day (USD)</span>
            </p>
          )}
          {basePath === "/motorbike-rentals-vietnam" && !inDetails && (
            <>
              <p>
                ${bike.travelPrice}
                <span>/day (USD)</span>
              </p>
              <p className={styles.discount}>
                *discounts apply after the 1st week
              </p>
            </>
          )}
          {basePath === "/motorbikes-for-sale" && !inDetails && (
            <p>
              ${bike.salePrice}
              <span>USD</span>
            </p>
          )}
          {basePath === "/monthly-rentals-hanoi" && !inDetails && (
            <p>
              ₫{bike.monthPrice}
              <span>VND</span>
            </p>
          )}
          {basePath === "/admin" && (
            <>
              <p>
                City Price - ${bike.cityPrice}
                <span>USD</span>
              </p>
              <p>
                Travel Price - ${bike.travelPrice}
                <span>USD</span>
              </p>
              <p>
                Month Price - {bike.monthPrice}
                <span>VND</span>
              </p>
              <p>
                Sale Price - ${bike.salePrice}
                <span>USD</span>
              </p>
            </>
          )}
        </div>

        <p className={styles.description}>{bike.description}</p>

        {!inAdmin && (
          <div
            className={styles.btnWrapper}
            style={
              inDetails
                ? { borderBottom: "none", marginTop: "1.5rem" }
                : { borderBottom: "1px solid #e97f26" }
            }
          >
            <Link href={formRedirectUrl} className={styles.activeBtn}>
              {buttonText}
            </Link>
            <Link
              href={`${basePath}/${modelSlug}-${nameSlug}/${bike.id}`}
              className={styles.btn}
              onClick={() => handleClick()}
            >
              Details
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default BikeCard;
