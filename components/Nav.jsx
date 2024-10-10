'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/header.module.css';
import star from '../public/star.webp';

const Nav = ({ showNav, setShowNav }) => {
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        if (showNav === false) {
            setActiveDropdown(null);
        }
    }, [showNav])

    const isActive = useCallback((path) => {
        if (path === '/') {
            return pathname === '/';
        }
        if (typeof path === 'string') {
            return pathname.startsWith(path) && pathname !== '/';
        }
        if (Array.isArray(path)) {
            return path.some(p => pathname.startsWith(p) && pathname !== '/');
        }
        return false;
    }, [pathname]);

    const handleDropdownClick = (dropdown) => {
        setActiveDropdown(prev => prev === dropdown ? null : dropdown);
    };

    const handleLinkClick = () => {
        setShowNav(false);
        setActiveDropdown(null);
    };

    const handleScroll = () => {
        const element = document.getElementById('contactForm');
        if (element) {
            const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 150;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

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
            activeCheck: ['/motorbike-rentals-vietnam', '/motorbikes-for-rent-hanoi', '/monthly-rentals'],
        },
        {
            type: 'dropdown',
            label: 'For Sale',
            items: [
                { href: '/motorbikes-for-sale', label: 'All' },
                { href: '/motorbikes-for-sale/automatic', label: 'Automatic' },
                { href: '/motorbikes-for-sale/semi-auto', label: 'Semi-Auto' },
                { href: '/motorbikes-for-sale/manual', label: 'Manual' },
            ],
            activeCheck: '/motorbikes-for-sale',
        },
        { type: 'link', href: '/motorbike-repairs-hanoi', label: 'Repairs' },
        { type: 'action', label: 'Contact', action: handleScroll },
    ];

    // Function to calculate height based on number of dropdown items
    const calculateHeight = (numItems) => {
        const itemHeight = 4; // 4rem for each dropdown item
        return `${numItems * itemHeight}rem`;
    };

    return (
        <nav className={styles.mobNav}>
            <ul className={styles.mobMenu}>
                {navItems.map((item) => (
                    <li key={item.label} className={isActive(item.href || item.activeCheck) ? styles.activeNavItem : ''}>
                        {item.type === 'link' && (
                            <Link href={item.href} onClick={handleLinkClick} className={styles.navItem}>
                                {item.label}
                            </Link>
                        )}
                        {item.type === 'dropdown' && (
                            <>
                                <span
                                    className={`${styles.navItem} ${activeDropdown === item.label ? styles.activeDropdown : ''}`}
                                    onClick={() => handleDropdownClick(item.label)}
                                >
                                    {item.label}
                                </span>
                                <ul
                                    className={`${styles.nestedMenu} ${activeDropdown === item.label ? styles.show : ''}`}
                                    style={{ maxHeight: activeDropdown === item.label ? calculateHeight(item.items.length) : '0', height: activeDropdown === item.label ? calculateHeight(item.items.length) : '0' }}
                                >
                                    {item.items.map((subItem) => (
                                        <li key={subItem.href}>
                                            <Link
                                                href={subItem.href}
                                                onClick={handleLinkClick}
                                                className={styles.subItem}
                                            >
                                                {subItem.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {item.type === 'action' && (
                            <p className={styles.navItem} onClick={() => { handleLinkClick(); item.action(); }}>
                                {item.label}
                            </p>
                        )}
                    </li>
                ))}
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
