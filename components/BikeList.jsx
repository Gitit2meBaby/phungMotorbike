"use client";

import { useState, useEffect } from "react";
import BikeCard from "./BikeCard";
import Sorter from "./Sorter";
import styles from "../styles/bikeList.module.css";

export default function BikeList({ initialBikes, basePath }) {
  const [sortedBikes, setSortedBikes] = useState(initialBikes);
  const [sortMethod, setSortMethod] = useState({
    key: getDefaultSortKey(basePath),
    direction: "asc",
  });

  // Function to determine the default sort key based on basePath
  function getDefaultSortKey(basePath) {
    switch (basePath) {
      case "/motorbikes-for-rent-hanoi":
        return "cityPrice";
      case "/motorbike-rentals-vietnam":
        return "travelPrice";
      case "/motorbikes-for-sale":
        return "salePrice";
      case "/monthly-rentals-hanoi":
        return "monthPrice";
      default:
        return "cityPrice"; // Fallback to 'cityPrice' if basePath is not recognized
    }
  }

  // Update the sort method when the basePath changes
  useEffect(() => {
    const defaultSortKey = getDefaultSortKey(basePath);
    // Directly set the new sort method without depending on previous state
    setSortMethod({ key: defaultSortKey, direction: "asc" });
  }, [basePath]);

  useEffect(() => {
    let sortedArray = [...initialBikes];

    if (sortMethod.key === "cityPrice") {
      sortedArray.sort((a, b) =>
        sortMethod.direction === "asc"
          ? a.cityPrice - b.cityPrice
          : b.cityPrice - a.cityPrice
      );
    } else if (sortMethod.key === "travelPrice") {
      sortedArray.sort((a, b) =>
        sortMethod.direction === "asc"
          ? a.travelPrice - b.travelPrice
          : b.travelPrice - a.travelPrice
      );
    } else if (sortMethod.key === "salePrice") {
      sortedArray.sort((a, b) =>
        sortMethod.direction === "asc"
          ? a.salePrice - b.salePrice
          : b.salePrice - a.salePrice
      );
    } else if (sortMethod.key === "monthPrice") {
      sortedArray.sort((a, b) =>
        sortMethod.direction === "asc"
          ? a.monthPrice - b.monthPrice
          : b.monthPrice - a.monthPrice
      );
    } else if (sortMethod.key === "capacity") {
      sortedArray.sort((a, b) =>
        sortMethod.direction === "asc"
          ? a.capacity - b.capacity
          : b.capacity - a.capacity
      );
    }

    setSortedBikes(sortedArray);
  }, [sortMethod, initialBikes]);

  const handleSortChange = (key, direction) => {
    setSortMethod({ key, direction });
  };

  const priceKey = getDefaultSortKey(basePath);

  return (
    <>
      <Sorter
        priceKey={priceKey}
        sortMethod={sortMethod}
        onSortChange={handleSortChange}
      />
      <div className={styles.bikeList}>
        {sortedBikes.map((bike) => (
          <div key={bike.id}>
            <BikeCard bike={bike} basePath={basePath} />
          </div>
        ))}
      </div>
    </>
  );
}
