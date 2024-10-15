import React from 'react'
import styles from '../styles/cards.module.css'
import Link from 'next/link'

const Cards = () => {
    return (
        <section className={styles.cardsContainer}>
            {/* Inner City Section */}
            <div className={styles.cards}>
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
                <h2 id="inner-city-heading">Inner City</h2>
                <div className={styles.image}>
                    <h3>Bikes for rent in Hanoi<br />50km max /day</h3>
                    <Link href='/motorbikes-for-rent-hanoi/automatic' className={styles.btn}>Automatic
                    </Link>
                    <Link href='/motorbikes-for-rent-hanoi/semi-auto' className={styles.btn}>Semi-auto
                    </Link>
                    <Link href='/motorbikes-for-rent-hanoi/manual' className={styles.btn} >Manual
                    </Link>
                </div>
            </div>

            {/* Long Distance Section */}
            <div className={styles.cards}>
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
                <h2 id="long-distance-heading">Long Distance</h2>
                <div className={styles.image2}>
                    <h3>No Limits<br />to your Adventure!</h3>
                    <Link href='/motorbike-rentals-vietnam/automatic' className={styles.btn}>Automatic
                    </Link>
                    <Link href='/motorbike-rentals-vietnam/semi-auto' className={styles.btn}>Semi-auto
                    </Link>
                    <Link href='/motorbike-rentals-vietnam/manual' className={styles.btn}>Manual
                    </Link>
                </div>
            </div>

            {/* Monthly Rentals Section */}
            <div className={styles.cards}>
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
                <h2 id="monthly-rentals-heading">Monthly Rental</h2>
                <div className={styles.image3}>
                    <h3>Cheapest Rates<br />for your Vietnam Journey</h3>
                    <Link href='/monthly-rentals-hanoi/automatic' className={styles.btn}>Automatic
                    </Link>
                    <Link href='/monthly-rentals-hanoi/semi-auto' className={styles.btn}>Semi-auto
                    </Link>
                    <Link href='/monthly-rentals-hanoi/manual' className={styles.btn}>Manual
                    </Link>
                </div>
            </div>

            <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
        </section>
    )
}

export default Cards
