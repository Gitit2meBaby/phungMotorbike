'use client'
import React from 'react'
import styles from '../styles/infoCard.module.css'

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
        <button aria-label='Contact Us' onClick={() => handleScroll()} className={styles.btn}>Contact Us</button>
    )
}

export default Button