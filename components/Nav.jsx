import React, { useState } from 'react';
import styles from '../styles/header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import star from '../assets/star.webp';

const Nav = ({ showNav, setShowNav }) => {
    const [rentDropdownState, setRentDropdownState] = useState({
        isOpen: false,
        activeNestedDropdown: null
    });
    const [saleDropdownState, setSaleDropdownState] = useState({
        isOpen: false
    });

    const handleRentDropdownClick = () => {
        setRentDropdownState(prevState => ({
            isOpen: !prevState.isOpen,
            activeNestedDropdown: null
        }));
        setSaleDropdownState({ isOpen: false });
    };

    const handleSaleDropdownClick = () => {
        setSaleDropdownState(prevState => ({ isOpen: !prevState.isOpen }));
        setRentDropdownState({
            isOpen: false,
            activeNestedDropdown: null
        });
    };

    const handleNestedDropdownClick = (event, nestedDropdown) => {
        event.stopPropagation();
        setRentDropdownState(prevState => ({
            ...prevState,
            activeNestedDropdown: prevState.activeNestedDropdown === nestedDropdown ? null : nestedDropdown
        }));
    };

    return (
        <nav className={styles.mobNav}>
            <ul className={styles.mobMenu}>
                <li>
                    <Link onClick={() => setShowNav(false)} className={styles.navItem} href="/">Home</Link>
                </li>

                <li
                    onClick={handleRentDropdownClick}
                    className={rentDropdownState.isOpen ? styles.activeMobDropdown : ''}
                    style={rentDropdownState.activeNestedDropdown !== null ? { height: '28rem' } : {}}
                >
                    <span className={styles.navItem}>For Rent</span>
                    <ul className={`${styles.nestedMenu} ${rentDropdownState.isOpen ? styles.show : ''}`}>
                        <li onClick={(e) => handleNestedDropdownClick(e, 'innerCity')}>
                            <span className={styles.subItem}>Inner City</span>
                            <ul className={`${styles.nestedDropdown} ${rentDropdownState.activeNestedDropdown === 'innerCity' ? styles.show : ''}`}>
                                <li><Link style={rentDropdownState.activeNestedDropdown !== 'innerCity' ? { display: 'none' } : {}} onClick={() => setShowNav(false)} href="/rent/inner-city/daily/automatic">Automatic</Link></li>
                                <li><Link style={rentDropdownState.activeNestedDropdown !== 'innerCity' ? { display: 'none' } : {}} onClick={() => setShowNav(false)} href="/rent/inner-city/daily/semi-auto">Semi-Auto</Link></li>
                                <li><Link style={rentDropdownState.activeNestedDropdown !== 'innerCity' ? { display: 'none' } : {}} onClick={() => setShowNav(false)} href="/rent/inner-city/daily/manual">Manual</Link></li>
                            </ul>
                        </li>

                        <li onClick={(e) => handleNestedDropdownClick(e, 'travelling')}>
                            <span className={styles.subItem}>Travelling</span>
                            <ul className={`${styles.nestedDropdown} ${rentDropdownState.activeNestedDropdown === 'travelling' ? styles.show : ''}`}>
                                <li><Link style={rentDropdownState.activeNestedDropdown !== 'travelling' ? { display: 'none' } : {}} onClick={() => setShowNav(false)} href="/rent/travelling/daily/automatic">Automatic</Link></li>
                                <li><Link style={rentDropdownState.activeNestedDropdown !== 'travelling' ? { display: 'none' } : {}} onClick={() => setShowNav(false)} href="/rent/travelling/daily/semi-auto">Semi-Auto</Link></li>
                                <li><Link style={rentDropdownState.activeNestedDropdown !== 'travelling' ? { display: 'none' } : {}} onClick={() => setShowNav(false)} href="/rent/travelling/daily/manual">Manual</Link></li>
                            </ul>
                        </li>

                        <li onClick={(e) => handleNestedDropdownClick(e, 'monthly')}>
                            <span className={styles.subItem}>Monthly</span>
                            <ul className={`${styles.nestedDropdown} ${rentDropdownState.activeNestedDropdown === 'monthly' ? styles.show : ''}`}>
                                <li><Link style={rentDropdownState.activeNestedDropdown !== 'monthly' ? { display: 'none' } : {}} onClick={() => setShowNav(false)} href="/rent/monthly/automatic">Automatic</Link></li>
                                <li><Link style={rentDropdownState.activeNestedDropdown !== 'monthly' ? { display: 'none' } : {}} onClick={() => setShowNav(false)} href="/rent/monthly/semi-auto">Semi-Auto</Link></li>
                                <li><Link style={rentDropdownState.activeNestedDropdown !== 'monthly' ? { display: 'none' } : {}} onClick={() => setShowNav(false)} href="/rent/monthly/manual">Manual</Link></li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li
                    onClick={handleSaleDropdownClick}
                    className={saleDropdownState.isOpen ? styles.activeMobDropdown : ''}
                >
                    <span className={styles.navItem}>For Sale</span>
                    <ul className={`${styles.nestedMenu} ${saleDropdownState.isOpen ? styles.show : ''}`}>
                        <li><Link onClick={() => setShowNav(false)} href="/sale/automatic">Automatic</Link></li>
                        <li><Link onClick={() => setShowNav(false)} href="/sale/semi-auto">Semi-Auto</Link></li>
                        <li><Link onClick={() => setShowNav(false)} href="/sale/manual">Manual</Link></li>
                    </ul>
                </li>

                <li>
                    <Link onClick={() => setShowNav(false)} className={styles.navItem} href="/repairs">Repairs</Link>
                </li>

                <li>
                    <Link onClick={() => setShowNav(false)} className={styles.navItem} href="/contact">Contact</Link>
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