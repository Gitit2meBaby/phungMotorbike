// NO Longer in use, but will leave it here for now, wrap components to follow cache debugging.
"use client";
import { useEffect, useState } from "react";

export default function CacheDebug() {
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    async function checkCache() {
      try {
        const response = await fetch("/api/debug-cache");
        const data = await response.json();
        setDebugInfo(data);
        console.log("Cache Debug Response:", data);
      } catch (error) {
        console.error("Debug fetch error:", error);
      }
    }

    checkCache();
  }, []);

  if (!debugInfo || process.env.NODE_ENV === "production") return null;

  return (
    <div
      style={{
        bottom: 20,
        right: 20,
        background: "#f0f0f0",
        padding: 20,
        borderRadius: 5,
        maxWidth: 400,
        zIndex: 9999,
      }}
    >
      <h4>Debug Info</h4>
      <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
    </div>
  );
}
