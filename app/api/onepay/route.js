// app/api/onepay/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

const ONEPAY_MERCHANT_ID = process.env.ONEPAY_MERCHANT_ID;
const ONEPAY_ACCESS_CODE = process.env.ONEPAY_ACCESS_CODE;
const ONEPAY_HASH_KEY = process.env.ONEPAY_HASH_KEY;
const ONEPAY_URL =
  process.env.VERCEL_ENV === "production"
    ? "https://onepay.vn/paygate/vpcpay.op"
    : "https://mtf.onepay.vn/paygate/vpcpay.op";

export async function POST(req) {
  try {
    const bookingData = await req.json();

    // Convert amount to VND cents (no decimal points)
    const amountInVND = Math.round(bookingData.roundedTotalPrice * 100);

    // Generate unique transaction reference
    const txnRef = `ORDER${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const vpcParams = {
      vpc_Merchant: ONEPAY_MERCHANT_ID,
      vpc_AccessCode: ONEPAY_ACCESS_CODE,
      vpc_Version: "2",
      vpc_Command: "pay",
      vpc_Currency: "VND",
      vpc_Locale: "vn",
      vpc_TicketNo: req.headers.get("x-forwarded-for") || "127.0.0.1",
      vpc_Amount: amountInVND.toString(),
      vpc_MerchTxnRef: txnRef,
      vpc_OrderInfo: `Booking for ${bookingData.name}`,
      vpc_ReturnURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/onepay/callback`,
      vpc_Customer_Email: bookingData.email,
      vpc_Customer_Phone: bookingData.phone || "",
    };

    // Sort parameters alphabetically for hash creation
    const sortedParams = Object.keys(vpcParams)
      .sort()
      .reduce((acc, key) => {
        acc[key] = vpcParams[key];
        return acc;
      }, {});

    // Create query string for hash
    const queryString = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    // Generate HMAC-SHA256 hash
    const secureHash = crypto
      .createHmac("sha256", ONEPAY_HASH_KEY)
      .update(queryString)
      .digest("hex")
      .toUpperCase();

    // Create final payment URL
    const paymentUrl = `${ONEPAY_URL}?${queryString}&vpc_SecureHash=${secureHash}`;

    return NextResponse.json({ paymentUrl });
  } catch (error) {
    console.error("OnePay payment error:", error);
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
