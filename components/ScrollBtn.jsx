'use client'
import React, { useEffect, useState } from 'react';

const ScrollBtn = () => {
    const [isVisible, setIsVisible] = useState(false);  // To track button visibility
    const [isScrolling, setIsScrolling] = useState(false); // To track if the user is scrolling

    // Function to handle the scroll event
    useEffect(() => {
        let scrollTimeout;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            setIsScrolling(true);

            // Clear the timeout if it exists and set a new one to track scroll end
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
            }, 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                    position: 'fixed',
                    bottom: '1rem',
                    right: '1rem',
                    border: 'none',
                    background: '#e97f26',
                    cursor: 'pointer',
                    margin: '0',
                    padding: '0',
                    borderRadius: '.3rem',
                    opacity: isVisible ? (isScrolling ? 0 : 1) : 0,
                    pointerEvents: isVisible ? 'auto' : 'none',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.opacity = 1;
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.opacity = isScrolling ? 0.5 : 1;
                }}
                aria-label="Scroll to top"
            >
                <svg
                    style={{ marginBottom: '-.2rem' }}
                    stroke="#0d0d0d"
                    fill="#0d0d0d"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    height="2.5em"
                    width="2.5em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6.293 13.293L7.707 14.707 12 10.414 16.293 14.707 17.707 13.293 12 7.586z"></path>
                </svg>
            </button>
        </div>
    );
};

export default ScrollBtn;
