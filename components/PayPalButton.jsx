import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ total }) => {
    return (
        <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return fetch("/api/orders", {
                        method: "POST",
                        body: JSON.stringify({ total: (total * 1.044).toFixed(2) }), // Adding the surcharge
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then((res) => res.json()).then((order) => {
                        return order.id; // Return the order ID
                    });
                }}
                onApprove={(data, actions) => {
                    return fetch(`/api/orders/${data.orderID}/capture`, {
                        method: "POST",
                    }).then((res) => {
                        // Handle post-capture actions here
                    });
                }}
            />
        </PayPalScriptProvider>
    );
};


export default PayPalButton