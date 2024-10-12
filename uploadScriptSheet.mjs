// works with phungmotorbike-data.json format

import admin from 'firebase-admin';
import sharp from 'sharp';
import fetch from 'node-fetch';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the service account JSON file
let serviceAccount;
try {
    const serviceAccountRaw = await readFile(
        join(__dirname, './phung-motorbike-firebase-adminsdk-cr6g0-3fd3f94690.json'),
        'utf8'
    );
    serviceAccount = JSON.parse(serviceAccountRaw);
    console.log('Service account file read successfully');
} catch (error) {
    console.error('Error reading or parsing service account file:', error);
    process.exit(1);
}

// Initialize Firebase Admin SDK
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'phung-motorbike.appspot.com'
    });
    console.log('Firebase Admin SDK initialized successfully');
} catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    process.exit(1);
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Function to optimize and upload image to Firebase Storage
const optimizeAndUploadImage = async (imageId, bikeName, bikeBrand, bikeId, index, size) => {
    const imageUrl = `https://i0.connections.vn/cdn.inevn.com/img/thumb/${imageId}.1kx.isij`;
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const optimizedBuffer = await sharp(buffer)
        .resize(size.width, size.height)
        .webp()
        .toBuffer();

    const fileName = `${bikeBrand}-${bikeName}-${bikeId}-${size.width}x${size.height}-${index}.webp`;
    const file = bucket.file(`bikes/${fileName}`);

    await file.save(optimizedBuffer, {
        metadata: { contentType: 'image/webp' }
    });

    // Construct the public URL for the uploaded file
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`;

    return publicUrl;
};

// Function to process and upload a bike and its images
const processAndUploadBike = async (bikeData) => {
    const bikeId = db.collection('bikes').doc().id; // Generate a new ID
    let imageIds = [];

    // Handle both string and integer Photo values
    if (typeof bikeData.Photo === 'string') {
        imageIds = bikeData.Photo.split(';');
    } else if (typeof bikeData.Photo === 'number') {
        imageIds = [bikeData.Photo.toString()];
    } else {
        console.warn(`Unexpected Photo value for bike ${bikeData.Name}: ${bikeData.Photo}`);
        imageIds = [];
    }

    const images = [];

    for (let i = 0; i < imageIds.length; i++) {
        // Upload both thumbnail and full-size images
        try {
            const [thumbUrl, fullUrl] = await Promise.all([
                optimizeAndUploadImage(imageIds[i], bikeData.Name, bikeData.Brand, bikeId, i, { width: 300, height: 225 }),
                optimizeAndUploadImage(imageIds[i], bikeData.Name, bikeData.Brand, bikeId, i, { width: 600, height: 450 })
            ]);

            // Add the uploaded image URLs to the array
            images.push({ thumbURL: thumbUrl, fullURL: fullUrl });
        } catch (error) {
            console.error(`Error processing image ${imageIds[i]} for bike ${bikeData.Name}:`, error);
        }
    }

    // Prepare Firestore document for the bike
    const bikeDocRef = db.collection('bikes').doc(bikeId);
    await bikeDocRef.set({
        name: bikeData.Name,
        description: bikeData["Desc - Original"] || bikeData.Desc,
        salePrice: bikeData["Sale price"] ? Number(bikeData["Sale price"]) : null,
        type: bikeData.Type,
        capacity: Number(bikeData.Cubic),
        cityPrice: bikeData.Around ? Number(bikeData.Around) : null,
        travelPrice: bikeData.Outside ? Number(bikeData.Outside) : null,
        model: bikeData.Brand,
        images,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`Uploaded bike ${bikeData.Name} with ID ${bikeId}`);
};

// Function to process all bikes from the JSON file
const processAllBikes = async () => {
    // Read the bike data from spreadSheetData.json file
    let jsonData;
    try {
        const bikeDataRaw = await readFile(join(__dirname, './spreadSheetData.json'), 'utf8');
        jsonData = JSON.parse(bikeDataRaw);
        console.log('Bike data file read successfully');
        console.log('Number of bikes:', jsonData.length);
    } catch (error) {
        console.error('Error reading or parsing bike data file:', error);
        process.exit(1);
    }

    // Loop through each bike and process
    for (const bike of jsonData) {
        try {
            await processAndUploadBike(bike);
        } catch (error) {
            console.error(`Error processing bike ${bike.Name}:`, error);
        }
    }

    console.log('All bikes processed and uploaded successfully!');
};

// Run the processing function
processAllBikes().catch(console.error);