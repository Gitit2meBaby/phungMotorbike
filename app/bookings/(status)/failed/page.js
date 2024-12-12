import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "../../../../styles/status.module.css";

import failed from "../../../../public/failed.webp";

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
    <section className={styles.status}>
      <h1>Payment Unsuccessful</h1>

      <Image
        src={failed}
        alt="failed image"
        width={300}
        height={225}
        priority
      />

      <div className={styles.error}>
        <p>{errorMessage}</p>
        <p>
          <small>
            Technical details: <span>{technicalDetails}</span>
          </small>
        </p>
      </div>

      <div className={styles.details}>
        <h3>Transaction Details</h3>
        <p>
          Order Reference: <span>{vpc_MerchTxnRef}</span>
        </p>
        {vpc_TransactionNo && (
          <p>
            Transaction ID: <span>{vpc_TransactionNo}</span>
          </p>
        )}
        <p>
          Order Info: <span>{vpc_OrderInfo}</span>
        </p>
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
        <Link href="/" className={styles.btn}>
          Return to Home
        </Link>
      </div>
    </section>
  );
}
