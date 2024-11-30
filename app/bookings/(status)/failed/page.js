// app/booking/(status)/failed/page.js
import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

import styles from "../../../../styles/status.module.css";

const ERROR_MESSAGES = {
  1: "Bank Declined Transaction",
  2: "Bank System Error",
  3: "Merchant Account Not Found",
  4: "Invalid Access Code",
  5: "Invalid Amount",
  6: "Invalid Currency",
  7: "Unspecified Failure",
  8: "Invalid Card Number",
  9: "Invalid Card Name",
  10: "Expired Card",
  11: "Card Not Registered For Internet Transactions",
  12: "Invalid Card Date",
  13: "Exceeds Maximum Amount",
  99: "User Cancelled",
  default: "Payment Processing Error",
};

export default async function FailedPage({ searchParams }) {
  // If no transaction data is present, redirect to home
  if (!searchParams || Object.keys(searchParams).length === 0) {
    redirect("/");
  }

  const {
    vpc_TxnResponseCode,
    vpc_Message,
    vpc_OrderInfo = "",
    vpc_TransactionNo = "",
    vpc_MerchTxnRef = "",
  } = searchParams;

  const errorMessage =
    ERROR_MESSAGES[vpc_TxnResponseCode] || ERROR_MESSAGES.default;
  const technicalDetails = vpc_Message || "No additional details available";

  return (
    <>
      <h1>Payment Unsuccessful</h1>

      <div className={styles.error}>
        <p>{errorMessage}</p>
        <p>
          <small>Technical details: {technicalDetails}</small>
        </p>
      </div>

      <div className={styles.details}>
        <h3>Transaction Details</h3>
        <p>Order Reference: {vpc_MerchTxnRef}</p>
        {vpc_TransactionNo && <p>Transaction ID: {vpc_TransactionNo}</p>}
        <p>Order Info: {vpc_OrderInfo}</p>
      </div>

      <div className={styles.message}>
        <p>Don't worry! Your booking request has been saved. You can:</p>
        <ul>
          <li>Try the payment again</li>
          <li>Contact our support team</li>
          <li>Choose to pay later</li>
        </ul>
      </div>

      <div className={styles.actions}>
        <Link href="/" className={styles.button}>
          Return to Home
        </Link>
      </div>
    </>
  );
}
