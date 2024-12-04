"use client";
import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import styles from "../styles/booking.module.css";
import success from "../public/success.webp";
import { scrollToTop } from "../app/lib/scrollToTop";

const BookingPage = ({ bike }) => {
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState(
    new Date(Date.now()).toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState("");
  const [priceType, setPriceType] = useState("city");
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [days, setDays] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isMounted, setIsMounted] = useState(false);

  const [honeypot, setHoneyPot] = useState(false);
  const [error, setError] = useState(true);
  const [dateError, setDateError] = useState(false);
  const [monthlyError, setMonthlyError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [showToolTip, setShowToolTip] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const roundedTotalPrice = Math.ceil(totalPrice * 100) / 100;

  const bookingDetails = {
    name,
    email,
    phone,
    bike,
    priceType,
    startDate,
    endDate,
    days,
    roundedTotalPrice,
    honeypot,
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const queryPriceType = searchParams.get("priceType");
      if (queryPriceType) {
        setPriceType(queryPriceType);
      }
    }
  }, [isMounted, searchParams]);

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
  }, [startDate, endDate, priceType]);

  useEffect(() => {
    if (name && email && startDate && endDate && !dateError && !monthlyError) {
      setError(false);
    } else {
      setError(true);
    }
  }, [name, email, startDate, endDate, dateError, monthlyError]);

  const calculatePrice = (days) => {
    let basePrice;
    setMonthlyError(false); // Reset monthly error

    switch (priceType) {
      case "city":
        basePrice = bike.cityPrice * days;
        setDiscount(0);
        break;
      case "travel":
        basePrice = bike.travelPrice * days;
        const weeks = Math.floor(days / 7);
        let discountPercentage = Math.min(weeks * 5, 50);
        setDiscount(discountPercentage);
        basePrice = basePrice * (1 - discountPercentage / 100);
        break;
      case "monthly":
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

  const handleBookNow = async (e) => {
    e.preventDefault();

    // Validate email
    const isEmailValid = emailRegex.test(email);
    if (!isEmailValid) {
      setEmailError(true);
      console.log("Email is invalid");

      return; // Exit early if email is invalid
    }

    if (honeypot) {
      console.log("Bot submission detected");
      alert("Bot submission detected");
      return;
    }

    if (!name || !email || !startDate || !endDate || !priceType) {
      alert("Please fill in all required fields.");
      return;
    }

    const bookingDetails = {
      name,
      email,
      phone,
      bike,
      priceType,
      startDate,
      endDate,
      days,
      roundedTotalPrice,
      honeypot,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        setFormSubmitted(true);
        scrollToTop();
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the email.");
    }
  };

  // Update your handlePayNow function in BookingPage.jsx
  const handlePayNow = async () => {
    try {
      const response = await fetch("/api/onepay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingDetails,
          roundedTotalPrice:
            priceType === "monthly"
              ? roundedTotalPrice // VND amount
              : roundedTotalPrice * 23000, // Convert USD to VND using current rate
        }),
      });

      const data = await response.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initialization failed. Please try again.");
    }
  };

  return (
    <main className={styles.bookings}>
      {formSubmitted ? (
        <h1>Booking Confirmed</h1>
      ) : (
        <h1>Book Your Motorbike</h1>
      )}
      <h2>
        Your {bike.model} {bike.name} {bike.capacity}cc
      </h2>

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
                onFocus={() => setEmailError(false)}
              />
            </div>
            {emailError && (
              <p id="emailError" style={{ color: "red", fontStyle: "italic" }}>
                *Please provide a valid email address.
              </p>
            )}
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
            {dateError && (
              <p style={{ color: "red" }}>
                End date cannot be before start date.
              </p>
            )}
          </div>

          <div className={styles.days}>
            <p>
              Total Days: <span> {days}</span>
            </p>
          </div>

          {/* Price Type Section */}
          <div className={styles.rentType} role="group">
            <span id="rental-type-label">Rental Type</span>
            <svg
              onClick={() => setShowToolTip(true)}
              stroke="currentColor"
              fill="#e97f26"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="8"></line>
            </svg>
            {showToolTip && (
              <div className={styles.toolTip}>
                <svg
                  onClick={() => setShowToolTip(false)}
                  stroke="#e97f26"
                  fill="#e97f26"
                  strokeWidth="1"
                  viewBox="0 0 1024 1024"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path>
                  <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                </svg>
                <h4>Pricing Structure</h4>
                <p>
                  *Inner city rentals limited to 50km/day within Hanoi city
                  limits.
                </p>
                <p>
                  *Unlimited kms allows travel anywhere in Vietnam. A 5%
                  discount applies for longer rentals.
                </p>
                <p>
                  *Monthly rates are for Hanoi only, with a 1000km/month limit.
                </p>
              </div>
            )}

            {bike.cityPrice && (
              <div className={styles.type}>
                <label>
                  <input
                    type="radio"
                    name="rentalType"
                    value="city"
                    checked={priceType === "city"}
                    onChange={(e) => setPriceType(e.target.value)}
                  />
                  City (${bike.cityPrice}/day USD)
                </label>
              </div>
            )}

            {bike.travelPrice && (
              <div className={styles.type}>
                <label>
                  <input
                    type="radio"
                    name="rentalType"
                    value="travel"
                    checked={priceType === "travel"}
                    onChange={(e) => setPriceType(e.target.value)}
                  />
                  Travel (${bike.travelPrice}/day USD)
                </label>
              </div>
            )}

            {bike.monthPrice && (
              <div className={styles.type}>
                <label>
                  <input
                    type="radio"
                    name="rentalType"
                    value="monthly"
                    checked={priceType === "monthly"}
                    onChange={(e) => setPriceType(e.target.value)}
                  />
                  Monthly (₫{bike.monthPrice}/month VND)
                </label>
              </div>
            )}

            {monthlyError && (
              <p style={{ color: "red" }}>
                Monthly bookings are only available for 28-31 days.
              </p>
            )}
          </div>

          {/* Honeypot field (to prevent bots) */}
          <div style={{ display: "none" }}>
            <label>
              <input
                type="checkbox"
                checked={honeypot}
                onChange={(e) => setHoneyPot(e.target.checked)}
              />{" "}
              Do not fill this field
            </label>
          </div>

          {/* Total Price Section */}
          <div className={styles.totals}>
            {priceType === "travel" && discount > 0 && (
              <h3>
                Discount applied: <span>{discount}%</span>
              </h3>
            )}
            <h3>
              Total Price:{" "}
              <span>
                {priceType === "monthly" ? "đ" : "$"}
                {roundedTotalPrice}{" "}
                <span>{priceType === "monthly" ? "VND" : "USD"}</span>
              </span>
            </h3>
          </div>

          {/* Buttons */}
          <div className={styles.btnWrapper}>
            <button
              className={styles.btn}
              onClick={(e) => handleBookNow(e)}
              disabled={error}
            >
              Book Now (Pay Later)
            </button>
            <button
              className={styles.btn}
              onClick={() => handlePayNow()}
              disabled={error}
            >
              Pay Now (4.4% Surcharge)
            </button>
          </div>
        </>
      ) : (
        <div className={styles.success}>
          <Image
            src={success}
            alt="Success image"
            width={300}
            height={225}
            priority
          />
          <h2>Thanks {name}!</h2>
          <h2>Your booking has been confirmed</h2>
          <p>We have sent a confirmation email to {email}.</p>
        </div>
      )}
    </main>
  );
};

export default BookingPage;
