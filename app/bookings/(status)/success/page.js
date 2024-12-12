import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "../../../../styles/status.module.css";

import success from "../../../../public/success.webp";

export default async function SuccessPage({ searchParams }) {
  const {
    vpc_Amount = "",
    vpc_OrderInfo = "",
    vpc_TransactionNo = "",
    vpc_MerchTxnRef = "",
  } = searchParams;

  // Convert amount from smallest unit back to actual amount
  const amount = parseInt(vpc_Amount, 10) / 100;

  return (
    <div className={styles.status}>
      <h1>Booking Confirmed!</h1>
      <Image
        src={success}
        alt="Success image"
        width={300}
        height={225}
        priority
      />
      <p className={styles.message}>
        Thank you for your booking. Your payment has been processed
        successfully.
      </p>
      <div className={styles.details}>
        <h3>Transaction Details</h3>
        <p>
          Order Reference: <span>{vpc_MerchTxnRef}</span>
        </p>
        <p>
          Transaction ID: <span>{vpc_TransactionNo}</span>
        </p>
        <p>
          Amount Paid: <span>₫{amount.toLocaleString()} VND</span>
        </p>
        <p>
          Order Info: <span>{vpc_OrderInfo}</span>
        </p>
      </div>
      <div className={styles.actions}>
        <Link href="/" className={styles.btn}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
