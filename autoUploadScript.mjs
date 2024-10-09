import admin from 'firebase-admin';
import sharp from 'sharp';
import fetch from 'node-fetch';
import { readFile } from 'fs/promises';

// Importing JSON service account using `assert { type: "json" }`
import serviceAccount from './phung-motorbike-firebase-adminsdk-cr6g0-3fd3f94690.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'phung-motorbike.appspot.com'
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Function to optimize and upload image to Firebase Storage
const optimizeAndUploadImage = async (imageUrl, bikeName, bikeModel, index, size) => {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const optimizedBuffer = await sharp(buffer)
    .resize(size.width, size.height)
    .webp()
    .toBuffer();

  const fileName = `${bikeModel}-${bikeName}-${size.width}x${size.height}-${index}.webp`;
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
  const bikeId = bikeData.id;
  const imageIds = bikeData.ả.split(','); // Split image IDs
  const images = [];

  for (let i = 0; i < imageIds.length; i++) {
    const imageUrl = `https://i0.connections.vn/cdn.inevn.com/img/thumb/${imageIds[i]}.1kx.isij`;

    // Upload both thumbnail and full-size images
    const [thumbUrl, fullUrl] = await Promise.all([
      optimizeAndUploadImage(imageUrl, bikeData.name, bikeData.hãngXe, i, { width: 300, height: 225 }),
      optimizeAndUploadImage(imageUrl, bikeData.name, bikeData.hãngXe, i, { width: 600, height: 450 })
    ]);

    // Add the uploaded image URLs to the array
    images.push({ thumbURL: thumbUrl, fullURL: fullUrl });
  }

  // Prepare Firestore document for the bike
  const bikeDocRef = db.collection('bikes').doc(bikeId);
  await bikeDocRef.set({
    name: bikeData.name,
    description: bikeData.description,
    salePrice: Number(bikeData.giáBán),
    monthPrice: Number(bikeData.giáThuê),
    type: bikeData.type,
    capacity: Number(bikeData.cubic),
    cityPrice: Number(bikeData.around),
    travelPrice: Number(bikeData.outside),
    model: bikeData.hãngXe,
    images,  // Attach the image URLs
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });

  console.log(`Uploaded bike ${bikeData.name} with ID ${bikeId}`);
};

// Function to process all bikes from the JSON file
const processAllBikes = async () => {
  // Read the bike data from a JSON file
  const jsonData = JSON.parse(await readFile('./phungmotorbike-data.json', 'utf8'));

  // Loop through each bike and process
  for (const bike of jsonData) {
    await processAndUploadBike(bike);
  }

  console.log('All bikes processed and uploaded successfully!');
};

// Run the processing function
processAllBikes().catch(console.error);
