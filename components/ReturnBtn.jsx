"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/bikeDetail.module.css";

export default function ReturnBtn({ bikeId, basePath }) {
  const [returnPath, setReturnPath] = useState(basePath);

  useEffect(() => {
    // Get the stored path or use document.referrer as fallback
    const storedPath = sessionStorage.getItem("lastBikeListPath");
    if (storedPath) {
      setReturnPath(`${storedPath}#bike-${bikeId}`);
    } else if (document.referrer && document.referrer.includes(basePath)) {
      const referrerUrl = new URL(document.referrer);
      setReturnPath(`${referrerUrl.pathname}#bike-${bikeId}`);
    }
  }, [bikeId]);

  return (
    <Link href={returnPath}>
      <button className={styles.btn}>Return</button>
    </Link>
  );
}
