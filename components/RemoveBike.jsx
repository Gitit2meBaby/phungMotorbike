'use client'
import React, { useState } from 'react';
import { query, where, collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../../phung/app/lib/firebase';
import Image from 'next/image';

import styles from '../styles/admin.module.css';
import { deleteObject, ref } from 'firebase/storage';


const RemoveBike = ({ handleEdit, setFormType, setEditBikeId }) => {
    const [findData, setFindData] = useState({
        model: '',
        name: '',
        capacity: '',
    });
    const [searchItems, setSearchItems] = useState([]);
    const [deletedBikes, setDeletedBikes] = useState([]);
    const fallbackImage = '/placeHolderThumb.webp';

    // Handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFindData({ ...findData, [name]: value });
    };

    // Function to handle the search
    const handleSearch = async () => {
        const listingsCollection = collection(db, 'bikes');

        let bikeQuery = query(listingsCollection);

        if (findData.model) {
            bikeQuery = query(bikeQuery, where('model', '==', findData.model));
        }
        if (findData.name) {
            bikeQuery = query(bikeQuery, where('name', '==', findData.name));
        }
        if (findData.capacity) {
            bikeQuery = query(bikeQuery, where('capacity', '==', findData.capacity));
        }

        try {
            const snapshot = await getDocs(bikeQuery);
            const results = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setSearchItems(results);
        } catch (error) {
            console.error('Error fetching bikes:', error);
        }
    };

    // Helper function to extract the file path from a Firebase Storage URL
    const getFilePathFromURL = (url) => {
        const pathStart = url.indexOf("/o/") + 3;
        const pathEnd = url.indexOf("?alt=");
        return decodeURIComponent(url.substring(pathStart, pathEnd));
    };

    // Function to delete all files based on URLs
    const deleteFilesFromURLs = async (imageUrls) => {
        const deletePromises = imageUrls.map(async (imageSet) => {
            if (imageSet.fullURL && imageSet.thumbURL) {
                const fullFilePath = getFilePathFromURL(imageSet.fullURL);
                const thumbFilePath = getFilePathFromURL(imageSet.thumbURL);

                const fullRef = ref(storage, fullFilePath);
                const thumbRef = ref(storage, thumbFilePath);

                // Delete both full and thumbnail images
                await Promise.all([deleteObject(fullRef), deleteObject(thumbRef)]);
            }
        });

        await Promise.all(deletePromises);
    };

    // Delete document and associated images
    const handleDeleteDoc = async (id) => {
        console.log("Document ID:", id);
        if (!id) {
            console.error("Id is undefined");
            alert("Id is undefined, cannot find that motorbike in the database");
            return;
        }

        try {
            const docRef = doc(db, "bikes", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const bikeData = docSnap.data();
                const imageUrls = bikeData.images || [];

                // Delete images from storage
                await deleteFilesFromURLs(imageUrls);

                // Delete the document from Firestore
                await deleteDoc(docRef);

                console.log("Document and images deleted successfully.");
                alert("Bike and its images deleted successfully.");
            } else {
                console.error("No such document exists.");
                alert("Error: No such document exists.");
            }
        } catch (error) {
            console.error("Error deleting document and images:", error);
            alert("Error deleting document and images:", error);
        }
    };

    const handleRemove = (e, id) => {
        e.preventDefault()
        handleDeleteDoc(id);
        checkForDuplicates();
        setDeletedBikes((prev) => [...prev, id]);
        alert("Motorbike removed from database");
    }

    const handleEditClick = (e, id) => {
        e.preventDefault();
        handleEdit(id);
        setFormType("Edit Bike");
        setEditBikeId(id);
    }

    return (
        <section className={styles.removeBike}>
            <p>Search by: Model, Name or Capacity, you will then get a list of matching motorbikes.</p>
            <p>*If you are having trouble make sure you are using the correct capitalization<br></br><span> (ie. Cub, not cub or Honda, not honda)</span></p>
            <form>
                <div className={styles.textInput}>
                    <label htmlFor="model">Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={findData.model}
                        onChange={(e) => handleChange(e)}
                        placeholder='Honda, Yamaha?'
                    />
                </div>
                <div className={styles.textInput}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={findData.name}
                        onChange={(e) => handleChange(e)}
                        placeholder='Cub, Nuovo, Jupiter?'
                    />
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
                <input
                    type="text"
                    name="honeypot"
                    value={findData.honeypot}
                    onChange={(e) => handleChange(e)}
                    style={{ display: 'none' }}
                    tabIndex="-1"
                    autoComplete="off"
                />
                <button className={styles.submitBtn} style={{ marginTop: '1rem' }} type="button" onClick={() => handleSearch()}>Find Motorbike</button>
            </form>

            {searchItems.length > 0 && (
                <div>
                    <h2>Search Results</h2>
                    <ul>
                        {searchItems.map((bike) => (
                            <div key={bike.id}
                                style={{ display: deletedBikes.includes(bike.id) ? 'none' : 'block' }}>

                                <Image
                                    src={bike.images[0].thumbURL}
                                    alt='Motorbike for rent at Phung Motorbike'
                                    width={300}
                                    height={225}
                                    placeholder="blur"
                                    blurDataURL={fallbackImage}
                                    unoptimized
                                    onError={(e) => {
                                        e.target.src = fallbackImage;
                                    }}
                                />
                                <h2>{`${bike.model} ${bike.name} ${bike.capacity}cc`}</h2>
                                <p>${bike.cityPrice}/day</p>
                                <p>${bike.monthPrice}/month</p>
                                <button onClick={(e) => handleEditClick(e, bike.id)}>Edit</button>
                                <button onClick={(e) => handleRemove(e, bike.id)}>Delete</button>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
}

export default RemoveBike