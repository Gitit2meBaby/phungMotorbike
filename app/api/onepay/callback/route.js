// app/api/onepay/callback/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

const ONEPAY_HASH_KEY = process.env.ONEPAY_HASH_KEY;

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  try {
    // Get all parameters except vpc_SecureHash
    const params = {};
    const secureHash = searchParams.get("vpc_SecureHash");

    searchParams.forEach((value, key) => {
      if (key !== "vpc_SecureHash") {
        params[key] = value;
      }
    });

    // Sort parameters alphabetically
    const sortedParams = Object.keys(params)
      .filter((key) => key.startsWith("vpc_"))
      .sort()
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {});

    // Create query string for verification
    const queryString = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    // Calculate secure hash
    const calculatedHash = crypto
      .createHmac("sha256", ONEPAY_HASH_KEY)
      .update(queryString)
      .digest("hex")
      .toUpperCase();

    // Get response code
    const responseCode = searchParams.get("vpc_TxnResponseCode");

    // Verify hash and determine status
    const isValidHash = calculatedHash === secureHash;
    const isSuccessful = responseCode === "0";

    // Construct redirect URL with all original parameters
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const redirectPath = isSuccessful ? "/booking/success" : "/booking/failed";

    const redirectUrl = new URL(redirectPath, baseUrl);

    // Add all original parameters to the redirect URL
    searchParams.forEach((value, key) => {
      redirectUrl.searchParams.append(key, value);
    });

    // Add validation status
    redirectUrl.searchParams.append(
      "hashValid",
      isValidHash ? "true" : "false"
    );

    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error("OnePay callback error:", error);
    return NextResponse.redirect(
      new URL(
        "/booking/failed?error=system_error",
        process.env.NEXT_PUBLIC_BASE_URL
      )
    );
  }
}
