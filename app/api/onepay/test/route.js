// app/api/onepay/test/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  // Use their example test URL
  const ONEPAY_URL = "https://mtf.onepay.vn/paygate/vpcpay.op";

  try {
    // Minimal parameters matching their example exactly
    const params = {
      vpc_Version: "2",
      vpc_Command: "pay",
      vpc_Merchant: "TESTONEPAY",
      vpc_AccessCode: "6BEB2546",
      vpc_MerchTxnRef: `T${Date.now()}`,
      vpc_OrderInfo: "Test_Payment",
      vpc_Amount: "100000",
      vpc_Currency: "VND",
      vpc_ReturnURL: "http://localhost:3000/api/onepay/callback",
      vpc_Locale: "vn",
      vpc_TicketNo: "192.168.1.1", // Using a proper IP format
    };

    // Create hash string with only vpc_ params
    const queryString = Object.keys(params)
      .filter((key) => key.startsWith("vpc_"))
      .sort()
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    // Generate hash
    const secureHash = crypto
      .createHmac("sha256", "6D0870CDE5F24F34F3915FB0045120DB")
      .update(queryString)
      .digest("hex")
      .toUpperCase();

    // Build final URL
    const paymentUrl = `${ONEPAY_URL}?${queryString}&vpc_SecureHash=${secureHash}`;

    console.log({
      params,
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
