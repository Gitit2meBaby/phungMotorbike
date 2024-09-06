import React, { useState } from 'react';
import styles from '../styles/header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import star from '../assets/star.webp';

const Nav = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeNestedDropdown, setActiveNestedDropdown] = useState(null);

    const handleDropdownClick = (dropdown) => {
        if (activeDropdown === dropdown) {
            setActiveDropdown(null);
            setActiveNestedDropdown(null);
        } else {
            setActiveDropdown(dropdown);
            setActiveNestedDropdown(null);
        }
    };

    const handleNestedDropdownClick = (event, nestedDropdown) => {
        event.stopPropagation();
        if (activeNestedDropdown === nestedDropdown) {
            setActiveNestedDropdown(null);
        } else {
            setActiveNestedDropdown(nestedDropdown);
        }
    };

    return (
        <nav className={styles.mobNav}>
            <ul className={styles.mobMenu}>
                <li>
                    <Link className={styles.navItem} href="/">Home</Link>
                </li>

                <div>
                    <li
                        onClick={() => handleDropdownClick('rent')}
                        className={activeDropdown === 'rent' ? styles.activeMobDropdown : ''}
                        style={activeNestedDropdown !== null ? { height: '28rem' } : {}}
                    >
                        <span className={styles.navItem}>For Rent</span>
                        <ul className={`${styles.nestedMenu} ${activeDropdown === 'rent' ? styles.show : ''}`}>
                            <li onClick={(e) => handleNestedDropdownClick(e, 'innerCity')}>
                                <span className={styles.subItem}>Inner City</span>
                                <ul className={`${styles.nestedDropdown} ${activeNestedDropdown === 'innerCity' ? styles.show : ''}`}>
                                    <li><Link href="/rent/inner-city/daily/automatic">Automatic</Link></li>
                                    <li><Link href="/rent/inner-city/daily/semi-auto">Semi-Auto</Link></li>
                                    <li><Link href="/rent/inner-city/daily/manual">Manual</Link></li>
                                </ul>
                            </li>

                            <li onClick={(e) => handleNestedDropdownClick(e, 'travelling')}>
                                <span className={styles.subItem}>Travelling</span>
                                <ul className={`${styles.nestedDropdown} ${activeNestedDropdown === 'travelling' ? styles.show : ''}`}>
                                    <li><Link href="/rent/travelling/daily/automatic">Automatic</Link></li>
                                    <li><Link href="/rent/travelling/daily/semi-auto">Semi-Auto</Link></li>
                                    <li><Link href="/rent/travelling/daily/manual">Manual</Link></li>
                                </ul>
                            </li>

                            <li onClick={(e) => handleNestedDropdownClick(e, 'monthly')}>
                                <span className={styles.subItem}>Monthly</span>
                                <ul className={`${styles.nestedDropdown} ${activeNestedDropdown === 'monthly' ? styles.show : ''}`}>
                                    <li><Link href="/rent/monthly/automatic">Automatic</Link></li>
                                    <li><Link href="/rent/monthly/semi-auto">Semi-Auto</Link></li>
                                    <li><Link href="/rent/monthly/manual">Manual</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </div>

                <div>
                    <li
                        onClick={() => handleDropdownClick('sale')}
                        className={activeDropdown === 'sale' ? styles.activeMobDropdown : ''}
                    >
                        <span className={styles.navItem}>For Sale</span>
                        <ul className={`${styles.nestedMenu} ${activeDropdown === 'sale' ? styles.show : ''}`}>
                            <li><Link href="/sale/automatic">Automatic</Link></li>
                            <li><Link href="/sale/semi-auto">Semi-Auto</Link></li>
                            <li><Link href="/sale/manual">Manual</Link></li>
                        </ul>
                    </li>
                </div>

                <li>
                    <Link className={styles.navItem} href="/repairs">Repairs</Link>
                </li>

                <li>
                    <Link className={styles.navItem} href="/contact">Contact</Link>
                </li>
            </ul>
            <Image
                className={styles.star}
                src={star}
                alt="star"
                width={300}
                height={300}
            />
        </nav>
    );
};

export default Nav;
