// used to get bikes from firebase after cache clear (possibly not needed, but problems occured  when trying to clear cache, calling a new function may be helping)
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";

export async function getBikesFromFirebase() {
  const listingsCollection = collection(db, "bikes");
  const snapshot = await getDocs(listingsCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
