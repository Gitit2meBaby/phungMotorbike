'use client';
import React, { useState, useEffect } from 'react';
import { CalendarIcon } from "lucide-react";
import styles from '../styles/booking.module.css';
import Image from 'next/image';

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

    const [error, setError] = useState(true);
    const [dateError, setDateError] = useState(false);
    const [monthlyError, setMonthlyError] = useState(false);

    const [showToolTip, setShowToolTip] = useState(false)

    useEffect(() => {
        console.log('startDate', startDate);
        console.log('date', Date.now());

    }, [startDate])

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

        // Honeypot field (anti-bot check)
        if (showToolTip) {
            console.log('Bot submission detected');
            return;
        }

        // Ensure all required fields are filled
        if (!name || !email || !phone || !startDate || !endDate || !rentalType || !totalPrice) {
            alert('Please fill in all required fields.');
            return;
        }

        // Structure the booking information for the email
        const bookingDetails = {
            subject: 'New Bike Rental Booking',
            to: process.env.TO_EMAIL,
            from: email,
            body: `
                <h3>New Booking Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Bike:</strong> ${bike.name} (${bike.model})</p>
                <p><strong>Rental Type:</strong> ${rentalType}</p>
                <p><strong>Start Date:</strong> ${startDate}</p>
                <p><strong>End Date:</strong> ${endDate}</p>
                <p><strong>Total Days:</strong> ${days}</p>
                <p><strong>Total Price:</strong> $${roundedTotalPrice}</p>
            `,
        };

        try {
            // Send the email request to the API
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingDetails),
            });

            if (response.ok) {
                alert('Booking confirmed! An email has been sent to the client.');
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
            <h1>Booking</h1>
            <h2>Your {bike.model} {bike.name} {bike.capacity}cc</h2>

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
                    />
                </div>
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
                        />
                        <CalendarIcon />
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
                        />
                        <CalendarIcon />
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
                <svg onClick={() => setShowToolTip(true)} stroke="currentColor" fill="#e97f26" strokeWidth="2" viewBox="0 0 1024 1024" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 708c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm62.9-219.5a48.3 48.3 0 0 0-30.9 44.8V620c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-21.5c0-23.1 6.7-45.9 19.9-64.9 12.9-18.6 30.9-32.8 52.1-40.9 34-13.1 56-41.6 56-72.7 0-44.1-43.1-80-96-80s-96 35.9-96 80v7.6c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V420c0-39.3 17.2-76 48.4-103.3C430.4 290.4 470 276 512 276s81.6 14.5 111.6 40.7C654.8 344 672 380.7 672 420c0 57.8-38.1 109.8-97.1 132.5z"></path></svg>

                {showToolTip && (
                    <div className={styles.toolTip}>
                        <svg onClick={() => setShowToolTip(false)} stroke="#e97f26" fill="#e97f26" strokeWidth="1" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
                        <h4>Pricing Structure</h4>
                        <p>*Inner city rentals are limited to 50km/day and are not permitted outside Hanoi city limits.</p>
                        <p>*Unlimited km's allows you to travel anywhere in Vietnam, a 5% discount/week will be applied for longer rentals.</p>
                        <p>*Monthly rates are for travel inside Hanoi only, and are limited to 1000kms/month.</p>
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
                    <label htmlFor="monthly">Monthly (${bike.monthPrice}/month)</label>
                </div>
                {rentalType === 'monthly' && monthlyError && (
                    <p style={{ color: 'red' }}>Monthly rental must be between 28 and 31 days.</p>
                )}
            </div>

            <div className={styles.totals}>
                {rentalType === 'travel' && discount > 0 && (
                    <h3>Discount applied: <span>{discount}%</span></h3>
                )}

                <h3>Total Price: <span >{rentalType === 'monthly' ? 'đ' : '$'}{roundedTotalPrice}<span >{rentalType === 'monthly' ? 'VND' : 'USD'}</span></span></h3>
            </div>

            <div className={styles.btnWrapper}>
                <button className={styles.btn}
                    style={error ? { filter: 'blur(2px)', pointerEvents: 'none' } : {}}
                    onClick={(e) => handleBookNow(e)}
                >
                    Book Now (Pay Later)
                </button>
                <button className={styles.btn}
                    style={error ? { filter: 'blur(2px)', pointerEvents: 'none' } : {}}
                    onClick={() => handlePayNow()}
                >
                    Pay Now (4.4% Surcharge)
                </button>
            </div>
        </main>
    );
};

export default BookingPage;
