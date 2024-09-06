'use client'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/footer.module.css'

import logo from '../assets/logo.webp'
import phungSmall from '../assets/phungSmall.png'
import motoSmall from '../assets/motoSmall.png'
import ContactForm from './ContactForm'
import ContactDetails from './ContactDetails'

const Footer = () => {
    return (
        <footer>
            <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
            <div className={styles.title}>
                <Image
                    src={logo}
                    alt="phung motorbike logo"
                    width={100}
                    height={87}
                />
                <div className={styles.titleWords}>
                    <Image
                        src={phungSmall}
                        alt="phung motorbike logo"
                        width={120}
                        height={50}
                    />
                    <Image
                        src={motoSmall}
                        alt="phung motorbike logo"
                        width={180}
                        height={50}
                    />
                </div>
            </div>
            <ContactForm />
            <ContactDetails />

            <p className={styles.copyright}>© 2024 phung motorbike. All rights reserved.</p>
        </footer>
    )
}

export default Footer