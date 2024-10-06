'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import btnStyles from '../styles/button.module.css';
import styles from '../styles/filter.module.css';

const Filter = ({ slug }) => {
    const pathname = usePathname();
    const [hoveredButton, setHoveredButton] = useState(null);

    const fetchFilteredBikes = async (type = 'all', cityPrice, capacity) => {
        const queryParams = new URLSearchParams();

        // Add query params conditionally
        if (type) queryParams.append('type', type);
        if (cityPrice) queryParams.append('cityPrice', cityPrice);  // 'asc' or 'desc'
        if (capacity) queryParams.append('capacity', capacity);    // 'asc' or 'desc'

        const res = await fetch(`/api/bikes?${queryParams.toString()}`);

        if (!res.ok) {
            throw new Error("Failed to fetch bikes");
        }

        const data = await res.json();
        return data;
    };

    // Example usage on a filter interaction
    useEffect(() => {
        const getFilteredBikes = async () => {
            try {
                const filteredBikes = await fetchFilteredBikes(selectedType, selectedCityPrice, selectedCapacity);
                setBikes(filteredBikes); // Update state with filtered bikes
            } catch (error) {
                console.error("Error fetching bikes:", error);
            }
        };

        getFilteredBikes();
    }, [selectedType, selectedCityPrice, selectedCapacity]);


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
