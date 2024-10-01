'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

import styles from '../styles/header.module.css';

import Nav from './Nav';

import phung from '../assets/phung.png'
import motorbike from '../assets/motorbike.png'

const Header = () => {
    const pathname = usePathname()
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeNestedDropdown, setActiveNestedDropdown] = useState(null);
    const [showNav, setShowNav] = useState(false);

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

    // Toggles the main dropdown
    const handleDropdownClick = (dropdown) => {
        if (activeDropdown === dropdown) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(dropdown);
        }
    };

    // Toggles the nested dropdown and prevents collapsing the main dropdown
    const handleNestedDropdownClick = (event, nestedDropdown) => {
        event.stopPropagation();
        if (activeNestedDropdown === nestedDropdown) {
            setActiveNestedDropdown(null);
        } else {
            setActiveNestedDropdown(nestedDropdown);
        }
    };

    const handleLinkOut = () => {
        setActiveDropdown(false)
        setActiveNestedDropdown(false)
    }

    return (
        <>
            <header className={styles.headerDesk}>
                <div className={styles.headLogo}>
                    <Image
                        src={phung}
                        alt="phung motorbike logo"
                        width={140}
                        height={50}
                    />
                    <div>
                        <Image
                            src={motorbike}
                            alt="phung motorbike logo"
                            width={220}
                            height={50}
                        />
                    </div>
                </div>
                <nav className={styles.nav}>
                    <div className={styles.mainMenu}>

                        <Link onClick={() => handleLinkOut()}
                            style={{ color: pathname === '/' ? '#E97F26' : '' }}
                            className={styles.navItemDesk} href="/">Home</Link>

                        <div className={styles.dropBox}
                            onClick={() => handleDropdownClick('rent')}>
                            <span className={styles.navItemDesk}
                                style={activeDropdown === 'rent' ? { color: '#E97F26' } : {}}>For Rent</span>
                            {activeDropdown === 'rent' && (
                                <ul className={styles.dropdown}>
                                    {/* First level options */}
                                    <li className={styles.dropItem}
                                        onClick={(e) => handleNestedDropdownClick(e, 'innerCity')}
                                    >
                                        <span>Inner City</span>
                                        {activeNestedDropdown === 'innerCity' && (
                                            <div className={styles.nestedDropdown}
                                            >
                                                <Link onClick={() => handleLinkOut()} href="/rent/inner-city/daily/automatic">Automatic</Link>
                                                <Link onClick={() => handleLinkOut()} href="/rent/inner-city/daily/semi-auto">Semi-Auto</Link>
                                                <Link onClick={() => handleLinkOut()} href="/rent/inner-city/daily/manual">Manual</Link>
                                            </div>
                                        )}
                                    </li>

                                    <li
                                        className={styles.dropItem}
                                        onClick={(e) => handleNestedDropdownClick(e, 'travelling')}
                                    >
                                        <span>Travelling</span>
                                        {activeNestedDropdown === 'travelling' && (
                                            <div className={styles.nestedDropdown}
                                            >
                                                <Link onClick={() => handleLinkOut()} href="/rent/travelling/daily/automatic">Automatic</Link>
                                                <Link onClick={() => handleLinkOut()} href="/rent/travelling/daily/semi-auto">Semi-Auto</Link>
                                                <Link onClick={() => handleLinkOut()} href="/rent/travelling/daily/manual">Manual</Link>
                                            </div>
                                        )}
                                    </li>

                                    <li
                                        className={styles.dropItem}
                                        onClick={(e) => handleNestedDropdownClick(e, 'monthly')}
                                    >
                                        <span>Monthly</span>
                                        {activeNestedDropdown === 'monthly' && (
                                            <div className={styles.nestedDropdown}
                                            >
                                                <Link onClick={() => handleLinkOut()} href="/rent/monthly/automatic">Automatic</Link>
                                                <Link onClick={() => handleLinkOut()} href="/rent/monthly/semi-auto">Semi-Auto</Link>
                                                <Link onClick={() => handleLinkOut()} href="/rent/monthly/manual">Manual</Link>
                                            </div>
                                        )}
                                    </li>
                                </ul>
                            )}
                        </div>

                        <div className={styles.dropBox} onClick={() => handleDropdownClick('sale')}>
                            <span className={styles.navItemDesk} style={activeDropdown === 'sale' ? { color: '#E97F26' } : {}}>For Sale</span>
                            {activeDropdown === 'sale' && (
                                <div className={styles.dropdown}>
                                    <Link onClick={() => handleLinkOut()} href="/sale/automatic">Automatic</Link>
                                    <Link onClick={() => handleLinkOut()} href="/sale/semi-auto">Semi-Auto</Link>
                                    <Link onClick={() => handleLinkOut()} href="/sale/manual">Manual</Link>
                                </div>
                            )}
                        </div>

                        <Link onClick={() => handleLinkOut()} className={styles.navItemDesk} href="/repairs">Repairs</Link>

                        <p className={styles.navItemDesk} onClick={() => handleScroll()}>Contact</p>
                    </div>
                </nav>
                <div className={styles.stars}>
                    <div>
                        <svg stroke="currentColor" fill="#e97f26" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
                        <svg stroke="currentColor" fill="#e97f26" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
                        <svg stroke="currentColor" fill="#e97f26" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
                        <svg stroke="currentColor" fill="#e97f26" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
                        <svg stroke="#e97f26" fill="#e97f26" strokeWidth="0" viewBox="0 0 16 16" height=".83em" width=".83em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.354 5.119L7.538.792A.516.516 0 018 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0116 6.32a.55.55 0 01-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.519.519 0 01-.146.05c-.341.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 01-.171-.403.59.59 0 01.084-.302.513.513 0 01.37-.245l4.898-.696zM8 12.027c.08 0 .16.018.232.056l3.686 1.894-.694-3.957a.564.564 0 01.163-.505l2.906-2.77-4.052-.576a.525.525 0 01-.393-.288L8.002 2.223 8 2.226v9.8z" clipRule="evenodd"></path></svg>
                        <svg width="20px" height="20px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>
                    </div>
                    <div className={styles.reviews}>
                        <p><span>4.7</span> / 493 reviews</p>
                    </div>
                </div>
            </header>

            <header className={styles.mobHead}
                onClick={() => setShowNav(!showNav)}>
                <svg stroke="#ebebeb" fill="#ebebeb" strokeWidth="0" viewBox="0 0 20 20" height="4em" width="4em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                <div className={styles.headLogo}
                    style={pathname === '/' ? { display: 'none' } : { display: 'block' }}>
                    <Image
                        src={phung}
                        alt="phung motorbike logo"
                        width={120}
                        height={50}
                    />
                    <div>
                        <Image
                            src={motorbike}
                            alt="phung motorbike logo"
                            width={180}
                            height={50}
                        />
                    </div>
                </div>
            </header>

            <aside
                className={styles.mobNav}
                style={{
                    transform: showNav ? 'translateX(0)' : 'translateX(-140%)',
                    boxShadow: showNav ? '0 0 2000px 2000px rgba(0, 0, 0, 0.9)' : 'none'
                }}
            >
                <Nav showNav={showNav} setShowNav={setShowNav} />
            </aside>


            {showNav && (
                <button className={styles.closeBtn} onClick={() => setShowNav(!showNav)}>CLOSE</button>
            )
            }
        </>
    );
};

export default Header;
