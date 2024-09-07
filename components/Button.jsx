'use client'
import React from 'react'
import styles from '../styles/inforCard.module.css'

const Button = () => {

    const handleScroll = () => {
        const element = document.getElementById('contactForm');
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 150;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    }


    return (
        <button onClick={() => handleScroll()} className={styles.btn}>Book Now</button>
    )
}

export default Button