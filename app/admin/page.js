'use client'
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
export const dynamic = 'force-dynamic';

import { db, storage } from '../lib/firebase';
import {
    collection,
    serverTimestamp,
    doc,
    setDoc,
    getDoc,
    updateDoc,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import styles from '../../styles/admin.module.css';
import ImageUploader from '../../components/ImageUploader';
import RemoveBike from '../../components/RemoveBike';
import Signin from '../../components/Signin';
import { revalidateCache } from '../actions/revalidateCache';
import { clearBikeCache } from '../lib/clearBikeCache';
import { scrollToTop } from '../lib/scrollToTop';
import Link from 'next/link';

export default function AdminDashboardForm() {
    const [admin, setAdmin] = useState(false);
    const [showSignin, setShowSignin] = useState(true);
    const [formData, setFormData] = useState({
        model: '',
        name: '',
        capacity: '',
        type: '',
        description: '',
        cityPrice: '',
        travelPrice: '',
        salePrice: '',
        monthPrice: '',
    });
    const [files, setFiles] = useState([]);
    const [preview, setPreview] = useState([]);

    const [formType, setFormType] = useState('Remove Bike');
    const [editBikeId, setEditBikeId] = useState(null); // Store bikeId if editing
    const [initialFiles, setInitialFiles] = useState([]);

    useEffect(() => {
        localStorage.getItem('Admin');

        if (localStorage.getItem('Admin')) {
            setAdmin(true)
            setShowSignin(false)
        }
    }, [showSignin]);

    useEffect(() => {
        localStorage.getItem('Admin');

        if (localStorage.getItem('Admin')) {
            setAdmin(true)
            setShowSignin(false)
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
 
    const handleType = (e) => {
        setFormData(prevState => ({
            ...prevState,
            type: e.target.value
        }));
    };

 const uploadImages = async (files, bikeId, bikeModel, bikeName) => {
    console.log(files, bikeId, bikeModel, bikeName);

    if (!bikeModel || !bikeName) {
        console.error('Bike model or name is missing:', { bikeModel, bikeName });
        alert('Error: Bike model or name is missing');
        throw new Error('Bike model and name are required for uploading images.');
    }

    const uploadPromises = files.flatMap(async (file, index) => {
        if (file && file.thumbImage && file.fullImage) {
            // Construct file names directly without adding a subfolder for the bikeId
            const thumbFileName = `${bikeModel}-${bikeName}-thumb-${index}.webp`;
            const fullFileName = `${bikeModel}-${bikeName}-full-${index}.webp`;

            // Update storage references to put the files directly in the 'bikes' folder
            const thumbRef = ref(storage, `bikes/${thumbFileName}`);
            const fullRef = ref(storage, `bikes/${fullFileName}`);

            // Upload thumb and full images
            const [thumbUpload, fullUpload] = await Promise.all([
                uploadBytes(thumbRef, file.thumbImage),
                uploadBytes(fullRef, file.fullImage)
            ]);

            // Get download URLs for the uploaded files
            const [thumbURL, fullURL] = await Promise.all([
                getDownloadURL(thumbUpload.ref),
                getDownloadURL(fullUpload.ref)
            ]);

            return { thumbURL, fullURL };  // Return URLs for this image set
        }
        return null;
    });

    // Wait for all upload promises to resolve
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls.filter(Boolean);  // Filter out any null entries
};

const handleSubmit = async (e) => {
    e.preventDefault();

            if (files.length === 0) {
            console.error("No files to submit!");
            return;
        }

    if (formData.honeypot) {
        console.log("Bot submission detected");
        return;
    }

    try {
        const bikeData = {
            ...formData,
            timestamp: serverTimestamp()
        };

        // Check if images have been modified
        const filesChanged = files.some((file, index) => {
            return (
                file.thumbImage !== initialFiles[index]?.thumbImage ||
                file.fullImage !== initialFiles[index]?.fullImage
            );
        });

        if (editBikeId) {
            // Editing an existing bike
            const bikeDocRef = doc(db, "bikes", editBikeId);

            if (filesChanged) {
                // Only upload new images if they have changed
                const updatedImageUrls = await uploadImages(files, editBikeId, formData.model, formData.name);
                bikeData.images = updatedImageUrls;
            } else {
                // Retain the existing images
                bikeData.images = initialFiles.map(file => ({
                    thumbURL: file.thumbImage,
                    fullURL: file.fullImage
                }));
            }

            await updateDoc(bikeDocRef, bikeData);
            alert("Bike updated successfully!");
        sessionStorage.setItem('scrollToBikeId', editBikeId);
        setFormType('Remove Bike');
        } else {
            // Adding a new bike (existing code)
            const bikesRef = collection(db, "bikes");
            const bikeId = nanoid(10);
            const bikeDoc = doc(bikesRef, bikeId);

            const imageUrls = await uploadImages(files, bikeId, formData.model, formData.name);
            bikeData.images = imageUrls;

            // Set the bike document with bikeData, including image URLs
            await setDoc(bikeDoc, bikeData);

            alert("Bike added successfully!");
        }

        clearFields();
        await revalidateCache();
        clearBikeCache();
        setEditBikeId(null); // Reset edit state

    } catch (error) {
         if (error.code === 'resource-exhausted' || error.message.includes('quota exceeded')) {
        alert("Error: Quota exceeded. Please try again later.", error); 
      } else {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
      }
    }
};

    const handleEdit = async (bikeId) => {
        scrollToTop();
        try {
            // Fetch the bike data by bikeId
            const bikeDocRef = doc(db, "bikes", bikeId);
            const bikeDoc = await getDoc(bikeDocRef);

            if (bikeDoc.exists()) {
                const bikeData = bikeDoc.data();

                setFormData(bikeData); // Populate form
                setFormType("Edit Bike");
                setEditBikeId(bikeId);

                // Extract images from Firestore document and prepare for state
                const loadedFiles = (bikeData.images || []).map(image => ({
                    thumbImage: image.thumbURL,
                    fullImage: image.fullURL
                }));

                console.log("Loaded files:", loadedFiles);
                setInitialFiles(loadedFiles);
            } else {
                console.log("No such document exists.");
            }
        } catch (error) {
            console.error("Error fetching bike:", error);
        }
    };

    useEffect(() => {
        setFiles(initialFiles)
        setPreview(initialFiles.map(file => file.thumbImage));
    }, [initialFiles]);

    const clearFields = () => {
        setFormData({
            model: '',
            name: '',
            capacity: '',
            description: '',
            cityPrice: '',
            travelPrice: '',
            monthPrice: '',
            honeypot: ''
        });
        setFiles([]);
        setPreview([]);
        setEditBikeId(null);
    };

    return (
        <>
            <section className={styles.admin}
                style={{ filter: !admin ? 'blur(5px) brightness(0.5)' : '', pointerEvents: !admin ? 'none' : '' }}>
                    <Link className={styles.link} href="/admin/feature-bikes">Change Feature Bikes <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg></Link>
                <h1>Admin Dashboard</h1>
                
                <div className={styles.divider}></div>

                   <div className={styles.btnWrapper}>
                    <button
                        className={formType === 'Add Bike' ? styles.btnActive : styles.btn}
                        onClick={() => {setFormType('Add Bike'); clearFields(); console.log("FormType:", formType);}}
                    >
                        Add Bike
                    </button>
                    <button
                        className={formType === 'Remove Bike' ? styles.btnActive : styles.btn}
                        onClick={() => setFormType('Remove Bike')}
                    >
                        Edit/Remove Bike
                    </button>
                </div>

                {(formType === 'Add Bike' || formType === 'Edit Bike') && (
                    <form onSubmit={handleSubmit}>
                        <div className={styles.textInput}>
                            <label htmlFor="model">Model</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                placeholder='Honda, Yamaha?'
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
                                placeholder='Cub, Nuovo, Jupiter?'
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
                                placeholder='125, 250?'
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
                                    checked={formData.type === 'Automatic'}
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
                                    checked={formData.type === 'Semi - Automatic'}
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
                                    checked={formData.type === 'Manual'}
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
                                placeholder='Describe the motorbike'
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
                                placeholder='USD'
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
                                placeholder='USD'
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
                                placeholder='VND'
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
                                placeholder='USD'
                            />
                        </div>

                        <ImageUploader files={files} setFiles={setFiles} preview={preview} setPreview={setPreview} id={editBikeId} formtype={formType} />

                        {/*Honeypot*/}
                        <input
                            type="text"
                            name="honeypot"
                            value={formData.honeypot}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                            tabIndex="-1"
                            autoComplete="off"
                        />
                        <button className={styles.submitBtn} type="submit">
                            {formType === 'Edit Bike' ? 'Save Changes' : 'Submit'}</button>
                    </form>
                )}
            </section>

            <section>
                {formType === 'Remove Bike' && (
                    <RemoveBike setEditBikeId={setEditBikeId}
                        setFormType={setFormType}
                        handleEdit={handleEdit}
                        showSignin={showSignin} />
                )}
            </section>

            {!admin && (
                <>
                <h3 className={styles.adminOnly}>This page is only available for Administration</h3>
                {showSignin && (
                    <Signin setShowSignin={setShowSignin} setAdmin={setAdmin} />
                )}
                </>
            )}
        </>
    );
};