import { useState } from "react";

const OnepayTest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTestPayment = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/onepay/test", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.paymentUrl) {
        console.log("Redirecting to:", data.paymentUrl);
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">OnePay Test Payment</h1>
      <p className="mb-4">Amount: 10,000 VND</p>
      <button
        onClick={handleTestPayment}
        disabled={loading}
        className={`px-4 py-2 rounded ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        {loading ? "Processing..." : "Test Payment"}
      </button>
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
    </div>
  );
};

export default OnepayTest;
