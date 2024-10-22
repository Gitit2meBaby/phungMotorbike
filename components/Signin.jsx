"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/signin.module.css";

const Signin = ({ setShowSignin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Array of valid emails
    const validEmails = [
      "2wheelsvietnam@gmail.com",
      "contact@vietmotomarket.com",
      "ngoc.nguyenminh1006@gmail.com",
      "thanhnguyen2187@gmail.com",
      "phung",
    ];
    const correctPassword = "1234";

    // Check if the email is in the array of valid emails and if the password is correct
    if (validEmails.includes(email) && password === correctPassword) {
      setError("");
      setShowSignin(false);
      sessionStorage.setItem("Admin", true);
      router.push("/admin"); // Redirect to the admin page
    } else {
      setError("*Invalid email or password. Please try again.");
    }
  };

  return (
    <section className={styles.signinModal}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="text">Email:</label>
          <input
            type="text"
            id="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setError("")}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setError("")}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonGroup}>
          <button type="submit">Sign In</button>
          <button type="button" onClick={() => setShowSignin(false)}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default Signin;
