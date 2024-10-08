'use client';
import React, { useState } from 'react';
import styles from '../styles/sorter.module.scss';
import btnStyles from '../styles/button.module.css';

const Sorter = ({ onSortChange }) => {
    const [sortMethod, setSortMethod] = useState('price');
    const [priceDirection, setPriceDirection] = useState('asc');
    const [capacityDirection, setCapacityDirection] = useState('asc');

    const handlePriceClick = () => {
        const newDirection = priceDirection === 'asc' ? 'desc' : 'asc';
        setPriceDirection(newDirection);
        setSortMethod('price');
        onSortChange('cityPrice', newDirection);
    };

    const handleCapacityClick = () => {
        const newDirection = capacityDirection === 'asc' ? 'desc' : 'asc';
        setCapacityDirection(newDirection);
        setSortMethod('capacity');
        onSortChange('capacity', newDirection);
    };

    return (
        <>
            <section className={styles.sorter}>
                <div>
                    <button
                        onClick={handlePriceClick}
                        className={sortMethod === 'price' ? btnStyles.activeBtn : btnStyles.btn}
                        style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
                    >
                        Price
                        {priceDirection === 'asc' ? (
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="2" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.293 13.293L7.707 14.707 12 10.414 16.293 14.707 17.707 13.293 12 7.586z"></path>
                            </svg>
                        ) : (
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="2" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.293 9.293L12 13.586 7.707 9.293 6.293 10.707 12 16.414 17.707 10.707z"></path>
                            </svg>
                        )}
                    </button>
                </div>

                <div>
                    <button
                        onClick={handleCapacityClick}
                        className={sortMethod === 'capacity' ? btnStyles.activeBtn : btnStyles.btn}
                        style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
                    >
                        Capacity
                        {capacityDirection === 'asc' ? (
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="2" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.293 13.293L7.707 14.707 12 10.414 16.293 14.707 17.707 13.293 12 7.586z"></path>
                            </svg>
                        ) : (
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="2" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.293 9.293L12 13.586 7.707 9.293 6.293 10.707 12 16.414 17.707 10.707z"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <div></div>
        </>
    );
};

export default Sorter;
