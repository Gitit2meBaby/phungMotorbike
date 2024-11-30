// app/api/onepay/test/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  const ONEPAY_URL = "https://mtf.onepay.vn/paygate/vpcpay.op";
  const STAGING_URL = "https://phung-motorbike.vercel.app";

  try {
    // Using exact values from documentation but with staging URL
    const params = {
      vpc_Version: "2",
      vpc_Currency: "VND",
      vpc_Command: "pay",
      vpc_AccessCode: "6BEB2546",
      vpc_Merchant: "TESTONEPAY",
      vpc_Locale: "vn",
      vpc_ReturnURL: `${STAGING_URL}/api/onepay/callback`,
      vpc_MerchTxnRef: `TEST${Date.now()}`,
      vpc_OrderInfo: "Test Transaction",
      vpc_Amount: "100000", // 1,000 VND as per their example
      vpc_TicketNo: "127.0.0.1",
      AgainLink: STAGING_URL,
    };

    // Create query string only with vpc_ params
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
      queryString,
      secureHash,
      paymentUrl,
    });

    return NextResponse.json({ paymentUrl });
  } catch (error) {
    console.error("Test error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
