import { initializeApp, cert, deleteApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(
    "../phung-credential/phung-motorbike-firebase-adminsdk-cr6g0-3fd3f94690.json"
  )
);

const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "phung-motorbike.appspot.com",
});

const db = getFirestore();
const bucket = getStorage().bucket();

async function exportData() {
  try {
    const exportDir = join(__dirname, "firebase-export");
    const imagesDir = join(exportDir, "images");

    // Export Firestore data with image references
    const collections = await db.listCollections();
    const data = {};
    const imageReferences = new Set();

    // First pass: collect all data and image references
    for (const collection of collections) {
      console.log(`Processing collection: ${collection.id}`);
      const snapshot = await collection.get();
      data[collection.id] = {};

      snapshot.forEach((doc) => {
        const docData = doc.data();
        data[collection.id][doc.id] = docData;

        // Search for image URLs in the document
        JSON.stringify(docData)
          .match(/https:\/\/firebasestorage\.googleapis\.com[^"'\s]*/g)
          ?.forEach((url) => {
            imageReferences.add(url);
          });
      });
    }

    console.log(`Found ${imageReferences.size} image references in the data`);

    // Create image mapping for existing files
    const [files] = await bucket.getFiles();
    const imageMapping = {};

    for (const file of files) {
      if (file.name.endsWith("/")) continue;

      // Get the public URL for this file
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(file.name)}?alt=media`;

      // Store the mapping between public URL and local file path
      imageMapping[publicUrl] = {
        localPath: file.name,
        metadata: {
          contentType: file.metadata.contentType,
          size: file.metadata.size,
          updated: file.metadata.updated,
          md5Hash: file.metadata.md5Hash,
        },
      };
    }

    // Write the image mapping file
    writeFileSync(
      join(exportDir, "image-mapping.json"),
      JSON.stringify(imageMapping, null, 2)
    );

    // Write the database data
    writeFileSync(
      join(exportDir, "database.json"),
      JSON.stringify(data, null, 2)
    );

    console.log("Export completed successfully!");
  } catch (error) {
    console.error("Export failed:", error);
  } finally {
    await deleteApp(app);
  }
}

exportData();
