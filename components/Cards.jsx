'use client'
import React from 'react'
import styles from '../styles/cards.module.css'

const Cards = () => {
    return (
        <section className={styles.cardsContainer}>
            <section className={styles.cards}>
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>

                <h2>Inner City</h2>
                <div className={styles.image}>
                    <h3>Bikes for rent in Hanoi<br></br>50km max /day</h3>
                    <button className={styles.btn}>Automatic</button>
                    <button className={styles.btn}>Semi-auto</button>
                    <button className={styles.btn}>Manual</button>
                </div>
            </section>

            <section className={styles.cards}>
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
                <h2>Long Distance</h2>
                <div className={styles.image2}>
                    <h3>No Limits<br></br>to your Adventure!</h3>
                    <button className={styles.btn}>Automatic</button>
                    <button className={styles.btn}>Semi-auto</button>
                    <button className={styles.btn}>Manual</button>
                </div>
            </section>

            <section className={styles.cards}>
                <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
                <h2>Monthly Rentals</h2>
                <div className={styles.image3}>
                    <h3>Cheapest Rates<br></br>for your Vietnam Journey</h3>
                    <button className={styles.btn}>Automatic</button>
                    <button className={styles.btn}>Semi-auto</button>
                    <button className={styles.btn}>Manual</button>
                </div>
            </section>
            <div className={styles.divider} style={{ margin: '0 auto', width: '85%', marginBottom: '1rem' }}></div>
        </section>
    )
}

export default Cards