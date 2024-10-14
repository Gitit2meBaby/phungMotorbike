'use client';
import React, { useState, useEffect } from 'react';
import { CalendarIcon } from "lucide-react";
import Link from 'next/link';
import styles from '../styles/booking.module.css';
import Image from 'next/image';
import success from '../public/success.webp';
import { scrollToTop } from '../app/lib/scrollToTop';
import PayPalButton from './PayPalButton';

const BookingPage = ({ bike }) => {
    const [startDate, setStartDate] = useState(new Date(Date.now()).toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState('');
    const [rentalType, setRentalType] = useState('city');
    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [days, setDays] = useState(0);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [honeypot, setHoneyPot] = useState(false)
    const [error, setError] = useState(true);
    const [dateError, setDateError] = useState(false);
    const [monthlyError, setMonthlyError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [showToolTip, setShowToolTip] = useState(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (start > end) {
                setDateError(true);
                setDays(0);
            } else {
                setDateError(false);
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setDays(diffDays);
                calculatePrice(diffDays);
            }
        }
    }, [startDate, endDate, rentalType]);

    useEffect(() => {
        // Check if all required fields are filled and there's no date or monthly error
        if (name && email && startDate && endDate && !dateError && !monthlyError) {
            setError(false);
        } else {
            setError(true);
        }
    }, [name, email, startDate, endDate, dateError, monthlyError]);

    const calculatePrice = (days) => {
        let basePrice;
        setMonthlyError(false); // Reset monthly error

        switch (rentalType) {
            case 'city':
                basePrice = bike.cityPrice * days;
                setDiscount(0);
                break;
            case 'travel':
                basePrice = bike.travelPrice * days;
                const weeks = Math.floor(days / 7);
                let discountPercentage = Math.min(weeks * 5, 50);
                setDiscount(discountPercentage);
                basePrice = basePrice * (1 - discountPercentage / 100);
                break;
            case 'monthly':
                if (days < 28 || days > 31) {
                    setMonthlyError(true);
                    basePrice = 0; // Set price to 0 if monthly error occurs
                } else {
                    basePrice = bike.monthPrice;
                    setDiscount(0);
                }
                break;
            default:
                basePrice = 0;
        }

        setTotalPrice(basePrice);
    };

    const roundedTotalPrice = Math.ceil(totalPrice * 100) / 100;

    const handleBookNow = async (e) => {
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
        if (!name || !email || !startDate || !endDate || !rentalType) {
            alert('Please fill in all required fields.');
            return;
        }

        // Structure the booking information for the email
        const bookingDetails = {
            name,
            email,
            phone,
            bike,
            rentalType,
            startDate,
            endDate,
            days,
            roundedTotalPrice,
            honeypot
        };

        try {
            // Send the email request to the API
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingDetails),
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
                <h1 >Booking Confirmed</h1>
            ) : (
                <h1>Book Your Motorbike</h1>
            )}
            <h2>Your {bike.model} {bike.name} {bike.capacity}cc</h2>

            {!formSubmitted ? (
                <>
                    <Image
                        src={bike.images[0].thumbURL}
                        alt={`Image of ${bike.model} ${bike.name}`}
                        width={300}
                        height={225}
                        priority
                    />

                    {/* Personal Details Section */}
                    <div className={styles.details}>
                        <div>
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="*required"
                                aria-required="true"
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="*required"
                                aria-required="true"
                                aria-describedby="emailError"
                                onFocus={() => setEmailError(false)}
                            />
                        </div>
                        {emailError && <p id="emailError" style={{ color: 'red', fontStyle: 'italic' }}>*Please provide a valid email address.</p>}
                        <div>
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="optional"
                            />
                        </div>
                    </div>

                    {/* Date Section */}
                    <div className={styles.dates}>
                        <div>
                            <label htmlFor="startDate">Pick-up Date</label>
                            <div>
                                <input
                                    id="startDate"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    aria-required="true"
                                />
                                <CalendarIcon aria-hidden="true" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="endDate">Drop-off Date</label>
                            <div>
                                <input
                                    id="endDate"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    aria-required="true"
                                />
                                <CalendarIcon aria-hidden="true" />
                            </div>
                        </div>
                        {dateError && <p style={{ color: 'red' }}>End date cannot be before start date.</p>}
                    </div>

                    <div className={styles.days}>
                        <p>Total Days: <span> {days}</span></p>
                    </div>

                    {/* Rental Type Section */}
                    <div className={styles.rentType} role="group" aria-labelledby="rental-type-label">
                        <span id="rental-type-label">Rental Type</span>
                        <button aria-label="View pricing structure" onClick={() => setShowToolTip(true)}>
                            <svg stroke="currentColor" fill="#e97f26" strokeWidth="2" viewBox="0 0 1024 1024" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                <path d="..."></path>
                            </svg>
                        </button>

                        {showToolTip && (
                            <div className={styles.toolTip} aria-live="polite">
                                <button aria-label="Close tooltip" onClick={() => setShowToolTip(false)}>
                                    <svg stroke="#e97f26" fill="#e97f26" strokeWidth="1" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="..."></path>
                                    </svg>
                                </button>
                                <h4>Pricing Structure</h4>
                                <p>*Inner city rentals limited to 50km/day within Hanoi city limits.</p>
                                <p>*Unlimited kms allows travel anywhere in Vietnam. A 5% discount applies for longer rentals.</p>
                                <p>*Monthly rates are for Hanoi only, with a 1000km/month limit.</p>
                            </div>
                        )}

                        <div>
                            <input
                                type="radio"
                                value="city"
                                id="city"
                                name="rentalType"
                                checked={rentalType === "city"}
                                onChange={() => setRentalType("city")}
                                aria-checked={rentalType === "city"}
                            />
                            <label htmlFor="city">Inner City Rental (${bike.cityPrice}/day)</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                value="travel"
                                id="travel"
                                name="rentalType"
                                checked={rentalType === "travel"}
                                onChange={() => setRentalType("travel")}
                                aria-checked={rentalType === "travel"}
                            />
                            <label htmlFor="travel">Unlimited Kms (${bike.travelPrice}/day)</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                value="monthly"
                                id="monthly"
                                name="rentalType"
                                checked={rentalType === "monthly"}
                                onChange={() => setRentalType("monthly")}
                                aria-checked={rentalType === "monthly"}
                            />
                            <label htmlFor="monthly">Monthly (đ{bike.monthPrice}/month)</label>
                        </div>
                        {rentalType === 'monthly' && monthlyError && (
                            <p style={{ color: 'red' }}>Monthly rental must be between 28 and 31 days.</p>
                        )}
                    </div>

                    <div className={styles.totals}>
                        {rentalType === 'travel' && discount > 0 && (
                            <h3>Discount applied: <span>{discount}%</span></h3>
                        )}
                        <h3>Total Price: <span>{rentalType === 'monthly' ? 'đ' : '$'}{roundedTotalPrice} <span>{rentalType === 'monthly' ? 'VND' : 'USD'}</span></span></h3>
                    </div>

                    {/* Buttons */}
                    <div className={styles.btnWrapper}>
                        <button
                            className={styles.btn}
                            onClick={(e) => handleBookNow(e)}
                            disabled={error}
                            aria-disabled={error}
                        >
                            Book Now (Pay Later)
                        </button>
                        <button
                            className={styles.btn}
                            onClick={() => handlePayNow()}
                            disabled={error}
                            aria-disabled={error}
                        >
                            Pay Now (4.4% Surcharge)
                        </button>
                        <PayPalButton total={roundedTotalPrice} />
                    </div>
                </>
            ) : (
                <div className={styles.success}>
                    <Image
                        src={success}
                        alt="Booking successful"
                        width={300}
                        height={300}
                    />
                    <p>Thanks {name} for booking with us.</p>
                    <p>A confirmation email has been sent to {email}.</p>
                    <p>See you on {startDate}!</p>
                    <Link href="/">
                        <button className={styles.btn} aria-label="Return to Home">Return to Home</button>
                    </Link>
                </div>
            )}
        </main>
    );
}    