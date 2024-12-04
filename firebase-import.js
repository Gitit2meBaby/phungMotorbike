import { initializeApp, cert, deleteApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { readFileSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// You'll need to create a new service account key for the destination project
const serviceAccount = JSON.parse(
  readFileSync(
    "../phung-credential/phung-motorbike-firebase-adminsdk-cr6g0-3fd3f94690.json"
  )
);

// The storageBucket is the name of your project, you should find these credentials in the firebase console
const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "your-new-project.appspot.com", // Update this ***************
});

const db = getFirestore();
const bucket = getStorage().bucket();

async function uploadImagesFromDirectory(dirPath, prefix = "") {
  const urlMapping = {};

  try {
    const files = readdirSync(dirPath, { withFileTypes: true });

    for (const file of files) {
      const fullPath = join(dirPath, file.name);

      if (file.isDirectory()) {
        // Recursively process subdirectories
        const subDirMappings = await uploadImagesFromDirectory(
          fullPath,
          join(prefix, file.name)
        );
        Object.assign(urlMapping, subDirMappings);
      } else {
        // Upload file and create mapping
        const destination = prefix ? join(prefix, file.name) : file.name;

        try {
          const [uploadedFile] = await bucket.upload(fullPath, {
            destination,
            metadata: {
              contentType: getContentType(file.name),
            },
          });

          const newUrl = `https://firebasestorage.googleapis.com/v0/b/${
            bucket.name
          }/o/${encodeURIComponent(destination)}?alt=media`;
          console.log(`Uploaded: ${destination} -> ${newUrl}`);

          // Store both the new URL and the local path
          urlMapping[destination] = newUrl;
        } catch (err) {
          console.error(`Failed to upload ${fullPath}:`, err);
        }
      }
    }
  } catch (err) {
    console.error(`Error processing directory ${dirPath}:`, err);
  }

  return urlMapping;
}

function getContentType(filename) {
  const ext = filename.toLowerCase().split(".").pop();
  const types = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
  };
  return types[ext] || "application/octet-stream";
}

async function importData() {
  try {
    const exportDir = join(__dirname, "firebase-export");
    const imagesDir = join(exportDir, "images");

    // Read the exported data
    console.log("Reading database and mapping files...");
    const data = JSON.parse(readFileSync(join(exportDir, "database.json")));
    const oldImageMapping = JSON.parse(
      readFileSync(join(exportDir, "image-mapping.json"))
    );

    // Upload all images from the directory structure and get new URLs
    console.log("Starting image upload from directories...");
    console.log("Processing images from:", imagesDir);

    // Upload from each subdirectory
    const newUrlMapping = {};
    const imageFolders = ["bikes", "featureBikes", "featureSaleBikes"];

    for (const folder of imageFolders) {
      const folderPath = join(imagesDir, folder);
      if (existsSync(folderPath)) {
        console.log(`Processing folder: ${folder}`);
        const folderMappings = await uploadImagesFromDirectory(
          folderPath,
          folder
        );
        Object.assign(newUrlMapping, folderMappings);
      } else {
        console.warn(`Warning: Folder not found: ${folderPath}`);
      }
    }

    // Create mapping from old URLs to new URLs
    const urlReplacementMap = {};
    for (const [oldUrl, fileInfo] of Object.entries(oldImageMapping)) {
      const newUrl = newUrlMapping[fileInfo.localPath];
      if (newUrl) {
        urlReplacementMap[oldUrl] = newUrl;
      }
    }

    // Helper function to replace old URLs with new ones in data
    function updateUrls(obj) {
      if (typeof obj !== "object" || obj === null) return obj;

      if (Array.isArray(obj)) {
        return obj.map((item) => updateUrls(item));
      }

      const newObj = {};
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "string" && urlReplacementMap[value]) {
          newObj[key] = urlReplacementMap[value];
        } else {
          newObj[key] = updateUrls(value);
        }
      }
      return newObj;
    }

    // Import Firestore data with updated URLs
    console.log("Importing Firestore data...");
    for (const [collectionName, documents] of Object.entries(data)) {
      for (const [docId, docData] of Object.entries(documents)) {
        const updatedData = updateUrls(docData);
        await db.collection(collectionName).doc(docId).set(updatedData);
        console.log(`Imported document: ${collectionName}/${docId}`);
      }
    }

    console.log("Import completed successfully!");
  } catch (error) {
    console.error("Import failed:", error);
  } finally {
    await deleteApp(app);
  }
}

importData();
