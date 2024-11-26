import globalCache from "./globalCache";
import { getBikesFromFirebase } from "./getBikesFromFirebase";

const ALL_BIKES_KEY = "ALL_BIKES";
const DEBUG_CACHE = true;

// Add this new function for forcing fresh data
export async function getFreshBikes(filters = {}) {
  console.log("Forcing fresh fetch from Firebase");
  try {
    let allBikes = await getBikesFromFirebase();

    // Transform the bikes data
    allBikes = allBikes.map((bike) => ({
      id: bike.id,
      type: bike.type,
      timestamp: bike.timestamp
        ? {
            seconds: bike.timestamp.seconds,
            nanoseconds: bike.timestamp.nanoseconds,
          }
        : null,
      images: bike.images,
      capacity: bike.capacity,
      cityPrice: bike.cityPrice,
      description: bike.description,
      salePrice: bike.salePrice,
      model: bike.model,
      travelPrice: bike.travelPrice,
      monthPrice: bike.monthPrice,
      name: bike.name,
    }));

    // Update the cache with fresh data
    globalCache.set(ALL_BIKES_KEY, allBikes);
    console.log("Cache updated with fresh data");

    // Apply filters
    return allBikes.filter((bike) => {
      for (const [key, value] of Object.entries(filters)) {
        if (bike[key] !== value) return false;
      }
      return true;
    });
  } catch (error) {
    console.error("Error fetching fresh bikes:", error);
    throw error;
  }
}

export async function getBikes(filters = {}) {
  if (DEBUG_CACHE) {
    console.log("Cache status:", {
      isCached: globalCache.get(ALL_BIKES_KEY) !== undefined,
      timestamp: new Date().toISOString(),
    });
  }

  // Separate price type filter from other filters
  const { priceType, ...regularFilters } = filters;

  // Check the cache first
  let allBikes = globalCache.get(ALL_BIKES_KEY);

  if (!allBikes) {
    console.log("Fetching all bikes from Firebase");
    try {
      allBikes = await getBikesFromFirebase();

      // Transform the bikes data to ensure it's serializable
      allBikes = allBikes.map((bike) => ({
        id: bike.id,
        type: bike.type,
        timestamp: bike.timestamp
          ? {
              seconds: bike.timestamp.seconds,
              nanoseconds: bike.timestamp.nanoseconds,
            }
          : null,
        images: bike.images,
        capacity: bike.capacity,
        cityPrice: bike.cityPrice,
        description: bike.description,
        salePrice: bike.salePrice,
        model: bike.model,
        travelPrice: bike.travelPrice,
        monthPrice: bike.monthPrice,
        name: bike.name,
      }));

      // Store the fetched bikes in the cache
      globalCache.set(ALL_BIKES_KEY, allBikes);
    } catch (error) {
      if (
        error.code === "resource-exhausted" ||
        error.message.includes("quota exceeded")
      ) {
        alert("Error: Quota exceeded. Please try again later.");
      } else {
        console.error("Error fetching bikes from Firebase:", error);
      }
    }
  } else {
    console.log("Using cached bikes");
  }

  // Apply filters and return bikes
  return allBikes
    ? allBikes.filter((bike) => {
        // Check regular filters (type, etc.)
        for (const [key, value] of Object.entries(regularFilters)) {
          if (bike[key] !== value) return false;
        }

        // If a price type is specified, check if it has a valid price
        if (priceType) {
          const price = bike[priceType];
          // Exclude if price is null, undefined, NaN, 0, or less than 0
          if (!price || isNaN(price) || price <= 0) return false;
        }

        return true;
      })
    : [];
}
