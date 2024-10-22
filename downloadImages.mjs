// script to download all images from firebase storage

import admin from 'firebase-admin';
import { writeFile } from 'fs/promises';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Storage } from '@google-cloud/storage';

// Initialize Firebase Admin SDK with service account
const serviceAccount = JSON.parse(
  await readFile(new URL('../phung credential/phung-motorbike-firebase-adminsdk-cr6g0-3fd3f94690.json', import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'phung-motorbike.appspot.com', bucket
});

const storage = new Storage({
  projectId: 'phung-motorbike',
  keyFilename: '../phung credential/phung-motorbike-firebase-adminsdk-cr6g0-3fd3f94690.json',
});

const bucket = storage.bucket('phung-motorbike.appspot.com');

async function downloadAllImages(folder = '') {
  const [files] = await bucket.getFiles({ prefix: folder });

  for (const file of files) {
    const fileName = file.name.split('/').pop(); // Get the file name from the path
    const localFilePath = `./downloads/${fileName}`; // Destination for downloaded files

    console.log(`Downloading ${file.name}...`);

    // Create a writable stream for the local file
    const destStream = createWriteStream(localFilePath);

    // Download the file
    await pipeline(file.createReadStream(), destStream);

    console.log(`Downloaded ${file.name} to ${localFilePath}`);
  }
}

downloadAllImages(''); // Call the function with your desired folder (use '' for root)
