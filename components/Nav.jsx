'use client';
import React, { useEffect, useState } from 'react';
import styles from '../styles/header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import star from '../assets/star.webp';

const Nav = ({ showNav, setShowNav }) => {
    const [rentDropdownState, setRentDropdownState] = useState({
        isOpen: false,
    });
    const [saleDropdownState, setSaleDropdownState] = useState({
        isOpen: false
    });

    useEffect(() => {
        if (!showNav) {
            resetAllStates();
        }
    }, [showNav]);

    const resetAllStates = () => {
        setRentDropdownState({ isOpen: false });
        setSaleDropdownState({ isOpen: false });
    };

    const handleRentDropdownClick = () => {
        setRentDropdownState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
        setSaleDropdownState({ isOpen: false });
    };

    const handleSaleDropdownClick = () => {
        setSaleDropdownState(prevState => ({
            isOpen: !prevState.isOpen
        }));
        setRentDropdownState({
            isOpen: false,
        });
    };

    const handleScroll = () => {
        const element = document.getElementById('contactForm');
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 150;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    }

    return (
        <nav className={styles.mobNav}>
            <ul className={styles.mobMenu}>
                <li>
                    <Link onClick={() => setShowNav(false)} className={styles.navItem} href="/">Home</Link>
                </li>

                <li
                    onClick={handleRentDropdownClick}
                    className={rentDropdownState.isOpen ? styles.activeMobDropdown : ''}>
                    <span className={styles.navItem}>For Rent</span>
                    <ul className={`${styles.nestedMenu} ${rentDropdownState.isOpen ? styles.show : ''}`}>
                        <ul className={`${styles.nestedMenu} ${rentDropdownState.isOpen ? styles.show : ''}`}>
                            <Link href='/motorbikes-for-rent-hanoi' onClick={() => setShowNav(false)}
                                style={rentDropdownState.isOpen ? {} : { pointerEvents: 'none' }}>
                                <li>
                                    <span className={styles.subItem}>Inner City</span>
                                </li>
                            </Link>

                            <Link href='/motorbike-rentals-vietnam' onClick={() => setShowNav(false)}
                                style={rentDropdownState.isOpen ? {} : { pointerEvents: 'none' }}>
                                <li>
                                    <span className={styles.subItem}>Travelling</span>
                                </li>
                            </Link>

                            <Link href='/monthly-rentals-hanoi' onClick={() => setShowNav(false)}
                                style={rentDropdownState.isOpen ? {} : { pointerEvents: 'none' }}>
                                <li>
                                    <span className={styles.subItem}>Monthly</span>
                                </li>
                            </Link>
                        </ul>
                    </ul>
                </li>

                <li
                    onClick={handleSaleDropdownClick}
                    className={saleDropdownState.isOpen ? styles.activeMobDropdown : ''}
                >
                    <span className={styles.navItem}>For Sale</span>
                    <ul className={`${styles.nestedMenu} ${saleDropdownState.isOpen ? styles.show : ''}`}>
                        <li><Link onClick={() => setShowNav(false)} href="/motorbikes-for-sale/automatic">Automatic</Link></li>
                        <li><Link onClick={() => setShowNav(false)} href="/motorbikes-for-sale/semi-auto">Semi-Auto</Link></li>
                        <li><Link onClick={() => setShowNav(false)} href="/motorbikes-for-sale/manual">Manual</Link></li>
                    </ul>
                </li>

                <li>
                    <Link onClick={() => setShowNav(false)} className={styles.navItem} href="/motorbike-repairs-hanoi">Repairs</Link>
                </li>

                <li>
                    <p style={{ margin: '0' }} onClick={() => { setShowNav(false); handleScroll() }} className={styles.navItem}>Contact</p>
                </li>
            </ul>
            <Image
                className={styles.star}
                src={star}
                alt="star"
                width={350}
                height={350}
            />
        </nav>
    );
};

export default Nav;
