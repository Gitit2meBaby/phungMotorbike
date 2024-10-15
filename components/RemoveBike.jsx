'use client'
import React, { useState, useEffect } from 'react';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../app/lib/firebase';
import styles from '../styles/removeBike.module.css';
import { deleteObject, ref } from 'firebase/storage';
import BikeCard from './BikeCard';
import { scrollToTop } from '../app/lib/scrollToTop';
import { clearBikeCache } from '../app/lib/clearBikeCache';
import { getBikes } from '../app/lib/getBikes';

const RemoveBike = ({ handleEdit, setFormType, setEditBikeId }) => {
    const [findData, setFindData] = useState({
        model: '',
        name: '',
        capacity: '',
    });
    const [searchItems, setSearchItems] = useState([]);
    const [deletedBikes, setDeletedBikes] = useState([]);
    const [allBikes, setAllBikes] = useState([]);
    const [uniqueValues, setUniqueValues] = useState({
        model: [],
        name: [],
        capacity: [],
    });
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const fetchBikes = async () => {
            const bikes = await getBikes();
            setAllBikes(bikes);

            // Extract unique values for dropdowns
            const uniqueModel = [...new Set(bikes.map(bike => bike.model))];
            const uniqueName = [...new Set(bikes.map(bike => bike.name))];
            const uniqueCapacity = [...new Set(bikes.map(bike => bike.capacity))];

            setUniqueValues({
                model: uniqueModel,
                name: uniqueName,
                capacity: uniqueCapacity,
            });
        };

        fetchBikes();
    }, []);

    // Handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFindData({ ...findData, [name]: value });
    };

    // Function to handle the search
    const handleSearch = () => {
        const filteredBikes = allBikes.filter(bike => {
            const modelMatch = !findData.model || bike.model.toLowerCase().includes(findData.model.toLowerCase());
            const nameMatch = !findData.name || bike.name.toLowerCase().includes(findData.name.toLowerCase());
            const capacityMatch = !findData.capacity || bike.capacity.toString() === findData.capacity;
            return modelMatch && nameMatch && capacityMatch;
        });

        setHasSearched(true);
        setSearchItems(filteredBikes);
    };

    // Show all bikes in collection
    const handleListAll = () => {
        setSearchItems(allBikes);
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
        setDeletedBikes((prev) => [...prev, id]);
        alert("Motorbike removed from database");
        clearBikeCache();
        scrollToTop();
    }

    const handleEditClick = (e, id) => {
        e.preventDefault();
        handleEdit(id);
        setFormType("Edit Bike");
        setEditBikeId(id);
        scrollToTop();
    }

    return (
        <>
            <section className={styles.removeBike}>
                <div className={styles.content}>
                    <p>Search by: Model, Name or Capacity, you will then get a list of matching motorbikes.</p>
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
                        <div className={styles.dropdown}>
                            <label htmlFor='model'>Choose -</label>
                            <select
                                name="model"
                                id='model'
                                onChange={(e) => handleChange(e)}
                                value={findData.model}
                            >
                                <option value="">Select Model</option>
                                {uniqueValues.model.map((model, index) => (
                                    <option key={index} value={model}>{model}</option>
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
                                placeholder='Cub, Nuovo, Jupiter?'
                            />
                        </div>
                        <div className={styles.dropdown}>
                            <label htmlFor='name'>Choose -</label>
                            <select
                                name="name"
                                id='name'
                                onChange={(e) => handleChange(e)}
                                value={findData.name}
                            >
                                <option value="">Select Name</option>
                                {uniqueValues.name.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
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
                            <label htmlFor='capacity'>Choose -</label>
                            <select
                                name="capacity"
                                id='capacity'
                                onChange={(e) => handleChange(e)}
                                value={findData.capacity}
                            >
                                <option value="">Select Capacity</option>
                                {uniqueValues.capacity.map((capacity, index) => (
                                    <option key={index} value={capacity}>{capacity}</option>
                                ))}
                            </select>
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

                        <button className={styles.submitBtn} type="button" onClick={() => handleListAll()}>List All</button>
                    </form>
                </div>
            </section>
            {hasSearched ? (
                <div className={styles.removeBikeList}>
                    {searchItems.length > 0 && (
                        <>
                            <h2>Search Results</h2>
                            <div className={styles.searchList}>
                                {searchItems.map((bike) => (
                                    <div key={bike.id}
                                        className={styles.listItem}>
                                        <BikeCard
                                            bike={bike}
                                            basePath={'/admin'}
                                            inDetails={false}
                                            inAdmin={true}
                                        />
                                        <div className={styles.btnWrapper}>
                                            <button className={styles.btnActive} onClick={(e) => handleEditClick(e, bike.id)}>Edit</button>
                                            <button className={styles.btnActive} onClick={(e) => handleRemove(e, bike.id)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

            ) : (
                <div className={styles.removeBikeList}>
                    <h2>All Bikes</h2>
                    <div className={styles.searchList}>
                        {allBikes.map((bike) => (
                            <div key={bike.id}
                                className={styles.listItem}>
                                <BikeCard
                                    bike={bike}
                                    basePath={'/admin'}
                                    inDetails={false}
                                    inAdmin={true}
                                />
                                <div className={styles.btnWrapper}>
                                    <button className={styles.btnActive} onClick={(e) => handleEditClick(e, bike.id)}>Edit</button>
                                    <button className={styles.btnActive} onClick={(e) => handleRemove(e, bike.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default RemoveBike