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
                    <Link href='/inner-city/automatic'>
                        <button className={styles.btn}>Automatic</button>
                    </Link>
                    <Link href='/inner-city/semi-auto'>
                        <button className={styles.btn}>Semi-auto</button>
                    </Link>
                    <Link href='/inner-city/manual'>
                        <button className={styles.btn}>Manual</button>
                    </Link>
                </div>
            </section>

            <section className={styles.cards}>
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
                <h2>Long Distance</h2>
                <div className={styles.image2}>
                    <h3>No Limits<br />to your Adventure!</h3>
                    <Link href='/travelling/automatic'>
                        <button className={styles.btn}>Automatic</button>
                    </Link>
                    <Link href='/travelling/semi-auto'>
                        <button className={styles.btn}>Semi-auto</button>
                    </Link>
                    <Link href='/travelling/manual'>
                        <button className={styles.btn}>Manual</button>
                    </Link>
                </div>
            </section>

            <section className={styles.cards}>
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
                <h2>Monthly Rentals</h2>
                <div className={styles.image3}>
                    <h3>Cheapest Rates<br />for your Vietnam Journey</h3>
                    <Link href='/monthly/automatic'>
                        <button className={styles.btn}>Automatic</button>
                    </Link>
                    <Link href='/monthly/semi-auto'>
                        <button className={styles.btn}>Semi-auto</button>
                    </Link>
                    <Link href='/monthly/manual'>
                        <button className={styles.btn}>Manual</button>
                    </Link>
                </div>
            </section>
            <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
        </section>
    )
}

export default Cards
