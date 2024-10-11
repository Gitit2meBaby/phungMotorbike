import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req) {
    const { total } = await req.json();
    const accessToken = await getAccessToken(); // You should implement this to retrieve your access token.

    const order = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    value: total.toFixed(2), // Total including surcharge
                },
            }],
        }),
    });

    const orderData = await order.json();
    return NextResponse.json(orderData);
}
