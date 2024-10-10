import React from 'react'
import styles from '../styles/repair.module.scss'
import Image from 'next/image'

import repair from '../public/repair.webp'
import repair2 from '../public/repair2.webp'
import Button from './Button'
import RepairLinkText from './RepairLinkText'

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
            <RepairLinkText />
            <Button />
        </section>
    )
}

export default Repair