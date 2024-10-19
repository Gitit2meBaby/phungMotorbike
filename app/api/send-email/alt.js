// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req) {
//     try {
//         const {
//             name, email, phone, message, honeypot
//         } = await req.json();

//         if (honeypot) {
//             return new Response(JSON.stringify({ error: 'Bot submission detected' }), { status: 400 });
//         }

//         const emailContent = `
//             <h3>New Contact Form Submission</h3>
//             <p><strong>Name:</strong> ${name}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Phone:</strong> ${phone}</p>
//             <p><strong>Message:</strong> ${message}</p>
//         `;

//         // Sending the email to the admin
//         await resend.emails.send({
//             from: process.env.FROM_EMAIL,
//             to: process.env.TO_EMAIL,
//             subject: 'New Motorbike Purchase',
//             html: emailContent,
//             text: emailContent
//         });

//         return new Response(JSON.stringify({ success: true }), { status: 200 });

//     } catch (error) {
//         console.error('Failed to send email:', error);
//         return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
//     }
// }
