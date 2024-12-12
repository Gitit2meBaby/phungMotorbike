// client component to handle show modal for signin, abstracted other details into new SSR component
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import Signin from "./Signin";

import styles from "../styles/footer.module.css";
import ContactLinks from "./ContactLinks";

const ContactDetails = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("Admin");
    if (loggedIn) {
      setAdmin(true);
    }
  }, []);

  return (
    <div className={styles.details}>
      <ContactLinks />

      {/* Staff Login */}
      {admin === false ? (
        <div className={styles.contact} onClick={() => setShowSignin(true)}>
          <svg
            stroke="#e97f26"
            fill="#e97f26"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.998 16L15.998 12 10.998 8 10.998 11 1.998 11 1.998 13 10.998 13z"></path>
            <path d="M12.999,2.999c-2.405,0-4.665,0.937-6.364,2.637L8.049,7.05c1.322-1.322,3.08-2.051,4.95-2.051s3.628,0.729,4.95,2.051 S20,10.13,20,12s-0.729,3.628-2.051,4.95s-3.08,2.051-4.95,2.051s-3.628-0.729-4.95-2.051l-1.414,1.414 c1.699,1.7,3.959,2.637,6.364,2.637s4.665-0.937,6.364-2.637C21.063,16.665,22,14.405,22,12s-0.937-4.665-2.637-6.364 C17.664,3.936,15.404,2.999,12.999,2.999z"></path>
          </svg>
          <p>Login (staff only)</p>
        </div>
      ) : (
        <div className={styles.contact}>
          <svg
            stroke="#e97f26"
            fill="#e97f26"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.998 16L15.998 12 10.998 8 10.998 11 1.998 11 1.998 13 10.998 13z"></path>
            <path d="M12.999,2.999c-2.405,0-4.665,0.937-6.364,2.637L8.049,7.05c1.322-1.322,3.08-2.051,4.95-2.051s3.628,0.729,4.95,2.051 S20,10.13,20,12s-0.729,3.628-2.051,4.95s-3.08,2.051-4.95,2.051s-3.628-0.729-4.95-2.051l-1.414,1.414 c1.699,1.7,3.959,2.637,6.364,2.637s4.665-0.937,6.364-2.637C21.063,16.665,22,14.405,22,12s-0.937-4.665-2.637-6.364 C17.664,3.936,15.404,2.999,12.999,2.999z"></path>
          </svg>
          <Link href="/admin"> Go to Admin</Link>
        </div>
      )}

      {showSignin && (
        <Signin
          setShowSignin={setShowSignin}
          admin={false}
          setAdmin={setAdmin}
        />
      )}
    </div>
  );
};

export default ContactDetails;
