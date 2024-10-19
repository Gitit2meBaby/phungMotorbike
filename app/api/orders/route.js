// import { NextResponse } from 'next/server';
// import fetch from 'node-fetch';

// async function getAccessToken() {
//     const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
//     const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
//         method: 'POST',
//         body: 'grant_type=client_credentials',
//         headers: {
//             Authorization: `Basic ${auth}`,
//         },
//     });
//     const data = await response.json();
//     return data.access_token;
// }

// export async function POST(req) {
//     const { total } = await req.json();
//     const accessToken = await getAccessToken();

//     const order = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//             intent: 'CAPTURE',
//             purchase_units: [{
//                 amount: {
//                     value: total,
//                 },
//             }],
//         }),
//     });

//     const orderData = await order.json();
//     return NextResponse.json(orderData);
// }

// export async function GET(req, { params }) {
//     const { orderId } = params;
//     const accessToken = await getAccessToken();

//     const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}`, {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//         },
//     });

//     const orderData = await response.json();
//     return NextResponse.json(orderData);
// }