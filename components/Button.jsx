// abstracted button component, mostly for homepage, enables SSR with client functionality

"use client";
import React from "react";
import styles from "../styles/infoCard.module.css";

const Button = ({ inCard }) => {
  const handleScroll = () => {
    const element = document.getElementById("contactForm");
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 150;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={() => handleScroll()}
      className={styles.btn}
      style={inCard ? { marginTop: "2rem" } : {}}
    >
      Contact Us
    </button>
  );
};

export default Button;
