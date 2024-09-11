'use client'
import React, { useState } from 'react';
import styles from '../../styles/admin.module.css';
import Image from 'next/image';

export default function AdminDashboardForm() {
    const [formData, setFormData] = useState({
        model: '',
        name: '',
        price: '',
        capacity: '',
        offer: 'for Rent',
        description: '',
        honeypot: ''
    });
    const [files, setFiles] = useState([]);
    const [formType, setFormType] = useState('Add Bike');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e, index) => {
        const newFiles = [...files];
        newFiles[index] = e.target.files[0];
        setFiles(newFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.honeypot) {
            console.log('Bot submission detected');
            return;
        }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
        files.forEach((file, index) => {
            formDataToSend.append(`file${index}`, file);
        });

        try {
            const response = await fetch('/api/admin', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                // Reset form
                setFormData({
                    model: '',
                    name: '',
                    price: '',
                    capacity: '',
                    offer: 'for Sale',
                    description: '',
                    honeypot: ''
                });
                setFiles([]);
            } else {
                alert('Failed to submit form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleRemove = () => {

    }

    return (
        <section className={styles.admin}>
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
                        <label htmlFor="offer">Offer</label>
                        <select
                            id="offer"
                            name="offer"
                            value={formData.offer}
                            onChange={handleChange}
                            required
                        >
                            <option value="for Sale">For Sale</option>
                            <option value="for Rent">For Rent</option>
                        </select>
                    </div>
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
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder='USD, use numbers only'
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
                        <label htmlFor="featureImage">Feature Image</label>
                        <input
                            type="file"
                            id="featureImage"
                            name="featureImage"
                            onChange={(e) => handleFileChange(e, 0)}
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className={styles.imgWrapper}>
                        {files[0] && (
                            <Image
                                src={URL.createObjectURL(files[0])}
                                alt="Uploaded image"
                                width={100}
                                height={100}
                                responsive
                            />
                        )}
                    </div>

                    <div>
                        <label htmlFor="image2">Image 2</label>
                        <input
                            type="file"
                            id="image2"
                            name="image2"
                            onChange={(e) => handleFileChange(e, 1)}
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className={styles.imgWrapper}>
                        {files[1] && (
                            <Image
                                src={URL.createObjectURL(files[1])}
                                alt="Uploaded image"
                                width={100}
                                height={100}
                                responsive
                            />
                        )}
                    </div>

                    <div>
                        <label htmlFor="image3">Image 3</label>
                        <input
                            type="file"
                            id="image3"
                            name="image3"
                            onChange={(e) => handleFileChange(e, 2)}
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className={styles.imgWrapper}>
                        {files[2] && (
                            <Image
                                src={URL.createObjectURL(files[2])}
                                alt="Uploaded image"
                                width={100}
                                height={100}
                                responsive
                            />
                        )}
                    </div>

                    <div>
                        <label htmlFor="image4">Image 4</label>
                        <input
                            type="file"
                            id="image4"
                            name="image4"
                            onChange={(e) => handleFileChange(e, 3)}
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className={styles.imgWrapper}>
                        {files[3] && (
                            <Image
                                src={URL.createObjectURL(files[3])}
                                alt="Uploaded image"
                                width={100}
                                height={100}
                                responsive
                            />
                        )}
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
                    <button className={styles.submitBtn} type="submit">Submit</button>
                </form>
            ) : (
                <form onSubmit={handleRemove()}>
                    <div>
                        <label htmlFor="offer">Offer</label>
                        <select
                            id="offer"
                            name="offer"
                            value={formData.offer}
                            onChange={handleChange}
                            required
                        >
                            <option value="for Sale">For Sale</option>
                            <option value="for Rent">For Rent</option>
                        </select>
                    </div>
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
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder='USD, use numbers only'
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
                    <button className={styles.submitBtn} type="submit">Submit</button>
                </form>
            )}
        </section>
    );
};
