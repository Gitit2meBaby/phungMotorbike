'use client'
import React, { useState } from 'react';
import styles from '../styles/footer.module.css';
import Signin from './Signin';

const ContactDetails = () => {
    const [showSignin, setShowSignin] = useState(false);

    return (
        <div className={styles.details}>
            <div className={`${styles.divider} ${styles.final}`}></div>

            {/* Address with Google Maps */}
            <a
                className={styles.contact}
                href="https://maps.google.com?q=13%20Ngo%20Huyen,%20Hang%20Trong,%20Hoan%20Kiem,%20Ha%20Noi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open address in Google Maps"
            >
                <svg stroke="#e97f26" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <p>13 Ngo Huyện, Hàng Trống, Hoàn Kiếm, Hà Nội</p>
            </a>

            {/* Phone number */}
            <a
                className={styles.contact}
                href="tel:+84965936677"
                aria-label="Call +84 965 93 6677"
            >
                <svg stroke="#e97f26" fill="#e97f26" strokeWidth="0" viewBox="0 0 1024 1024" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M877.1 238.7L770.6 132.3c-13-13-30.4-20.3-48.8-20.3s-35.8 7.2-48.8 20.3L558.3 246.8c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l89.6 89.7a405.46 405.46 0 0 1-86.4 127.3c-36.7 36.9-79.6 66-127.2 86.6l-89.6-89.7c-13-13-30.4-20.3-48.8-20.3a68.2 68.2 0 0 0-48.8 20.3L132.3 673c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l106.4 106.4c22.2 22.2 52.8 34.9 84.2 34.9 6.5 0 12.8-.5 19.2-1.6 132.4-21.8 263.8-92.3 369.9-198.3C818 606 888.4 474.6 910.4 342.1c6.3-37.6-6.3-76.3-33.3-103.4zm-37.6 91.5c-19.5 117.9-82.9 235.5-178.4 331s-213 158.9-330.9 178.4c-14.8 2.5-30-2.5-40.8-13.2L184.9 721.9 295.7 611l119.8 120 .9.9 21.6-8a481.29 481.29 0 0 0 285.7-285.8l8-21.6-120.8-120.7 110.8-110.9 104.5 104.5c10.8 10.8 15.8 26 13.3 40.8z"></path></svg>
                <p>+84 965 93 6677</p>
            </a>

            {/* WhatsApp */}
            <a
                className={styles.contact}
                href="https://wa.me/84904253491"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp +84 904 2534 91"
            >
                <svg stroke="#e97f26" fill="#e97f26" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M13.641 2.325c-1.497-1.5-3.488-2.325-5.609-2.325-4.369 0-7.925 3.556-7.925 7.928 0 1.397 0.366 2.763 1.059 3.963l-1.125 4.109 4.203-1.103c1.159 0.631 2.463 0.966 3.787 0.966h0.003c0 0 0 0 0 0 4.369 0 7.928-3.556 7.928-7.928 0-2.119-0.825-4.109-2.322-5.609zM8.034 14.525v0c-1.184 0-2.344-0.319-3.356-0.919l-0.241-0.144-2.494 0.653 0.666-2.431-0.156-0.25c-0.663-1.047-1.009-2.259-1.009-3.506 0-3.634 2.956-6.591 6.594-6.591 1.759 0 3.416 0.688 4.659 1.931 1.244 1.247 1.928 2.9 1.928 4.662-0.003 3.637-2.959 6.594-6.591 6.594zM11.647 9.588c-0.197-0.1-1.172-0.578-1.353-0.644s-0.313-0.1-0.447 0.1c-0.131 0.197-0.512 0.644-0.628 0.778-0.116 0.131-0.231 0.15-0.428 0.050s-0.838-0.309-1.594-0.984c-0.588-0.525-0.987-1.175-1.103-1.372s-0.013-0.306 0.088-0.403c0.091-0.088 0.197-0.231 0.297-0.347s0.131-0.197 0.197-0.331c0.066-0.131 0.034-0.247-0.016-0.347s-0.447-1.075-0.609-1.472c-0.159-0.388-0.325-0.334-0.447-0.341-0.116-0.006-0.247-0.006-0.378-0.006s-0.347 0.050-0.528 0.247c-0.181 0.197-0.694 0.678-0.694 1.653s0.709 1.916 0.809 2.050c0.1 0.131 1.397 2.134 3.384 2.991 0.472 0.203 0.841 0.325 1.128 0.419 0.475 0.15 0.906 0.128 1.247 0.078 0.381-0.056 1.172-0.478 1.338-0.941s0.166-0.859 0.116-0.941c-0.047-0.088-0.178-0.137-0.378-0.238z"></path></svg>
                <p>+84 904 2534 91</p>
            </a>

            {/* Email */}
            <a
                className={styles.contact}
                href="mailto:2wheelsvietnam@gmail.com"
                aria-label="Send an email to 2wheelsvietnam@gmail.com"
            >
                <svg stroke="#e97f26" fill="#e97f26" strokeWidth="0" viewBox="0 0 1024 1024" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path></svg>
                <p>2wheelsvietnam@gmail.com</p>
            </a>

            {/* Facebook */}
            <a
                className={styles.contact}
                href="https://www.facebook.com/PhungMotorbike?ref=embed_page"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Phung Motorbike on Facebook"
            >
                <svg stroke="#e97f26" fill="#e97f26" strokeWidth="0" viewBox="0 0 512 512" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
                <p>Phung Motorbike</p>
            </a>

            {/* Business Hours */}
            <div className={styles.contact} aria-label="Business hours">
                <svg stroke="#e97f26" fill="#e97f26" strokeWidth="0" viewBox="0 0 1024 1024" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
                <p>8:30 - 12:00 | 13:30 - 18:00 (GMT +7)</p>
            </div>

            {/* Staff Login */}
            <div
                className={styles.contact}
                onClick={() => setShowSignin(true)}
                aria-label="Staff login"
            >
                <svg stroke="#e97f26" fill="#e97f26" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M10.998 16L15.998 12 10.998 8 10.998 11 1.998 11 1.998 13 10.998 13z"></path><path d="M12.999,2.999c-2.405,0-4.665,0.937-6.364,2.637L8.049,7.05c1.322-1.322,3.08-2.051,4.95-2.051s3.628,0.729,4.95,2.051 S20,10.13,20,12s-0.729,3.628-2.051,4.95s-3.08,2.051-4.95,2.051s-3.628-0.729-4.95-2.051l-1.414,1.414 c1.699,1.7,3.959,2.637,6.364,2.637s4.665-0.937,6.364-2.637C21.063,16.665,22,14.405,22,12s-0.937-4.665-2.637-6.364 C17.664,3.936,15.404,2.999,12.999,2.999z"></path></svg>
                <p>Login (staff only)</p>
            </div>

            {showSignin && <Signin setShowSignin={setShowSignin} />}
        </div>
    );
}

export default ContactDetails;
