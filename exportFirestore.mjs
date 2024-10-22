// script to retrieve data from firestore and create a JSON file

import admin from 'firebase-admin';
import { writeFileSync } from 'fs';
import { readFile } from 'fs/promises';

// Initialize Firebase Admin SDK with service account
const serviceAccount = JSON.parse(
    await readFile(new URL('../phung credential/phung-motorbike-firebase-adminsdk-cr6g0-3fd3f94690.json', import.meta.url))
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function exportCollectionToJSON(collectionName) {
    const snapshot = await db.collection(collectionName).get();
    const data = [];

    snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });

    writeFileSync(`${collectionName}.json`, JSON.stringify(data, null, 2));
    console.log(`Exported ${collectionName} to JSON!`);
}

// Call the function with your collection name
exportCollectionToJSON('bikes');

