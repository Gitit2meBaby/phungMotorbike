import React from 'react'
import styles from '../styles/cards.module.css'
import Link from 'next/link'

const Cards = () => {
    return (
        <section className={styles.cardsContainer}>
            <section className={styles.cards}>
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>

                <h2>Inner City</h2>
                <div className={styles.image}>
                    <h3>Bikes for rent in Hanoi<br />50km max /day</h3>
                    <Link href='/motorbikes-for-rent-hanoi/automatic'>
                        <button className={styles.btn}>Automatic</button>
                    </Link>
                    <Link href='/motorbikes-for-rent-hanoi/semi-auto'>
                        <button className={styles.btn}>Semi-auto</button>
                    </Link>
                    <Link href='/motorbikes-for-rent-hanoi/manual'>
                        <button className={styles.btn}>Manual</button>
                    </Link>
                </div>
            </section>

            <section className={styles.cards}>
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
                <h2>Long Distance</h2>
                <div className={styles.image2}>
                    <h3>No Limits<br />to your Adventure!</h3>
                    <Link href='/motorbike-rentals-vietnam/automatic'>
                        <button className={styles.btn}>Automatic</button>
                    </Link>
                    <Link href='/motorbike-rentals-vietnam/semi-auto'>
                        <button className={styles.btn}>Semi-auto</button>
                    </Link>
                    <Link href='/motorbike-rentals-vietnam/manual'>
                        <button className={styles.btn}>Manual</button>
                    </Link>
                </div>
            </section>

            <section className={styles.cards}>
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
                <h2>Monthly Rentals</h2>
                <div className={styles.image3}>
                    <h3>Cheapest Rates<br />for your Vietnam Journey</h3>
                    <Link href='/monthly-rentals-hanoi/automatic'>
                        <button className={styles.btn}>Automatic</button>
                    </Link>
                    <Link href='/monthly-rentals-hanoi/semi-auto'>
                        <button className={styles.btn}>Semi-auto</button>
                    </Link>
                    <Link href='/monthly-rentals-hanoi/manual'>
                        <button className={styles.btn}>Manual</button>
                    </Link>
                </div>
            </section>
            <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
        </section>
    )
}

export default Cards
