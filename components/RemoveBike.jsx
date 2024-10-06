'use client'
import React, { useState } from 'react';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { db } from '../../phung/app/lib/firebase';
import Image from 'next/image';

const RemoveBike = () => {
    const [findData, setFindData] = useState({
        model: '',
        name: '',
        capacity: '',
    });
    const [searchItems, setSearchItems] = useState([]);

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

    // delete doc function
    const handleDeleteDoc = async (id) => {
        if (!id) {
            console.error("Id is undefined");
            alert("Id is undefined, cannot find that motorbike in database");
            return;
        }
        try {
            const docRef = doc(db, "bikes", id);
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Error deleting document:", error);
            alert("Error deleting document:", error);
        }
    };

    // find the folder of images correlating to that post
    const checkForDuplicates = async () => {
        const folderPath = `bikes/${bikeModel}-${bikeName}-${bikeId}`;
        await deleteFilesInFolder(folderPath);
    }

    // Function to delete all files in a folder
    const deleteFilesInFolder = async (folderPath) => {
        console.log("Deleting images in folder:", folderPath);
        const folderRef = ref(storage, folderPath);
        try {
            const files = await listAll(folderRef);
            const deletePromises = files.items.map((fileRef) => deleteObject(fileRef));
            await Promise.all(deletePromises);
        } catch (error) {
            // console.error("Error deleting images in folder:", error);
        }
    };

    const handleRemove = (id) => {
        handleDeleteDoc(id);
        checkForDuplicates();
        alert("Motorbike removed from database");
    }


    return (
        <>
            <form onSubmit={handleRemove()}>
                <div>
                    <label htmlFor="model">Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={findData.model}
                        onChange={() => handleChange()}
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
                        value={findData.name}
                        onChange={() => handleChange()}
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
                        value={findData.capacity}
                        onChange={() => handleChange()}
                        placeholder='125, 250? do not add "CC"'
                        required
                    />
                </div>
                <input
                    type="text"
                    name="honeypot"
                    value={findData.honeypot}
                    onChange={() => handleChange()}
                    style={{ display: 'none' }}
                    tabIndex="-1"
                    autoComplete="off"
                />
                <button className={styles.submitBtn} type="button" onClick={() => handleSearch()}>Find Motorbike</button>
            </form>

            {searchItems.length > 0 && (
                <div>
                    <h2>Search Results</h2>
                    <ul>
                        {searchItems.map((bike) => (
                            <div key={bike.id}>
                                <Image
                                    src={imageUrl}
                                    alt={altText}
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
                                <button onClick={() => handleRemove(bike.id)}>Delete</button>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default RemoveBike