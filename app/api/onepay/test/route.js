// app/api/onepay/test/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  try {
    // Create a basic test transaction
    const vpcParams = {
      vpc_Merchant: "TESTONEPAY",
      vpc_AccessCode: "6BEB2546",
      vpc_Version: "2",
      vpc_Command: "pay",
      vpc_OrderInfo: "Test Payment",
      vpc_Amount: "100000", // 100,000 VND (make sure amount is high enough)
      vpc_Currency: "VND",
      vpc_Locale: "vn",
      vpc_ReturnURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/onepay/callback`,
      vpc_TicketNo: "127.0.0.1",
      vpc_MerchTxnRef: `TEST${Date.now()}`,
      vpc_SHIP_Street01: "Test Street",
      vpc_SHIP_Provice: "Hanoi",
      vpc_SHIP_City: "Hanoi",
      vpc_SHIP_Country: "VN",
      vpc_Customer_Phone: "84123456789",
      vpc_Customer_Email: "test@example.com",
    };

    // Sort parameters alphabetically
    const sortedParams = Object.keys(vpcParams)
      .sort()
      .reduce((acc, key) => {
        acc[key] = vpcParams[key];
        return acc;
      }, {});

    // Create query string
    const queryString = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    // Generate hash
    const HASH_KEY = "6D0870CDE5F24F34F3915FB0045120DB";
    const secureHash = crypto
      .createHmac("sha256", HASH_KEY)
      .update(queryString)
      .digest("hex")
      .toUpperCase();

    // Create final payment URL
    const paymentUrl = `https://mtf.onepay.vn/onecomm-pay/vpc.op?${queryString}&vpc_SecureHash=${secureHash}`;

    // Log the full URL for debugging
    console.log("Generated payment URL:", paymentUrl);
    console.log("Return URL:", vpcParams.vpc_ReturnURL);

    return NextResponse.json({ paymentUrl });
  } catch (error) {
    console.error("OnePay test payment error:", error);
    return NextResponse.json(
      { error: "Test payment initialization failed" },
      { status: 500 }
    );
  }
}
