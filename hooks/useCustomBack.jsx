"use client";
import { useEffect } from "react";

export const useCustomBack = (callback) => {
  useEffect(() => {
    // Push a new entry to the history stack
    window.history.pushState(null, "", window.location.pathname);

    // Handler for popstate event (back button)
    const handlePopState = (event) => {
      event.preventDefault();
      callback();
    };

    // Add event listener
    window.addEventListener("popstate", handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [callback]);
};
