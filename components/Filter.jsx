'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import btnStyles from '../styles/button.module.css';
import styles from '../styles/filter.module.css';

const Filter = ({ slug }) => {
    const pathname = usePathname();
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleMouseEnter = (button) => {
        setHoveredButton(button);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const isActive = (href) => pathname === href && !hoveredButton;
    const isHovered = (button) => hoveredButton === button;

    return (
        <section className={styles.filter}>
            <Link href={`${slug}/automatic`}>
                <button
                    className={`${btnStyles.btn} ${isActive(`${slug}/automatic`) || isHovered('automatic') ? btnStyles.activeBtn : ''}`}
                    onMouseEnter={() => handleMouseEnter('automatic')}
                    onMouseLeave={handleMouseLeave}
                >
                    Auto
                </button>
            </Link>
            <Link href={`${slug}/semi-auto`}>
                <button
                    className={`${btnStyles.btn} ${isActive(`${slug}/semi-auto`) || isHovered('semi-auto') ? btnStyles.activeBtn : ''}`}
                    onMouseEnter={() => handleMouseEnter('semi-auto')}
                    onMouseLeave={handleMouseLeave}
                >
                    Semi-Auto
                </button>
            </Link>
            <Link href={`${slug}/manual`}>
                <button
                    className={`${btnStyles.btn} ${isActive(`${slug}/manual`) || isHovered('manual') ? btnStyles.activeBtn : ''}`}
                    onMouseEnter={() => handleMouseEnter('manual')}
                    onMouseLeave={handleMouseLeave}
                >
                    Manual
                </button>
            </Link>
            <Link href={slug}>
                <button
                    className={`${btnStyles.btn} ${isActive(slug) || isHovered('all') ? btnStyles.activeBtn : ''}`}
                    onMouseEnter={() => handleMouseEnter('all')}
                    onMouseLeave={handleMouseLeave}
                >
                    All
                </button>
            </Link>
        </section>
    );
};

export default Filter;
