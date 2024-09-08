'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.css';

import icon from '../assets/icon.jpg';
import vietFlag from '../assets/viet-flag.png';
import Nav from './Nav';

const Header = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeNestedDropdown, setActiveNestedDropdown] = useState(null);
    const [showNav, setShowNav] = useState(false);

    // Toggles the main dropdown
    const handleDropdownClick = (dropdown) => {
        if (activeDropdown === dropdown) {
            setActiveDropdown(null); // Close the main dropdown if it's already open
        } else {
            setActiveDropdown(dropdown); // Open the selected main dropdown
        }
    };

    // Toggles the nested dropdown and prevents collapsing the main dropdown
    const handleNestedDropdownClick = (event, nestedDropdown) => {
        event.stopPropagation(); // Prevent click from bubbling up and closing the main dropdown
        if (activeNestedDropdown === nestedDropdown) {
            setActiveNestedDropdown(null); // Close the nested dropdown if it's already open
        } else {
            setActiveNestedDropdown(nestedDropdown); // Open the selected nested dropdown
        }
    };

    return (
        <>
            <header className={styles.headerDesk}>
                <Image
                    src={icon}
                    alt="phung motorbike logo"
                    width={80}
                    height={80}
                    priority={true}
                />
                <nav className={styles.nav}>
                    <ul className={styles.mainMenu}>
                        <li>
                            <Link href="/">Home</Link>
                        </li>

                        <div className={styles.dropBox}>
                            <li
                                className={styles.hasDropdown}
                                onClick={() => handleDropdownClick('rent')}
                            >
                                <span>For Rent</span>
                                {activeDropdown === 'rent' && (
                                    <ul className={styles.dropdown}>
                                        {/* First level options */}
                                        <li
                                            className={styles.hasNestedDropdown}
                                            onClick={(e) => handleNestedDropdownClick(e, 'innerCity')}
                                        >
                                            <span>Inner City</span>
                                            {activeNestedDropdown === 'innerCity' && (
                                                <ul className={styles.nestedDropdown}>
                                                    <li><Link href="/rent/inner-city/daily/automatic">Automatic</Link></li>
                                                    <li><Link href="/rent/inner-city/daily/semi-auto">Semi-Auto</Link></li>
                                                    <li><Link href="/rent/inner-city/daily/manual">Manual</Link></li>
                                                </ul>
                                            )}
                                        </li>

                                        <li
                                            className={styles.hasNestedDropdown}
                                            onClick={(e) => handleNestedDropdownClick(e, 'travelling')}
                                        >
                                            <span>Travelling</span>
                                            {activeNestedDropdown === 'travelling' && (
                                                <ul className={styles.nestedDropdown}>
                                                    <li><Link href="/rent/travelling/daily/automatic">Automatic</Link></li>
                                                    <li><Link href="/rent/travelling/daily/semi-auto">Semi-Auto</Link></li>
                                                    <li><Link href="/rent/travelling/daily/manual">Manual</Link></li>
                                                </ul>
                                            )}
                                        </li>

                                        <li
                                            className={styles.hasNestedDropdown}
                                            onClick={(e) => handleNestedDropdownClick(e, 'monthly')}
                                        >
                                            <span>Monthly</span>
                                            {activeNestedDropdown === 'monthly' && (
                                                <ul className={styles.nestedDropdown}>
                                                    <li><Link href="/rent/monthly/automatic">Automatic</Link></li>
                                                    <li><Link href="/rent/monthly/semi-auto">Semi-Auto</Link></li>
                                                    <li><Link href="/rent/monthly/manual">Manual</Link></li>
                                                </ul>
                                            )}
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </div>

                        <div className={styles.dropBox}>
                            <li
                                className={styles.hasDropdown}
                                onClick={() => handleDropdownClick('sale')}
                            >
                                <span>For Sale</span>
                                {activeDropdown === 'sale' && (
                                    <ul className={styles.dropdown}>
                                        <li><Link href="/sale/automatic">Automatic</Link></li>
                                        <li><Link href="/sale/semi-auto">Semi-Auto</Link></li>
                                        <li><Link href="/sale/manual">Manual</Link></li>
                                    </ul>
                                )}
                            </li>
                        </div>

                        <li>
                            <Link href="/repairs">Repairs</Link>
                        </li>


                        <li>
                            <Link href="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
                <Image
                    src={vietFlag}
                    alt="phung motorbike logo"
                    width={80}
                    height={50}
                />
            </header>

            <header className={styles.mobHead}
                onClick={() => setShowNav(!showNav)}>
                <svg stroke="#ebebeb" fill="#ebebeb" strokeWidth="0" viewBox="0 0 20 20" height="4em" width="4em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </header>

            <aside className={styles.mobNav}
                style={{
                    transform: showNav ? 'translateX(0)' : 'translateX(-120%)',
                    boxShadow: showNav ? '0 0 2000px 2000px rgba(0, 0, 0, 0.9)' : 'none'
                }}>
                <Nav showNav={showNav} setShowNav={setShowNav} />
            </aside>

            {showNav && (
                <button className={styles.closeBtn} onClick={() => setShowNav(!showNav)}>CLOSE</button>
            )}
        </>
    );
};

export default Header;
