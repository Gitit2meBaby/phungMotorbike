// app/onepay-test/page.js
"use client";
import React from "react";

function OnepayTestPage() {
  const [loading, setLoading] = React.useState(false);

  const handleTestPayment = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/onepay/test", {
        method: "POST",
      });
      const data = await response.json();

      if (data.paymentUrl) {
        // Direct window location change instead of timeout
        window.location.assign(data.paymentUrl);
      } else {
        throw new Error("No payment URL received");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>OnePay Test</h1>
      <p>Amount: 10,000 VND</p>
      <button
        onClick={handleTestPayment}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Test Payment"}
      </button>
    </div>
  );
}

export default OnepayTestPage;
