"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  deleteDoc,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db, storage } from "../app/lib/firebase";
import styles from "../styles/removeBike.module.css";
import { deleteObject, ref } from "firebase/storage";
import BikeCard from "./BikeCard";

import { revalidateCache } from "../server-actions/revalidateCache";
import { revalidatePaths } from "../server-actions/revalidate";
import { clearBikeCache } from "../app/lib/clearBikeCache";
import { clearClientCache } from "../app/lib/cacheManager";

const RemoveBike = ({
  handleEdit,
  setFormType,
  setEditBikeId,
  showSignin,
  collectionType = "bikes",
}) => {
  const [admin, setAdmin] = useState(false);
  const [findData, setFindData] = useState({
    model: "",
    name: "",
    capacity: "",
  });
  const [searchItems, setSearchItems] = useState([]);
  const [deletedBike, setDeletedBike] = useState();
  const [allBikes, setAllBikes] = useState([]);
  const [uniqueValues, setUniqueValues] = useState({
    model: [],
    name: [],
    capacity: [],
  });
  const [hasSearched, setHasSearched] = useState(false);
  const scrollTargetRef = useRef(null);

  useEffect(() => {
    localStorage.getItem("Admin");

    if (localStorage.getItem("Admin")) {
      setAdmin(true);
    }
  }, [showSignin]);

  useEffect(() => {
    const scrollToBikeId = sessionStorage.getItem("scrollToBikeId");
    if (scrollToBikeId) {
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(`bike-${scrollToBikeId}`);
        if (element) {
          element.scrollIntoView({ block: "center", behavior: "smooth" });
          sessionStorage.removeItem("scrollToBikeId");
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [searchItems]);

  // Modified to fetch bikes from the specified collection
  const getBikesFromCollection = async (collectionName) => {
    try {
      const bikesCollectionRef = collection(db, collectionName);
      const bikesSnapshot = await getDocs(bikesCollectionRef);
      const bikesData = [];

      bikesSnapshot.forEach((doc) => {
        bikesData.push({ id: doc.id, ...doc.data() });
      });

      return bikesData;
    } catch (error) {
      console.error("Error fetching bikes:", error);
      return [];
    }
  };

  // Updated to use the new collection-specific fetch
  useEffect(() => {
    const fetchBikes = async () => {
      const bikes = await getBikesFromCollection(collectionType);
      setAllBikes(bikes);

      // Extract unique values for dropdowns
      const uniqueModel = [...new Set(bikes.map((bike) => bike.model))];
      const uniqueName = [...new Set(bikes.map((bike) => bike.name))];
      const uniqueCapacity = [...new Set(bikes.map((bike) => bike.capacity))];

      setUniqueValues({
        model: uniqueModel,
        name: uniqueName,
        capacity: uniqueCapacity,
      });
    };

    fetchBikes();
  }, [collectionType]); // Added collectionType as dependency

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFindData({ ...findData, [name]: value });
  };

  const handleSearch = () => {
    const filteredBikes = allBikes.filter((bike) => {
      const modelMatch =
        !findData.model ||
        bike.model.toLowerCase().includes(findData.model.toLowerCase());
      const nameMatch =
        !findData.name ||
        bike.name.toLowerCase().includes(findData.name.toLowerCase());
      const capacityMatch =
        !findData.capacity || bike.capacity.toString() === findData.capacity;
      return modelMatch && nameMatch && capacityMatch;
    });

    setHasSearched(true);
    setSearchItems(filteredBikes);
  };

  const handleListAll = () => {
    setSearchItems(allBikes);
  };

  const getFilePathFromURL = (url) => {
    const pathStart = url.indexOf("/o/") + 3;
    const pathEnd = url.indexOf("?alt=");
    return decodeURIComponent(url.substring(pathStart, pathEnd));
  };

  // Modified to use the correct collection and storage path
  const handleDeleteDoc = async (id) => {
    if (!id) {
      console.error("Id is undefined");
      alert("Id is undefined, cannot find that motorbike in the database");
      return;
    }

    try {
      const docRef = doc(db, collectionType, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const bikeData = docSnap.data();
        const imageUrls = bikeData.images || [];

        // Delete images from storage
        for (const imageSet of imageUrls) {
          if (imageSet.fullURL && imageSet.thumbURL) {
            try {
              const fullFilePath = getFilePathFromURL(imageSet.fullURL);
              const thumbFilePath = getFilePathFromURL(imageSet.thumbURL);

              const fullRef = ref(storage, fullFilePath);
              const thumbRef = ref(storage, thumbFilePath);

              await deleteObject(fullRef).catch((error) =>
                console.log(`Error deleting full image: ${error.message}`)
              );
              await deleteObject(thumbRef).catch((error) =>
                console.log(`Error deleting thumbnail: ${error.message}`)
              );
            } catch (error) {
              console.log(`Error processing image set: ${error.message}`);
            }
          }
        }

        await deleteDoc(docRef);
        setDeletedBike(id);
      } else {
        console.error("No such document exists.");
        alert("Error: No such document exists.");
      }
    } catch (error) {
      console.error("Error deleting document and images:", error);
      alert(`Error deleting document and images: ${error.message}`);
    }
  };

  const handleRemove = (e, id, model, name) => {
    e.preventDefault();
    handleDeleteDoc(id);
    setDeletedBike(id);
    alert(`${model} ${name} removed from database`);
    revalidateCache();
    clearBikeCache();
    revalidatePaths();
    clearClientCache();
  };

  const handleEditClick = (e, id) => {
    e.preventDefault();
    handleEdit(id);
    setFormType("Edit Bike");
    setEditBikeId(id);
    sessionStorage.setItem("lastEditedBikeId", id);
  };

  // Get collection title for display
  const getCollectionTitle = () => {
    switch (collectionType) {
      case "featureBikes":
        return "Featured Rental Bikes";
      case "featureSaleBikes":
        return "Featured Sale Bikes";
      default:
        return "All Bikes";
    }
  };

  return (
    <>
      <section
        className={styles.removeBike}
        style={admin ? {} : { filter: "blur(2px)", pointerEvents: "none" }}
      >
        <div className={styles.content}>
          <h2>{getCollectionTitle()}</h2>
          <p>
            Search by: Model, Name or Capacity, you will then get a list of
            matching motorbikes.
          </p>
          <form>
            <div className={styles.textInput}>
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                name="model"
                value={findData.model}
                onChange={(e) => handleChange(e)}
                placeholder="Honda, Yamaha?"
              />
            </div>
            <div className={styles.dropdown}>
              <label htmlFor="model">Choose -</label>
              <select
                name="model"
                id="model"
                onChange={(e) => handleChange(e)}
                value={findData.model}
              >
                <option value="">Select Model</option>
                {uniqueValues.model.map((model, index) => (
                  <option key={index} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.textInput}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={findData.name}
                onChange={(e) => handleChange(e)}
                placeholder="Cub, Nuovo, Jupiter?"
              />
            </div>
            <div className={styles.dropdown}>
              <label htmlFor="name">Choose -</label>
              <select
                name="name"
                id="name"
                onChange={(e) => handleChange(e)}
                value={findData.name}
              >
                <option value="">Select Name</option>
                {uniqueValues.name.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.textInput}>
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={findData.capacity}
                onChange={(e) => handleChange(e)}
                placeholder='125, 250? do not add "CC"'
              />
            </div>
            <div className={styles.dropdown}>
              <label htmlFor="capacity">Choose -</label>
              <select
                name="capacity"
                id="capacity"
                onChange={(e) => handleChange(e)}
                value={findData.capacity}
              >
                <option value="">Select Capacity</option>
                {uniqueValues.capacity.map((capacity, index) => (
                  <option key={index} value={capacity}>
                    {capacity}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              name="honeypot"
              value={findData.honeypot}
              onChange={(e) => handleChange(e)}
              style={{ display: "none" }}
              tabIndex="-1"
              autoComplete="off"
            />
            <button
              className={styles.submitBtn}
              style={{ marginTop: "1rem" }}
              type="button"
              onClick={() => handleSearch()}
            >
              Find Motorbike
            </button>

            <button
              className={styles.submitBtn}
              type="button"
              onClick={() => handleListAll()}
            >
              List All
            </button>
          </form>
        </div>
      </section>
      {hasSearched ? (
        searchItems.length > 0 ? (
          <div
            className={styles.removeBikeList}
            style={admin ? {} : { filter: "blur(2px)", pointerEvents: "none" }}
          >
            <h2>Search Results</h2>
            <div className={styles.searchList}>
              {searchItems.map(
                (bike) =>
                  bike.id !== deletedBike && (
                    <div
                      key={bike.id}
                      id={`bike-${bike.id}`}
                      ref={
                        bike.id === sessionStorage.getItem("scrollToBikeId")
                          ? scrollTargetRef
                          : null
                      }
                      className={styles.listItem}
                    >
                      <BikeCard
                        bike={bike}
                        basePath={"/admin"}
                        inDetails={false}
                        inAdmin={true}
                        deletedBike={deletedBike}
                      />
                      <div className={styles.btnWrapper}>
                        <button
                          className={styles.btnActive}
                          onClick={(e) => handleEditClick(e, bike.id)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.btnActive}
                          onClick={(e) =>
                            handleRemove(e, bike.id, bike.name, bike.model)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        ) : (
          <div
            className={styles.removeBikeList}
            style={admin ? {} : { filter: "blur(2px)", pointerEvents: "none" }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
              No Bikes Found
            </h2>
          </div>
        )
      ) : (
        <div
          className={styles.removeBikeList}
          style={admin ? {} : { filter: "blur(2px)", pointerEvents: "none" }}
        >
          <h2>All Bikes</h2>
          <div className={styles.searchList}>
            {allBikes.map((bike) => (
              <div
                key={bike.id}
                className={styles.listItem}
                id={`bike-${bike.id}`}
                ref={
                  bike.id === sessionStorage.getItem("scrollToBikeId")
                    ? scrollTargetRef
                    : null
                }
              >
                <BikeCard
                  bike={bike}
                  basePath={"/admin"}
                  inDetails={false}
                  inAdmin={true}
                />
                <div className={styles.btnWrapper}>
                  <button
                    className={styles.btnActive}
                    onClick={(e) => handleEditClick(e, bike.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.btnActive}
                    onClick={(e) =>
                      handleRemove(e, bike.id, bike.name, bike.model)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RemoveBike;
