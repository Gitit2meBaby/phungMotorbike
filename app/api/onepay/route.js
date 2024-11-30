// app/api/onepay/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  const ONEPAY_URL = "https://mtf.onepay.vn/paygate/vpcpay.op";
  const STAGING_URL = "https://phung-motorbike.vercel.app";

  try {
    const bookingData = await req.json();

    // Convert amount to VND (no decimals)
    const amountInVND = Math.round(
      bookingData.roundedTotalPrice * 23000
    ).toString();

    const params = {
      vpc_Version: "2",
      vpc_Currency: "VND",
      vpc_Command: "pay",
      vpc_AccessCode: "6BEB2546",
      vpc_Merchant: "TESTONEPAY",
      vpc_Locale: "vn",
      vpc_ReturnURL: `${STAGING_URL}/api/onepay/callback`,
      vpc_MerchTxnRef: `BOOK${Date.now()}`,
      vpc_OrderInfo: `Booking ${bookingData.bike.name}`,
      vpc_Amount: amountInVND,
      vpc_TicketNo: "127.0.0.1",
      AgainLink: `${STAGING_URL}/bookings/${bookingData.bike.id}`,
    };

    const queryString = Object.keys(params)
      .filter((key) => key.startsWith("vpc_"))
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    const secureHash = crypto
      .createHmac("sha256", "6D0870CDE5F24F34F3915FB0045120DB")
      .update(queryString)
      .digest("hex")
      .toUpperCase();

    const paymentUrl = `${ONEPAY_URL}?${queryString}&vpc_SecureHash=${secureHash}`;

    console.log({
      params,
      queryString,
      secureHash,
      paymentUrl,
    });

    return NextResponse.json({ paymentUrl });
  } catch (error) {
    console.error("OnePay error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
