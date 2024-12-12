// Feature bikes are displayed on the main page, they should have the background removed, can be edited removed and updated in admin page with link to feature bikes page
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { cache } from "react";

export const getFeatureBikes = cache(async () => {
  try {
    const bikesCollectionRef = collection(db, "featureBikes");
    const bikesSnapshot = await getDocs(bikesCollectionRef);
    const bikesData = [];

    bikesSnapshot.forEach((doc) => {
      bikesData.push({ id: doc.id, ...doc.data() });
    });

    return bikesData;
  } catch (error) {
    console.error("Error fetching featured bikes:", error);
    return [];
  }
});
