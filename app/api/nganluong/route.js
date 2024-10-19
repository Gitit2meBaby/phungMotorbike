// // pages/api/nganluong.js
// import crypto from 'crypto';
// import axios from 'axios';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { orderId, amount, returnUrl } = req.body;

//     const merchantId = process.env.NGANLUONG_MERCHANT_ID;
//     const merchantPassword = process.env.NGANLUONG_MERCHANT_PASSWORD;
//     const receiverEmail = process.env.NGANLUONG_RECEIVER_EMAIL;

//     // Create a checksum for security (MD5 hash)
//     const securePass = crypto.createHash('md5').update(merchantPassword).digest('hex');
    
//     const params = {
//       merchant_id: merchantId,
//       merchant_password: securePass,
//       receiver: receiverEmail,
//       order_code: orderId,
//       total_amount: amount,
//       currency: 'vnd',
//       return_url: returnUrl,
//       cancel_url: `${req.headers.origin}/cancel`,
//       buyer_fullname: req.body.name,
//       buyer_email: req.body.email,
//       buyer_mobile: req.body.phone
//     };

//     // Generate the payment URL with NganLuong's endpoint
//     try {
//       const paymentResponse = await axios.get('https://sandbox.nganluong.vn:8088/nl30/checkout.api.nganluong.post', { params });
//       const paymentUrl = paymentResponse.data.checkout_url;

//       // Redirect the user to the NganLuong payment page
//       res.status(200).json({ url: paymentUrl });
//     } catch (error) {
//       res.status(500).json({ error: 'Payment failed.' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }
