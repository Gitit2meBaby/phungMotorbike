"use client";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
export const dynamic = "force-dynamic";

// Firebase imports for database and storage operations
import { db, storage } from "../lib/firebase";
import {
  collection,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Component and utility imports
import styles from "../../styles/admin.module.css";
import ImageUploader from "../../components/ImageUploader";
import RemoveBike from "../../components/RemoveBike";
import Signin from "../../components/Signin";
import { revalidateCache } from "../../server-actions/revalidateCache";
import { revalidatePaths } from "../../server-actions/revalidate";
import { clearBikeCache } from "../lib/clearBikeCache";
import { clearClientCache } from "../lib/cacheManager";
import { scrollToTop } from "../lib/scrollToTop";
import Link from "next/link";

export default function AdminDashboardForm() {
  // State management for authentication and form visibility
  const [admin, setAdmin] = useState(false);
  const [showSignin, setShowSignin] = useState(true);

  // Main form data state with all bike details
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

  // State for managing image uploads and previews
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);

  // State for managing form mode (Add/Edit/Remove) and editing specific bike
  const [formType, setFormType] = useState("Remove Bike");
  const [editBikeId, setEditBikeId] = useState(null);
  const [initialFiles, setInitialFiles] = useState([]);

  // Check for admin authentication on component mount and signin state change
  useEffect(() => {
    if (localStorage.getItem("Admin")) {
      setAdmin(true);
      setShowSignin(false);
    }
  }, [showSignin]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle bike type radio selection
  const handleType = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      type: e.target.value,
    }));
  };

  // Upload images to Firebase Storage and return URLs
  const uploadImages = async (files, bikeId, bikeModel, bikeName) => {
    if (!bikeModel || !bikeName) {
      console.error("Bike model or name is missing:", { bikeModel, bikeName });
      alert("Error: Bike model or name is missing");
      throw new Error("Bike model and name are required for uploading images.");
    }

    const uploadPromises = files.flatMap(async (file, index) => {
      if (file && file.thumbImage && file.fullImage) {
        // Create standardized filenames for storage
        const thumbFileName = `${bikeModel}-${bikeName}-thumb-${index}.webp`;
        const fullFileName = `${bikeModel}-${bikeName}-full-${index}.webp`;

        const thumbRef = ref(storage, `bikes/${thumbFileName}`);
        const fullRef = ref(storage, `bikes/${fullFileName}`);

        // Upload both thumbnail and full-size images
        const [thumbUpload, fullUpload] = await Promise.all([
          uploadBytes(thumbRef, file.thumbImage),
          uploadBytes(fullRef, file.fullImage),
        ]);

        // Get download URLs for uploaded images
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

  // Handle form submission for both adding and editing bikes
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validFiles = files.filter((file) => file !== null);

    if (validFiles.length === 0) {
      alert("Please upload at least one image!");
      return;
    }

    // Bot protection check
    if (formData.honeypot) {
      console.log("Bot submission detected");
      return;
    }

    try {
      const bikeData = {
        ...formData,
        timestamp: serverTimestamp(),
      };

      // Check if images have been modified during edit
      const filesChanged =
        editBikeId &&
        files.some((file, index) => {
          return (
            file &&
            (!initialFiles[index] ||
              file.thumbImage !== initialFiles[index]?.thumbImage ||
              file.fullImage !== initialFiles[index]?.fullImage)
          );
        });

      if (editBikeId) {
        // Update existing bike
        const bikeDocRef = doc(db, "bikes", editBikeId);
        bikeData.images = filesChanged
          ? await uploadImages(
              validFiles,
              editBikeId,
              formData.model,
              formData.name
            )
          : initialFiles
              .filter((file) => file !== null)
              .map((file) => ({
                thumbURL: file.thumbImage,
                fullURL: file.fullImage,
              }));

        await updateDoc(bikeDocRef, bikeData);
        alert("Bike updated successfully!");
        sessionStorage.setItem("scrollToBikeId", editBikeId);
      } else {
        // Add new bike
        const bikeId = nanoid(10);
        const bikeDoc = doc(collection(db, "bikes"), bikeId);
        bikeData.images = await uploadImages(
          validFiles,
          bikeId,
          formData.model,
          formData.name
        );
        await setDoc(bikeDoc, bikeData);
        alert("Bike added successfully!");
      }

      // Clear all caches after successful update
      try {
        await Promise.all([
          revalidateCache(),
          revalidatePaths(),
          (async () => {
            clearClientCache();
            clearBikeCache();
          })(),
        ]);
      } catch (cacheError) {
        console.error("Cache clearing error:", cacheError);
      }

      clearFields();
      setEditBikeId(null);
    } catch (error) {
      if (
        error.code === "resource-exhausted" ||
        error.message.includes("quota exceeded")
      ) {
        alert("Error: Quota exceeded. Please try again later.");
      } else {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  // Load bike data for editing
  const handleEdit = async (bikeId) => {
    scrollToTop();
    try {
      const bikeDoc = await getDoc(doc(db, "bikes", bikeId));
      if (bikeDoc.exists()) {
        const bikeData = bikeDoc.data();
        setFormData(bikeData);
        setFormType("Edit Bike");
        setEditBikeId(bikeId);

        // Prepare existing images for the form
        const loadedFiles = (bikeData.images || []).map((image) => ({
          thumbImage: image.thumbURL,
          fullImage: image.fullURL,
        }));
        setInitialFiles(loadedFiles);
      }
    } catch (error) {
      console.error("Error fetching bike:", error);
    }
  };

  // Update files and preview when initialFiles changes
  useEffect(() => {
    setFiles(initialFiles);
    setPreview(initialFiles.map((file) => file.thumbImage));
  }, [initialFiles]);

  // Reset form to initial state
  const clearFields = () => {
    setFormData({
      model: "",
      name: "",
      capacity: "",
      description: "",
      cityPrice: "",
      travelPrice: "",
      monthPrice: "",
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
        <Link className={styles.link} href="/admin/feature-bikes">
          Change Feature Bikes{" "}
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path>
          </svg>
        </Link>
        <h1>Admin Dashboard</h1>

        <div className={styles.divider}></div>

        <div className={styles.btnWrapper}>
          <button
            className={formType === "Add Bike" ? styles.btnActive : styles.btn}
            onClick={() => {
              setFormType("Add Bike");
              clearFields();
              console.log("FormType:", formType);
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
          <form onSubmit={handleSubmit}>
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

            <label htmlFor="type">Type:</label>
            <div className={styles.radioWrapper}>
              <div className={styles.radio}>
                <input
                  type="radio"
                  id="type-automatic"
                  name="type"
                  value="Automatic"
                  checked={formData.type === "Automatic"}
                  onChange={(e) => handleType(e)}
                />
                <label htmlFor="type-automatic">Automatic</label>
              </div>

              <div className={styles.radio}>
                <input
                  type="radio"
                  id="type-semi-auto"
                  name="type"
                  value="Semi - Automatic"
                  checked={formData.type === "Semi - Automatic"}
                  onChange={(e) => handleType(e)}
                />
                <label htmlFor="type-semi-auto">Semi-Automatic</label>
              </div>

              <div className={styles.radio}>
                <input
                  type="radio"
                  id="type-manual"
                  name="type"
                  value="Manual"
                  checked={formData.type === "Manual"}
                  onChange={(e) => handleType(e)}
                />
                <label htmlFor="type-manual">Manual</label>
              </div>
            </div>

            <div className={styles.description}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the motorbike"
                required
              />
            </div>

            <div className={styles.priceInput}>
              <label htmlFor="cityPrice">Inner City Price</label>
              <input
                type="number"
                id="cityPrice"
                name="cityPrice"
                value={formData.cityPrice}
                onChange={handleChange}
                placeholder="USD"
              />
            </div>

            <div className={styles.priceInput}>
              <label htmlFor="travelPrice">Travelling Price</label>
              <input
                type="number"
                id="travelPrice"
                name="travelPrice"
                value={formData.travelPrice}
                onChange={handleChange}
                placeholder="USD"
              />
            </div>

            <div className={styles.priceInput}>
              <label htmlFor="monthPrice">Month Price</label>
              <input
                type="number"
                id="monthPrice"
                name="monthPrice"
                value={formData.monthPrice}
                onChange={handleChange}
                placeholder="VND"
              />
            </div>

            <div className={styles.priceInput}>
              <label htmlFor="salePrice">Sale Price</label>
              <input
                type="number"
                id="salePrice"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                placeholder="USD"
              />
            </div>

            <ImageUploader
              files={files}
              setFiles={setFiles}
              preview={preview}
              setPreview={setPreview}
              id={editBikeId}
              formtype={formType}
            />

            {/*Honeypot*/}
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
