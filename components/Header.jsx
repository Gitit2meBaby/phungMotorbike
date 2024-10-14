'use client'
import Image from 'next/image';
import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import styles from '../styles/header.module.css';
import Nav from './Nav';
import phung from '../public/phung.png'
import motorbike from '../public/motorbike.png'
import Stars from './Stars';

const Header = () => {
    const pathname = usePathname()
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showNav, setShowNav] = useState(false);

    // Close dropdown when pathname changes
    useEffect(() => {
        setActiveDropdown(null);
    }, [pathname]);

    const handleScroll = useCallback(() => {
        const element = document.getElementById('contactForm');
        if (element) {
            const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 150;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    }, []);

    const handleDropdownClick = useCallback((dropdown) => {
        setActiveDropdown(prev => prev === dropdown ? null : dropdown);
    }, []);

    const handleLinkOut = useCallback(() => {
        setActiveDropdown(null);
        setShowNav(false);
    }, []);

    const isActive = useCallback((path) => {
        if (path === '/') {
            return pathname === '/';
        }
        if (typeof path === 'string') {
            return pathname.startsWith(path) && pathname !== '/';
        }
        return path.some(p => pathname.startsWith(p) && pathname !== '/');
    }, [pathname]);

    const renderDropdownItems = (items) => (
        <ul className={styles.dropdown}>
            {items.map(({ href, label }) => (
                <li key={href} className={styles.dropItem}>
                    <Link href={href} onClick={handleLinkOut}>
                        <span>{label}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );

    const navItems = [
        { type: 'link', href: '/', label: 'Home' },
        {
            type: 'dropdown',
            label: 'For Rent',
            items: [
                { href: '/motorbikes-for-rent-hanoi', label: 'Inner City' },
                { href: '/motorbike-rentals-vietnam', label: 'Travelling' },
                { href: '/monthly-rentals-hanoi', label: 'Monthly' },
            ],
            activeCheck: ['/motorbike-rentals-vietnam', '/motorbikes-for-rent-hanoi', '/monthly-rentals-hanoi'],
        },
        {
            type: 'dropdown',
            label: 'For Sale',
            items: [
                { href: '/motorbikes-for-sale/', label: 'All' },
                { href: '/motorbikes-for-sale/automatic', label: 'Automatic' },
                { href: '/motorbikes-for-sale/semi-auto', label: 'Semi-Auto' },
                { href: '/motorbikes-for-sale/manual', label: 'Manual' },
            ],
            activeCheck: '/motorbikes-for-sale',
        },
        { type: 'link', href: '/motorbike-repairs-hanoi', label: 'Repairs' },
        { type: 'action', label: 'Contact', action: handleScroll },
    ];

    return (
        <>
            <header className={styles.headerDesk}>
                <div className={styles.headLogo}>
                    <Image src={phung} alt="phung motorbike logo" width={140} height={50} priority />
                    <div>
                        <Image src={motorbike} alt="phung motorbike logo" width={220} height={50} priority />
                    </div>
                </div>
                <nav className={styles.nav}>
                    <div className={styles.mainMenu}>
                        {navItems.map((item) => {
                            if (item.type === 'link') {
                                return (
                                    <Link
                                        key={item.href}
                                        onClick={handleLinkOut}
                                        className={styles.navItemDesk}
                                        href={item.href}
                                        style={{ color: isActive(item.href) ? '#E97F26' : '' }}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            } else if (item.type === 'dropdown') {
                                return (
                                    <div
                                        key={item.label}
                                        className={styles.dropBox}
                                        onClick={() => handleDropdownClick(item.label)}
                                    >
                                        <span
                                            className={styles.navItemDesk}
                                            style={{ color: isActive(item.activeCheck) || activeDropdown === item.label ? '#E97F26' : '' }}
                                        >
                                            {item.label}
                                        </span>
                                        {activeDropdown === item.label && renderDropdownItems(item.items)}
                                    </div>
                                );
                            } else if (item.type === 'action') {
                                return (
                                    <p
                                        key={item.label}
                                        className={styles.navItemDesk}
                                        onClick={item.action}
                                    >
                                        {item.label}
                                    </p>
                                );
                            }
                        })}
                    </div>
                </nav>
                <Stars styles={styles} />
            </header>

            <header className={styles.mobHead} onClick={() => setShowNav(!showNav)}>
                <svg stroke="#ebebeb" fill="#ebebeb" strokeWidth="0" viewBox="0 0 20 20" height="4em" width="4em" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
                <div className={styles.headLogo} style={{ display: pathname === '/' ? 'none' : 'block' }}>
                    <Image src={phung} alt="phung motorbike logo" width={120} height={50} priority />
                    <div>
                        <Image src={motorbike} alt="phung motorbike logo" width={180} height={50} priority />
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
                <button className={styles.closeBtn} onClick={() => setShowNav(false)}>CLOSE</button>
            )}
        </>
    );
};

export default Header;