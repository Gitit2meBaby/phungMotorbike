'use client'
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

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

export default function AdminDashboardForm() {
    const [admin, setAdmin] = useState(false);
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

    const [formType, setFormType] = useState('Add Bike');
    const [editBikeId, setEditBikeId] = useState(null); // Store bikeId if editing
    const [initialFiles, setInitialFiles] = useState([]);

    useEffect(() => {
        sessionStorage.getItem('Admin');

        if (!sessionStorage.getItem('Admin')) {
            setAdmin(true)
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
            throw new Error('Bike model and name are required for uploading images.');
        }

        const uploadPromises = files.flatMap(async (file, index) => {
            if (file && file.thumbImage && file.fullImage) {
                // Construct unique file names using model, name, and index to avoid duplicates
                const thumbFileName = `${bikeModel}-${bikeName}-thumb-${index}.webp`;
                const fullFileName = `${bikeModel}-${bikeName}-full-${index}.webp`;

                // Update storage references with unique filenames
                const thumbRef = ref(storage, `bikes/${bikeModel}-${bikeName}-${bikeId}/${thumbFileName}`);
                const fullRef = ref(storage, `bikes/${bikeModel}-${bikeName}-${bikeId}/${fullFileName}`);

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
        console.log("Submitting files:", files); // Log the files state

        if (files.length === 0) {
            console.error("No files to submit!");
            return; // Exit if there are no files
        }
        if (formData.honeypot) {
            console.log("Bot submission detected");
            return;
        }

        try {
            if (editBikeId) {

                // Editing an existing bike
                const bikeDocRef = doc(db, "bikes", editBikeId);
                const updatedBikeData = {
                    ...formData,
                    timestamp: serverTimestamp()
                };

                // Upload new images (if any) and add them to the bike data
                const updatedImageUrls = await uploadImages(files, editBikeId, formData.model, formData.name);
                updatedBikeData.images = [...(formData.images || []), ...updatedImageUrls];

                // Update the bike document with new data and images
                await updateDoc(bikeDocRef, updatedBikeData);

                alert("Bike updated successfully!");
            } else {
                // Adding a new bike (existing code)
                const bikesRef = collection(db, "bikes");
                const bikeId = nanoid(10);
                const bikeDoc = doc(bikesRef, bikeId);
                const bikeData = {
                    ...formData,
                    timestamp: serverTimestamp(),
                    id: bikeId
                };

                const imageUrls = await uploadImages(files, bikeId, formData.model, formData.name);
                bikeData.images = imageUrls;

                // Set the bike document with bikeData, including image URLs
                await setDoc(bikeDoc, bikeData);

                alert("Bike added successfully!");
            }

            clearFields();
            setEditBikeId(null); // Reset edit state

        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleEdit = async (bikeId) => {
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

                console.log("loadedFiles", loadedFiles);
                setInitialFiles(loadedFiles);
                console.log("bikeData", bikeData);
            } else {
                console.log("No such document exists.");
            }
        } catch (error) {
            console.error("Error fetching bike:", error);
        }
    };

    useEffect(() => {
        console.log("Updated files state:", files);
        setFiles(initialFiles)
        setPreview(initialFiles.map(file => file.thumbImage));
    }, [initialFiles]);

    useEffect(() => {
        console.log("Updated preview state:", preview);
        console.log('files in useEffect', files);
    }, [files]);


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
        setFormType('Add Bike');
        scrollToTop();
    };

    return (
        <>
            <section className={styles.admin}
                style={{ filter: admin ? 'blur(5px) brightness(0.5)' : '', pointerEvents: admin ? 'none' : '' }}>
                <h1>Admin Dashboard</h1>

                <div className={styles.divider}></div>

                <div className={styles.btnWrapper}>
                    <button
                        className={formType === 'Add Bike' ? styles.btnActive : styles.btn}
                        onClick={() => setFormType('Add Bike')}
                    >
                        {formType === 'Edit Bike' ? 'Edit Bike' : 'Add Bike'}
                    </button>
                    <button
                        className={formType === 'Remove Bike' ? styles.btnActive : styles.btn}
                        onClick={() => setFormType('Remove Bike')}
                    >
                        Remove Bike
                    </button>
                </div>

                {formType === 'Add Bike' || formType === 'Edit Bike' ? (
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
                                    value="automatic"
                                    checked={formData.type === 'automatic'}
                                    onChange={(e) => handleType(e)}
                                    aria-label="Automatic"
                                />
                                <label htmlFor="type-automatic">Automatic</label>
                            </div>

                            <div className={styles.radio}>
                                <input
                                    type="radio"
                                    id="type-semi-auto"
                                    name="type"
                                    value="semi-auto"
                                    checked={formData.type === 'semi-auto'}
                                    onChange={(e) => handleType(e)}
                                    aria-label="Semi-Automatic"
                                />
                                <label htmlFor="type-semi-auto">Semi-Automatic</label>
                            </div>

                            <div className={styles.radio}>
                                <input
                                    type="radio"
                                    id="type-manual"
                                    name="type"
                                    value="manual"
                                    checked={formData.type === 'manual'}
                                    onChange={(e) => handleType(e)}
                                    aria-label="Manual"
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
                                placeholder='USD'
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

                        <ImageUploader files={files} setFiles={setFiles} preview={preview} setPreview={setPreview} />

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
                ) : (
                    <RemoveBike setEditBikeId={setEditBikeId}
                        setFormType={setFormType}
                        handleEdit={handleEdit} />
                )}
            </section>
            {admin && (
                <h3 className={styles.adminOnly}>This page is only available for Administration</h3>
            )}
        </>
    );
};
