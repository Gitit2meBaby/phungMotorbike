import React from 'react'
import styles from '../styles/cards.module.css'
import Link from 'next/link'

const Cards = () => {
    return (
        <section className={styles.cardsContainer}>
            {/* Inner City Section */}
            <section className={styles.cards} role="region" aria-labelledby="inner-city-heading">
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
                <h2 id="inner-city-heading">Inner City</h2>
                <div className={styles.image}>
                    <h3>Bikes for rent in Hanoi<br />50km max /day</h3>
                    <Link href='/motorbikes-for-rent-hanoi/automatic'>
                        <button className={styles.btn} aria-label="View automatic bikes for rent in Hanoi">Automatic</button>
                    </Link>
                    <Link href='/motorbikes-for-rent-hanoi/semi-auto'>
                        <button className={styles.btn} aria-label="View semi-automatic bikes for rent in Hanoi">Semi-auto</button>
                    </Link>
                    <Link href='/motorbikes-for-rent-hanoi/manual'>
                        <button className={styles.btn} aria-label="View manual bikes for rent in Hanoi">Manual</button>
                    </Link>
                </div>
            </section>

            {/* Long Distance Section */}
            <section className={styles.cards} role="region" aria-labelledby="long-distance-heading">
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
                <h2 id="long-distance-heading">Long Distance</h2>
                <div className={styles.image2}>
                    <h3>No Limits<br />to your Adventure!</h3>
                    <Link href='/motorbike-rentals-vietnam/automatic'>
                        <button className={styles.btn} aria-label="View automatic motorbikes for long-distance travel in Vietnam">Automatic</button>
                    </Link>
                    <Link href='/motorbike-rentals-vietnam/semi-auto'>
                        <button className={styles.btn} aria-label="View semi-automatic motorbikes for long-distance travel in Vietnam">Semi-auto</button>
                    </Link>
                    <Link href='/motorbike-rentals-vietnam/manual'>
                        <button className={styles.btn} aria-label="View manual motorbikes for long-distance travel in Vietnam">Manual</button>
                    </Link>
                </div>
            </section>

            {/* Monthly Rentals Section */}
            <section className={styles.cards} role="region" aria-labelledby="monthly-rentals-heading">
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
                <h2 id="monthly-rentals-heading">Monthly Rentals</h2>
                <div className={styles.image3}>
                    <h3>Cheapest Rates<br />for your Vietnam Journey</h3>
                    <Link href='/monthly-rentals-hanoi/automatic'>
                        <button className={styles.btn} aria-label="View automatic bikes for monthly rentals in Hanoi">Automatic</button>
                    </Link>
                    <Link href='/monthly-rentals-hanoi/semi-auto'>
                        <button className={styles.btn} aria-label="View semi-automatic bikes for monthly rentals in Hanoi">Semi-auto</button>
                    </Link>
                    <Link href='/monthly-rentals-hanoi/manual'>
                        <button className={styles.btn} aria-label="View manual bikes for monthly rentals in Hanoi">Manual</button>
                    </Link>
                </div>
            </section>

            <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
        </section>
    )
}

export default Cards
