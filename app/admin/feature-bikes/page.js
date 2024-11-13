// app/admin/feature-bikes/page.js
"use client";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { db, storage } from "../../lib/firebase";
import {
  collection,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import styles from "../../../styles/admin.module.css";
import ImageUploader from "../../../components/ImageUploader";
import RemoveBike from "../../../components/RemoveBike";
import Signin from "../../../components/Signin";
import { revalidateCache } from "../../../server-actions/revalidateCache";
import { revalidatePaths } from "../../../server-actions/revalidate";
import { clearBikeCache } from "../../lib/clearBikeCache";
import { clearClientCache } from "../../lib/cacheManager";
import { scrollToTop } from "../../lib/scrollToTop";

export default function FeatureBikesAdmin() {
  const [admin, setAdmin] = useState(false);
  const [showSignin, setShowSignin] = useState(true);
  const [formData, setFormData] = useState({
    model: "",
    name: "",
    capacity: "",
    type: "",
    description: "",
    cityPrice: "",
    travelPrice: "",
    salePrice: "",
    monthPrice: "",
  });
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [collectionType, setCollectionType] = useState("featureBikes");
  const [formType, setFormType] = useState("Remove Bike");
  const [editBikeId, setEditBikeId] = useState(null);
  const [initialFiles, setInitialFiles] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("Admin")) {
      setAdmin(true);
      setShowSignin(false);
    }
  }, [showSignin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCollectionChange = (type) => {
    setCollectionType(type);
    clearFields();
    setFormType("Remove Bike");
  };

  const uploadImages = async (files, bikeId, bikeModel, bikeName) => {
    if (!bikeModel || !bikeName) {
      console.error("Bike model or name is missing:", { bikeModel, bikeName });
      alert("Error: Bike model or name is missing");
      throw new Error("Bike model and name are required for uploading images.");
    }

    const uploadPromises = files.flatMap(async (file, index) => {
      if (file && file.thumbImage && file.fullImage) {
        const thumbFileName = `${bikeModel}-${bikeName}-thumb-${index}.webp`;
        const fullFileName = `${bikeModel}-${bikeName}-full-${index}.webp`;

        const folderPath =
          collectionType === "featureBikes"
            ? "featureBikes"
            : "featureSaleBikes";

        const thumbRef = ref(storage, `${folderPath}/${thumbFileName}`);
        const fullRef = ref(storage, `${folderPath}/${fullFileName}`);

        const [thumbUpload, fullUpload] = await Promise.all([
          uploadBytes(thumbRef, file.thumbImage),
          uploadBytes(fullRef, file.fullImage),
        ]);

        const [thumbURL, fullURL] = await Promise.all([
          getDownloadURL(thumbUpload.ref),
          getDownloadURL(fullUpload.ref),
        ]);

        return { thumbURL, fullURL };
      }
      return null;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls.filter(Boolean);
  };

  const handleSubmitRental = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    if (formData.honeypot) return;

    if (
      !formData.model ||
      !formData.name ||
      !formData.capacity ||
      !formData.cityPrice
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const bikeData = {
        model: formData.model,
        name: formData.name,
        capacity: formData.capacity,
        cityPrice: formData.cityPrice,
        timestamp: serverTimestamp(),
      };

      const collectionRef = collection(db, "featureBikes");

      if (editBikeId) {
        const bikeDocRef = doc(collectionRef, editBikeId);
        const filesChanged = files.some(
          (file, index) =>
            file.thumbImage !== initialFiles[index]?.thumbImage ||
            file.fullImage !== initialFiles[index]?.fullImage
        );

        if (filesChanged) {
          const updatedImageUrls = await uploadImages(
            files,
            editBikeId,
            formData.model,
            formData.name
          );
          bikeData.images = updatedImageUrls;
        } else {
          bikeData.images = initialFiles.map((file) => ({
            thumbURL: file.thumbImage,
            fullURL: file.fullImage,
          }));
        }

        await updateDoc(bikeDocRef, bikeData);
        alert("Featured rental bike updated successfully!");
      } else {
        const bikeId = nanoid(10);
        const bikeDoc = doc(collectionRef, bikeId);
        const imageUrls = await uploadImages(
          files,
          bikeId,
          formData.model,
          formData.name
        );
        bikeData.images = imageUrls;
        await setDoc(bikeDoc, bikeData);
        alert("Featured rental bike added successfully!");
      }

      try {
        await Promise.all([
          revalidateCache(),
          revalidatePaths(),
          (async () => {
            clearClientCache(); // Synchronous operation
            clearBikeCache(); // Synchronous operation
          })(),
        ]);
      } catch (cacheError) {
        console.error("Cache clearing error:", cacheError);
      }

      clearFields();
      setEditBikeId(null);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleSubmitSale = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    if (formData.honeypot) return;

    if (
      !formData.model ||
      !formData.name ||
      !formData.capacity ||
      !formData.salePrice
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const bikeData = {
        model: formData.model,
        name: formData.name,
        capacity: formData.capacity,
        salePrice: formData.salePrice,
        timestamp: serverTimestamp(),
      };

      const collectionRef = collection(db, "featureSaleBikes");

      if (editBikeId) {
        const bikeDocRef = doc(collectionRef, editBikeId);
        const filesChanged = files.some(
          (file, index) =>
            file.thumbImage !== initialFiles[index]?.thumbImage ||
            file.fullImage !== initialFiles[index]?.fullImage
        );

        if (filesChanged) {
          const updatedImageUrls = await uploadImages(
            files,
            editBikeId,
            formData.model,
            formData.name
          );
          bikeData.images = updatedImageUrls;
        } else {
          bikeData.images = initialFiles.map((file) => ({
            thumbURL: file.thumbImage,
            fullURL: file.fullImage,
          }));
        }

        await updateDoc(bikeDocRef, bikeData);
        alert("Featured sale bike updated successfully!");
      } else {
        const bikeId = nanoid(10);
        const bikeDoc = doc(collectionRef, bikeId);
        const imageUrls = await uploadImages(
          files,
          bikeId,
          formData.model,
          formData.name
        );
        bikeData.images = imageUrls;
        await setDoc(bikeDoc, bikeData);
        alert("Featured sale bike added successfully!");
      }

      clearFields();
      await revalidateCache();
      revalidatePaths();
      clearBikeCache();
      setEditBikeId(null);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleEdit = async (bikeId) => {
    scrollToTop();
    try {
      const bikeDocRef = doc(db, collectionType, bikeId);
      const bikeDoc = await getDoc(bikeDocRef);

      if (bikeDoc.exists()) {
        const bikeData = bikeDoc.data();
        setFormData({
          model: bikeData.model || "",
          name: bikeData.name || "",
          capacity: bikeData.capacity || "",
          cityPrice: bikeData.cityPrice || "",
          salePrice: bikeData.salePrice || "",
        });
        setFormType("Edit Bike");
        setEditBikeId(bikeId);

        const loadedFiles = (bikeData.images || []).map((image) => ({
          thumbImage: image.thumbURL,
          fullImage: image.fullURL,
        }));

        setInitialFiles(loadedFiles);
      } else {
        console.log("No such document exists.");
      }
    } catch (error) {
      console.error("Error fetching bike:", error);
    }
  };

  useEffect(() => {
    setFiles(initialFiles);
    setPreview(initialFiles.map((file) => file.thumbImage));
  }, [initialFiles]);

  const clearFields = () => {
    setFormData({
      model: "",
      name: "",
      capacity: "",
      cityPrice: "",
      salePrice: "",
      honeypot: "",
    });
    setFiles([]);
    setPreview([]);
    setEditBikeId(null);
  };

  return (
    <>
      <section
        className={styles.admin}
        style={{
          filter: !admin ? "blur(5px) brightness(0.5)" : "",
          pointerEvents: !admin ? "none" : "",
        }}
      >
        <h1>Featured Bikes Admin</h1>

        <div className={styles.divider}></div>

        <div className={styles.btnWrapper}>
          <button
            className={
              collectionType === "featureBikes" ? styles.btnActive : styles.btn
            }
            onClick={() => handleCollectionChange("featureBikes")}
          >
            Featured Rentals
          </button>
          <button
            className={
              collectionType === "featureSaleBikes"
                ? styles.btnActive
                : styles.btn
            }
            onClick={() => handleCollectionChange("featureSaleBikes")}
          >
            Featured Sales
          </button>
        </div>

        <div className={styles.btnWrapper}>
          <button
            className={formType === "Add Bike" ? styles.btnActive : styles.btn}
            onClick={() => {
              setFormType("Add Bike");
              clearFields();
            }}
          >
            Add Bike
          </button>
          <button
            className={
              formType === "Remove Bike" ? styles.btnActive : styles.btn
            }
            onClick={() => setFormType("Remove Bike")}
          >
            Edit/Remove Bike
          </button>
        </div>

        {(formType === "Add Bike" || formType === "Edit Bike") && (
          <form
            onSubmit={
              collectionType === "featureBikes"
                ? handleSubmitRental
                : handleSubmitSale
            }
          >
            <div className={styles.textInput}>
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Honda, Yamaha?"
                required
              />
            </div>
            <div className={styles.textInput}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Cub, Nuovo, Jupiter?"
                required
              />
            </div>

            <div className={styles.textInput}>
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="125, 250?"
                required
              />
            </div>

            {/* Conditionally render price inputs based on collection type */}
            {collectionType === "featureBikes" && (
              <div className={styles.priceInput}>
                <label htmlFor="cityPrice">Inner City Price</label>
                <input
                  type="number"
                  id="cityPrice"
                  name="cityPrice"
                  value={formData.cityPrice}
                  onChange={handleChange}
                  placeholder="USD"
                  required
                />
              </div>
            )}

            {collectionType === "featureSaleBikes" && (
              <div className={styles.priceInput}>
                <label htmlFor="salePrice">Sale Price</label>
                <input
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  placeholder="USD"
                  required
                />
              </div>
            )}

            <ImageUploader
              files={files}
              setFiles={setFiles}
              preview={preview}
              setPreview={setPreview}
              id={editBikeId}
              formtype={formType}
            />

            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              style={{ display: "none" }}
              tabIndex="-1"
              autoComplete="off"
            />
            <button className={styles.submitBtn} type="submit">
              {formType === "Edit Bike" ? "Save Changes" : "Submit"}
            </button>
          </form>
        )}
      </section>

      <section>
        {formType === "Remove Bike" && (
          <RemoveBike
            setEditBikeId={setEditBikeId}
            setFormType={setFormType}
            handleEdit={handleEdit}
            showSignin={showSignin}
            collectionType={collectionType}
          />
        )}
      </section>

      {!admin && (
        <>
          <h3 className={styles.adminOnly}>
            This page is only available for Administration
          </h3>
          {showSignin && (
            <Signin setShowSignin={setShowSignin} setAdmin={setAdmin} />
          )}
        </>
      )}
    </>
  );
}
