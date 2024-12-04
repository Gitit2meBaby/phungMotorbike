// app/api/onepay/callback/route.js
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Log the full URL
    console.log("Callback URL:", req.url);

    // Get and log all parameters
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams);
    console.log("Callback parameters:", params);

    // Get response code
    const responseCode = searchParams.get("vpc_TxnResponseCode");
    console.log("Response code:", responseCode);

    // Simplified redirect
    const redirectUrl = new URL(
      `/booking/${responseCode === "0" ? "success" : "failed"}`,
      process.env.NEXT_PUBLIC_BASE_URL
    );

    // Add error info to URL
    redirectUrl.searchParams.set(
      "vpc_TxnResponseCode",
      responseCode || "unknown"
    );
    redirectUrl.searchParams.set(
      "vpc_Message",
      searchParams.get("vpc_Message") || "unknown"
    );

    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/booking/failed?error=callback_processing`
    );
  }
}
