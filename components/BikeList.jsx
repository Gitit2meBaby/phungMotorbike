"use client";

import { useState, useEffect } from "react";
import BikeCard from "./BikeCard";
import Sorter from "./Sorter";
import styles from "../styles/bikeList.module.css";
import { usePathname } from "next/navigation";

import { getBikesFromFirebase } from "../app/lib/getBikesFromFirebase";

export default function BikeList({ initialBikes, basePath }) {
  const [sortedBikes, setSortedBikes] = useState(initialBikes);
  const [sortMethod, setSortMethod] = useState({
    key: getDefaultSortKey(basePath),
    direction: "asc",
  });

  useEffect(() => {
    // Force a fresh Firebase fetch
    const checkFirebase = async () => {
      console.log("Direct Firebase check...");
      const freshBikes = await getBikesFromFirebase();
      console.log("Direct Firebase result:", freshBikes.length, "bikes");
    };

    checkFirebase();
  }, []);

  const pathname = usePathname();

  // Extract the base path from the current pathname
  const currentBasePath = pathname.split("/").slice(0, -1).join("/");

  // Use the extracted basePath instead of the prop
  const actualBasePath = currentBasePath || basePath;

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

  // Sort the bikes based on the current sort method
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

  // Function to handle sort changes dropdown
  const handleSortChange = (key, direction) => {
    setSortMethod({ key, direction });
  };

  const priceKey = getDefaultSortKey(basePath);

  // used mostly in Admin Page to help with returning to the last edited bike
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const bikeElement = document.getElementById(hash.substring(1));
      if (bikeElement) {
        bikeElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [sortedBikes]);

  return (
    <>
      <Sorter
        priceKey={priceKey}
        sortMethod={sortMethod}
        onSortChange={handleSortChange}
      />
      <div className={styles.bikeList}>
        {sortedBikes.map((bike) => (
          <div key={bike.id} id={`bike-${bike.id}`}>
            <BikeCard bike={bike} basePath={actualBasePath} />
          </div>
        ))}
      </div>
    </>
  );
}
