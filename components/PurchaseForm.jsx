'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/booking.module.css';
import Image from 'next/image';
import success from '../public/success.webp';
import { scrollToTop } from '../app/lib/scrollToTop';
import PayPalButton from './PayPalButton';

const PurchaseForm = ({ bike }) => {

    const totalPrice = bike.salePrice

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [honeypot, setHoneyPot] = useState(false)
    const [error, setError] = useState(true);
    const [emailError, setEmailError] = useState(false);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        // Check if all required fields are filled and there's no date or monthly error
        if (name && email) {
            setError(false);
        } else {
            setError(true);
        }
    }, [name, email]);

    const handleBuyNow = async (e) => {
        e.preventDefault();

        // Validate email
        const isEmailValid = emailRegex.test(email);
        if (!isEmailValid) {
            setEmailError(true);
            return; // Exit early if email is invalid
        }

        // Honeypot field (anti-bot check)
        if (honeypot) {
            console.log('Bot submission detected');
            alert('Bot submission detected');
            return;
        }

        // Ensure all required fields are filled
        if (!name || !email) {
            alert('Please fill in all required fields.');
            return;
        }

        // Structure the booking information for the email
        const purchaseDetails = {
            name,
            email,
            phone,
            bike,
            totalPrice,
            honeypot
        };

        try {
            // Send the email request to the API
            const response = await fetch('/api/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(purchaseDetails),
            });

            if (response.ok) {
                setFormSubmitted(true);
                scrollToTop();
            } else {
                alert('Failed to send email. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the email.');
        }
    };

    return (
        <main className={styles.bookings}>
            {formSubmitted ? (
                <h1>Ready for Pickup</h1>
            ) : (
                <h1>Purchase</h1>
            )}
            <h2>Your new {bike.model} {bike.name} {bike.capacity}cc</h2>

            {!formSubmitted ? (
                <>
                    <Image src={bike.images[0].thumbURL} alt={`${bike.model} ${bike.name}`} width={300} height={225}></Image>

                    {/* Personal Details Section */}
                    <div className={styles.details}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder='*required'
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='*required'
                                onFocus={() => setEmailError(false)}
                            />
                        </div>
                        {emailError && <p style={{ color: 'red', fontStyle: 'italic' }}>*Please provide a valid email.</p>}
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder='optional'
                            />
                        </div>
                    </div>

                    {/* Honeypot field - hidden from users but visible to bots */}
                    <div className={styles.honeypot}>
                        <input
                            type="text"
                            name="honeypot"
                            value={honeypot}
                            onChange={() => setHoneyPot(true)}
                            style={{ display: 'none' }}
                            tabIndex="-1"
                            autoComplete="off"
                        />
                    </div>

                    <div className={styles.totals}>
                        <h3>Total Price: <span>${bike.salePrice}<span>USD</span></span></h3>
                    </div>

                    <div className={styles.btnWrapper}>
                        <button className={styles.btn}
                            style={error ? { filter: 'blur(2px)', pointerEvents: 'none' } : {}}
                            onClick={(e) => handleBuyNow(e)}
                        >
                            Reserve Now (Pay Later)
                        </button>

                        <PayPalButton total={bike.salePrice} />
                    </div>
                </>
            ) : (
                <div className={styles.success}>
                    <Image
                        src={success}
                        alt="success"
                        width={300}
                        height={300}
                    />
                    <p>Congratulations {name} on your new bike!</p>
                    <p>A confirmation email has been sent to {email}.</p>
                    <p>We look forward to seeing you in store for the final handover.</p>
                    <Link href="/">
                        <button className={styles.btn}>Return to Home</button>
                    </Link>
                </div>
            )}
        </main>
    );
};

export default PurchaseForm;
