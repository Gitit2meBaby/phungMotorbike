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
    // Create export directory
    const exportDir = join(__dirname, "firebase-export");
    const imagesDir = join(exportDir, "images");

    if (!existsSync(exportDir)) {
      mkdirSync(exportDir);
    }
    if (!existsSync(imagesDir)) {
      mkdirSync(imagesDir);
    }

    // Export Firestore data
    const collections = await db.listCollections();
    const data = {};

    for (const collection of collections) {
      const snapshot = await collection.get();
      data[collection.id] = {};

      snapshot.forEach((doc) => {
        data[collection.id][doc.id] = doc.data();
      });
    }

    // Write database data to JSON file
    writeFileSync(
      join(exportDir, "database.json"),
      JSON.stringify(data, null, 2)
    );

    // Export Storage files
    const [files] = await bucket.getFiles();

    for (const file of files) {
      // Skip if the file path ends with a forward slash (directory)
      if (file.name.endsWith("/")) continue;

      const destination = join(imagesDir, file.name);

      // Create nested directories if needed
      const dir = dirname(destination);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      // Download file
      try {
        await file.download({
          destination: destination,
        });

        // Add file metadata to database export
        if (!data.storage) data.storage = {};
        data.storage[file.name] = {
          contentType: file.metadata.contentType,
          size: file.metadata.size,
          updated: file.metadata.updated,
          md5Hash: file.metadata.md5Hash,
        };

        console.log(`Successfully downloaded: ${file.name}`);
      } catch (err) {
        console.error(`Failed to download ${file.name}:`, err);
      }
    }

    // Update database.json with storage metadata
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
