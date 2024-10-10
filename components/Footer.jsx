import Image from 'next/image'
import React from 'react'
import styles from '../styles/footer.module.css'

import logo from '../public/logo.webp'
import phungSmall from '../public/phungSmall.png'
import motoSmall from '../public/motoSmall.png'
import ContactForm from './ContactForm'
import ContactDetails from './ContactDetails'

const Footer = () => {
    return (
        <footer>
            <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>

            <div className={styles.deskGrid}>
                <div>
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
                    <div className={styles.footerInfo}>
                        <p>We pride ourselves on providing quality service at the best price. Come into the store for a chat and test ride the best motorbike rentals in Hanoi.</p>
                        <p>Please feel free to get in touch with us with any questions you may have.</p>
                    </div>
                </div>

                <div className={styles.mobDivider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>

                <ContactForm />
                <ContactDetails />
            </div>

            <p className={styles.copyright}>© 2024 phung motorbike. All rights reserved.</p>
        </footer>
    )
}

export default Footer