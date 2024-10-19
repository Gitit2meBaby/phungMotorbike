import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from 'react';

const PayPalButton = ({ total, bookingDetails }) => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return fetch("/api/orders", {
                        method: "POST",
                        body: JSON.stringify({ total: (total * 1.044).toFixed(2) }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then((res) => res.json()).then((order) => {
                        return order.id;
                    });
                }}
                onApprove={(data, actions) => {
                    return fetch(`/api/orders/${data.orderID}/capture`, {
                        method: "POST",
                    }).then((res) => res.json()).then(() => {
                        return fetch('/api/bookings', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(bookingDetails),
                        });
                    }).then((response) => {
                        if (response.ok) {
                            setFormSubmitted(true);
                            scrollToTop();
                        } else {
                            throw new Error('Failed to send email');
                        }
                    }).catch((error) => {
                        console.error('Error:', error);
                        alert('An error occurred while processing your payment or sending the email.');
                    });
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;