'use client';
import React, { useState, useEffect } from 'react';
import { CalendarIcon } from "lucide-react";

const BookingPage = ({ bike }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [rentalType, setRentalType] = useState('city');
    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [days, setDays] = useState(0);

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            setDays(diffDays);
            calculatePrice(diffDays);
        }
    }, [startDate, endDate, rentalType]);

    const calculatePrice = (days) => {
        let basePrice;

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
                    alert('Monthly rental must be between 28 and 31 days');
                }
                basePrice = bike.monthPrice;
                setDiscount(0);
                break;
            default:
                basePrice = 0;
        }

        setTotalPrice(basePrice);
    };

    const roundedTotalPrice = Math.ceil(totalPrice * 100) / 100;

    return (
        <>
            <h1>Book your {bike.model} {bike.name}{bike.capacity}cc</h1>

            <div >
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
                <div >
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
            </div>

            {days > 0 && (
                <div>
                    <p>Total Days: {days}</p>
                </div>
            )}

            <div role="group" aria-labelledby="rental-type-label">
                <span id="rental-type-label">Rental Type</span>

                <div >
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

                <div >
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

                <div >
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
            </div>


            {rentalType === 'travel' && discount > 0 && (
                <h3>Discount applied: {discount}%</h3>
            )}

            <h3>Total Price: ${roundedTotalPrice}</h3>

            <button>Book Now (Pay Later)</button>
            <button>Pay Now (4.4% Surcharge)</button>
        </>
    );
};

export default BookingPage;