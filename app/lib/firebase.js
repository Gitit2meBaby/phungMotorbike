import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNfvy97sYccJJGkLDCUXw3w-fKIjX-DVs",
    authDomain: "phung-motorbike.firebaseapp.com",
    projectId: "phung-motorbike",
    storageBucket: "phung-motorbike.appspot.com",
    messagingSenderId: "239704891376",
    appId: "1:239704891376:web:20c3fa9d6302c0fa250735",
    measurementId: "G-XCZN7TTZHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { db, storage };