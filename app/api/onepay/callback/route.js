// app/api/onepay/callback/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

const STAGING_URL = "https://phung-motorbike.vercel.app";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Log all received parameters
    console.log(
      "Received callback parameters:",
      Object.fromEntries(searchParams.entries())
    );

    // Get vpc_ parameters for verification (excluding vpc_SecureHash)
    const params = {};
    searchParams.forEach((value, key) => {
      if (key !== "vpc_SecureHash" && key.startsWith("vpc_")) {
        params[key] = value;
      }
    });

    // Create query string
    const queryString = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    // Calculate hash
    const calculatedHash = crypto
      .createHmac("sha256", "6D0870CDE5F24F34F3915FB0045120DB")
      .update(queryString)
      .digest("hex")
      .toUpperCase();

    const responseCode = searchParams.get("vpc_TxnResponseCode");

    console.log({
      queryString,
      calculatedHash,
      receivedHash: searchParams.get("vpc_SecureHash"),
      responseCode,
    });

    // Redirect based on transaction status
    const redirectUrl = new URL(
      responseCode === "0"
        ? "/booking/success"
        : `/booking/failed?code=${responseCode}`,
      STAGING_URL
    );

    // Add response parameters to redirect URL
    searchParams.forEach((value, key) => {
      redirectUrl.searchParams.append(key, value);
    });

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(
      new URL("/booking/failed?error=callback_failed", STAGING_URL)
    );
  }
}
