// app/booking/(status)/success/page.js
import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

import styles from "../../../../styles/status.module.css";

export default async function SuccessPage({ searchParams }) {
  // If no transaction data is present, redirect to home
  if (!searchParams || Object.keys(searchParams).length === 0) {
    redirect("/");
  }

  const {
    vpc_Amount = "",
    vpc_OrderInfo = "",
    vpc_TransactionNo = "",
    vpc_MerchTxnRef = "",
  } = searchParams;

  // Convert amount from smallest unit back to actual amount
  const amount = parseInt(vpc_Amount, 10) / 100;

  return (
    <>
      <h1>Booking Confirmed!</h1>
      <p className={styles.message}>
        Thank you for your booking. Your payment has been processed
        successfully.
      </p>

      <div className={styles.details}>
        <h3>Transaction Details</h3>
        <p>Order Reference: {vpc_MerchTxnRef}</p>
        <p>Transaction ID: {vpc_TransactionNo}</p>
        <p>Amount Paid: ₫{amount.toLocaleString()} VND</p>
        <p>Order Info: {vpc_OrderInfo}</p>
      </div>

      <div className={styles.actions}>
        <Link href="/" className={styles.button}>
          Return to Home
        </Link>
      </div>
    </>
  );
}
