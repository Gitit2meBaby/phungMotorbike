'use client';
import Image from 'next/image';
import { useState } from 'react';
import pica from 'pica';

import styles from '../styles/admin.module.css';

const ImageUploader = ({ files, setFiles, preview, setPreview }) => {

    const handleFileChange = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewURL = URL.createObjectURL(file);
        setPreview((prevPreviews) => {
            const updatedPreviews = [...prevPreviews];
            updatedPreviews[index] = previewURL;
            return updatedPreviews;
        });

        try {
            const processedFiles = await processImage(file);
            setFiles((prevFiles) => {
                const updatedFiles = [...prevFiles];
                updatedFiles[index] = processedFiles;
                return updatedFiles;
            });
        } catch (error) {
            console.error("Error processing image:", error);
        }
    };

    const processImage = async (file) => {
        const thumbSize = { width: 300, height: 225 };
        const fullSize = { width: 600, height: 450 };

        const [thumbImage, fullImage] = await Promise.all([
            resizeAndConvertImage(file, thumbSize),
            resizeAndConvertImage(file, fullSize),
        ]);

        return {
            thumbImage: new File([thumbImage], `thumb_${file.name}`, { type: 'image/webp' }),
            fullImage: new File([fullImage], `full_${file.name}`, { type: 'image/webp' }),
            originalName: file.name
        };
    };

    const resizeAndConvertImage = async (file, { width, height }) => {
        const img = document.createElement('img');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const picaInstance = pica();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
                img.src = event.target.result;
                img.onload = async () => {
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    try {
                        const result = await picaInstance.toBlob(canvas, 'image/webp', 0.8);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                };
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <section>
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
                        src={preview[0]}
                        alt="Uploaded image"
                        width={300}
                        height={225}
                    />
                )}
            </div>

            {files.length > 0 && (
                <>
                    <div>
                        <label htmlFor="image2">Image 2</label>
                        <input
                            type="file"
                            id="image2"
                            name="image2"
                            onChange={(e) => handleFileChange(e, 1)}
                            accept="image/*"
                        />
                    </div>
                    <div className={styles.imgWrapper}>
                        {files[1] && (
                            <Image
                                src={preview[1]}
                                alt="Uploaded image"
                                width={300}
                                height={225}
                            />
                        )}
                    </div>
                </>
            )}

            {files.length > 1 && (
                <>
                    <div>
                        <label htmlFor="image3">Image 3</label>
                        <input
                            type="file"
                            id="image3"
                            name="image3"
                            onChange={(e) => handleFileChange(e, 2)}
                            accept="image/*"
                        />
                    </div>
                    <div className={styles.imgWrapper}>
                        {files[2] && (
                            <Image
                                src={preview[2]}
                                alt="Uploaded image"
                                width={300}
                                height={225}
                            />
                        )}
                    </div>
                </>
            )}

            {files.length > 2 && (
                <>
                    <div>
                        <label htmlFor="image4">Image 4</label>
                        <input
                            type="file"
                            id="image4"
                            name="image4"
                            onChange={(e) => handleFileChange(e, 3)}
                            accept="image/*"
                        />
                    </div>
                    <div className={styles.imgWrapper}>
                        {files[3] && (
                            <Image
                                src={preview[3]}
                                alt="Uploaded image"
                                width={300}
                                height={225}
                            />
                        )}
                    </div>
                </>
            )}

            {files.length > 3 && (
                <>
                    <div>
                        <label htmlFor="image5">Image 5</label>
                        <input
                            type="file"
                            id="image5"
                            name="image5"
                            onChange={(e) => handleFileChange(e, 4)}
                            accept="image/*"
                        />
                    </div>
                    <div className={styles.imgWrapper}>
                        {files[4] && (
                            <Image
                                src={preview[4]}
                                alt="Uploaded image"
                                width={300}
                                height={225}
                            />
                        )}
                    </div>
                </>
            )}

        </section>
    );
};

export default ImageUploader;
