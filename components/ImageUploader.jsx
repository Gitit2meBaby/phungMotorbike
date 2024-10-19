import Image from "next/image";
import pica from "pica";

import styles from "../styles/admin.module.css";
import { useEffect } from "react";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../app/lib/firebase";
import { clearBikeCache } from "../app/lib/clearBikeCache";

const ImageUploader = ({
  files,
  setFiles,
  preview,
  setPreview,
  initialFiles,
  id,
  formtype,
}) => {
  useEffect(() => {
    console.log("Initial files:", initialFiles);
    if (initialFiles && files.length === 0) {
      setFiles(initialFiles);
      setPreview(initialFiles.map((file) => file.thumbImage));
    }
  }, [initialFiles, files.length, setFiles, setPreview]);

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
      thumbImage: new File([thumbImage], `thumb_${file.name}`, {
        type: "image/webp",
      }),
      fullImage: new File([fullImage], `full_${file.name}`, {
        type: "image/webp",
      }),
      originalName: file.name,
    };
  };

  const resizeAndConvertImage = async (file, { width, height }) => {
    const img = document.createElement("img");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
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
            const result = await picaInstance.toBlob(canvas, "image/webp", 0.8);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };

  // Function to handle deleting an image
  const handleDelete = async (index, e, id) => {
    e.preventDefault();
    const fileToDelete = files[index];

    if (!fileToDelete) return;

    try {
      // Correctly extract the storage paths for both images
      const thumbFilePath = decodeURIComponent(
        fileToDelete.thumbImage.split("/o/")[1].split("?")[0]
      );
      const fullFilePath = decodeURIComponent(
        fileToDelete.fullImage.split("/o/")[1].split("?")[0]
      );

      const thumbRef = ref(storage, thumbFilePath);
      const fullRef = ref(storage, fullFilePath);

      // Delete the images from Firebase Storage
      await Promise.all([deleteObject(thumbRef), deleteObject(fullRef)]);

      // Remove the file reference from Firestore
      const bikeDocRef = doc(db, "bikes", id);
      await updateDoc(bikeDocRef, {
        images: arrayRemove(fileToDelete),
      });

      // Update state to remove the file from the UI
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
      setPreview((prevPreviews) => prevPreviews.filter((_, i) => i !== index));

      alert("Image deleted successfully!");
      clearBikeCache();
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("An error occurred while deleting the image.");
    }
  };

  return (
    <section className={styles.imageUploader}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
        <div key={index}>
          {/* Only render if the index is 0 or if there's a file at the previous index */}
          {(index === 0 || files[index - 1]) && (
            <>
              <div className={styles.fileInput}>
                <label htmlFor={`image${index + 1}`}>
                  {index === 0 ? "Feature Image" : `Image ${index + 1}`}
                </label>
                <input
                  type="file"
                  id={`image${index + 1}`}
                  name={`image${index + 1}`}
                  onChange={(e) => handleFileChange(e, index)}
                  accept="image/*"
                />
              </div>
              <div className={styles.imgWrapper}>
                {preview[index] && (
                  <Image
                    src={preview[index]}
                    alt={`Uploaded image ${index + 1}`}
                    width={300}
                    height={225}
                  />
                )}
                {formtype === "Edit Bike" && files[index] && (
                  <button
                    onClick={(e) => handleDelete(index, e, id)}
                    className={styles.btn}
                  >
                    DELETE
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default ImageUploader;
