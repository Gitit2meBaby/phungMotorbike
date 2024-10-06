'use client'
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { db, storage } from '../lib/firebase';
import {
    collection,
    serverTimestamp,
    writeBatch, doc,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import styles from '../../styles/admin.module.css';
import ImageUploader from '../../components/ImageUploader';

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

    useEffect(() => {
        sessionStorage.getItem('Admin');

        if (!sessionStorage.getItem('Admin')) {
            setAdmin(true)
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const uploadImages = async (files, bikeId) => {
        const uploadPromises = files.flatMap(async (file) => {
            if (file && file.thumbImage && file.fullImage) {
                const thumbRef = ref(storage, `bikes/${bikeId}/thumb`);
                const fullRef = ref(storage, `bikes/${bikeId}/full`);

                const [thumbUpload, fullUpload] = await Promise.all([
                    uploadBytes(thumbRef, file.thumbImage),
                    uploadBytes(fullRef, file.fullImage)
                ]);

                const [thumbURL, fullURL] = await Promise.all([
                    getDownloadURL(thumbUpload.ref),
                    getDownloadURL(fullUpload.ref)
                ]);

                return { thumbURL, fullURL };
            }
            return null;
        });

        const imageUrls = await Promise.all(uploadPromises);
        return imageUrls.filter(Boolean); // Remove any null entries
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.honeypot) {
            console.log('Bot submission detected');
            return;
        }

        try {
            const bikesRef = collection(db, 'bikes');
            const bikeDoc = doc(bikesRef);
            const bikeId = uuidv4()
            const bikeData = {
                ...formData,
                timestamp: serverTimestamp(),
                id: bikeId
            };

            const imageUrls = await uploadImages(files, bikeId);
            bikeData.images = imageUrls;

            // Create a write batch
            const batch = writeBatch(db);

            // Set the bike document with bikeData, including image URLs
            batch.set(bikeDoc, bikeData);

            // Commit the batch
            await batch.commit();

            console.log('Bike data and images uploaded successfully.');

            clearFields();
            alert('Bike added successfully!');

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };


    const handleRemove = () => {

    }

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
        setPreview([]);
    };

    return (
        <>
            <section className={styles.admin}
                style={{ filter: admin ? 'blur(5px) brightness(0.5)' : '', pointerEvents: admin ? 'none' : '' }}>
                <h1>Admin Dashboard</h1>

                <div className={styles.btnWrapper}>
                    <button
                        className={formType === 'Add Bike' ? styles.btnActive : styles.btn}
                        onClick={() => setFormType('Add Bike')}
                    >
                        Add Bike
                    </button>
                    <button
                        className={formType === 'Remove Bike' ? styles.btnActive : styles.btn}
                        onClick={() => setFormType('Remove Bike')}
                    >
                        Remove Bike
                    </button>
                </div>

                {formType === 'Add Bike' ? (
                    <form onSubmit={handleSubmit}>
                        <div>
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
                        <div>
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

                        <div>
                            <label htmlFor="capacity">Capacity</label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                placeholder='125, 250? do not add "CC"'
                                required
                            />
                        </div>

                        <div className={styles.radioWraper}>
                            <div>
                                <label htmlFor="type">Type:</label>
                                <div>
                                    <input
                                        type="radio"
                                        id="type-automatic"
                                        name="type"
                                        value="automatic"
                                        checked={formData.type === 'automatic'}
                                        onChange={handleChange}
                                        aria-label="Automatic"
                                    />
                                    <label htmlFor="type-automatic">Automatic</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="type-semi-auto"
                                        name="type"
                                        value="semi-auto"
                                        checked={formData.type === 'semi-auto'}
                                        onChange={handleChange}
                                        aria-label="Semi-Automatic"
                                    />
                                    <label htmlFor="type-semi-auto">Semi-Automatic</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="type-manual"
                                        name="type"
                                        value="manual"
                                        checked={formData.type === 'manual'}
                                        onChange={handleChange}
                                        aria-label="Manual"
                                    />
                                    <label htmlFor="type-manual">Manual</label>
                                </div>
                            </div>
                        </div>

                        <div>
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

                        <div>
                            <label htmlFor="cityPrice">Inner City Price</label>
                            <input
                                type="number"
                                id="cityPrice"
                                name="cityPrice"
                                value={formData.cityPrice}
                                onChange={handleChange}
                                placeholder='USD, use numbers only'
                            />
                        </div>

                        <div>
                            <label htmlFor="travelPrice">Travelling Price</label>
                            <input
                                type="number"
                                id="travelPrice"
                                name="travelPrice"
                                value={formData.travelPrice}
                                onChange={handleChange}
                                placeholder='USD, use numbers only'
                            />
                        </div>

                        <div>
                            <label htmlFor="monthPrice">Month Price</label>
                            <input
                                type="number"
                                id="monthPrice"
                                name="monthPrice"
                                value={formData.monthPrice}
                                onChange={handleChange}
                                placeholder='USD, use numbers only'
                            />
                        </div>

                        <div>
                            <label htmlFor="salePrice">Sale Price</label>
                            <input
                                type="number"
                                id="salePrice"
                                name="salePrice"
                                value={formData.salePrice}
                                onChange={handleChange}
                                placeholder='USD, use numbers only'
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
                        <button className={styles.submitBtn} type="submit">Submit</button>
                    </form>
                ) : (
                    <form onSubmit={handleRemove()}>
                        <div>
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
                        <div>
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
                        <div>
                            <label htmlFor="capacity">Capacity</label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                placeholder='125, 250? do not add "CC"'
                                required
                            />
                        </div>
                        <input
                            type="text"
                            name="honeypot"
                            value={formData.honeypot}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                            tabIndex="-1"
                            autoComplete="off"
                        />
                        <button className={styles.submitBtn} type="submit">Find Motorbike</button>
                    </form>
                )}
            </section>
            {admin && (
                <h3 className={styles.adminOnly}>This page is only available for Administration</h3>
            )}
        </>
    );
};
