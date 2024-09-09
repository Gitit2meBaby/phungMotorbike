'use client'
import React from 'react'
import styles from '../styles/repair.module.scss'
import Image from 'next/image'

import repair from '../assets/repair.webp'
import repair2 from '../assets/repair2.webp'
import Button from './Button'

const Repair = () => {
    return (
        <section className={styles.repair}>
            <div className={styles.divider}></div>

            <h2>Repair Service</h2>
            <p>If you need a general checkup, we will have a test drive on your bike then tell you what should be done, how much it may cost, and if you agree with the cost, we will start to work on your bike.</p>

            <div className={styles.imgWrapper}>
                <Image
                    src={repair}
                    alt="repair at Phung Motorbikes"
                    width={250}
                    height={250}
                />
                <Image
                    src={repair2}
                    alt="repair at Phung Motorbikes"
                    width={250}
                    height={250}
                />
            </div>
            <p>If you have a special request, it is better to contact us via <a style={{ textDecoration: 'none' }} href="https://www.facebook.com/PhungMotorbike?ref=embed_page" target="_blank" rel="noopener noreferrer">Facebook</a> or <span onClick={() => window.open('https://wa.me/84904253491')}>Whatsapp (+84 904 2534 91)</span> before you come. Some complicated work can only be done at our warehouse at <span onClick={() => window.open('https://maps.google.com?q=13%20Ngo%20Huyen,%20Hang%20Trong,%20Hoan%20Kiem,%20Ha%20Noi', '_blank')}>99 Bac Cau street, Long Bien.</span></p>
            <Button />
        </section>
    )
}

export default Repair