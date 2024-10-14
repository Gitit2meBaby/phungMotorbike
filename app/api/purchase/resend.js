import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const {
            name, email, phone, honeypot,
            bike, totalPrice
        } = await req.json();

        if (honeypot) {
            return new Response(JSON.stringify({ error: 'Bot submission detected' }), { status: 400 });
        }

        // Ensure bike exists
        if (!bike || !bike.name || !bike.model) {
            console.error('Bike information is missing or incomplete', bike);
            return new Response(JSON.stringify({ error: 'Bike information is missing or incomplete' }), { status: 400 });
        }

        const emailHtmlBody = `
            <h3>New Motorbike Purchase</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Bike:</strong> ${bike.name} (${bike.model})</p>
            <p><strong>Total Price:</strong> $${totalPrice}</p>
            <p><strong>Paid:</strong> No</p>
        `;

        const emailTextBody = `New Booking Information:
        - Name: ${name}
        - Email: ${email}
        - Phone: ${phone}
        - Bike: ${bike.name} (${bike.model})
        - Total Price: $${totalPrice}
        - Paid: No`;

        // Sending the email to the admin
        await resend.emails.send({
            from: process.env.FROM_EMAIL,
            to: process.env.TO_EMAIL,
            subject: 'New Motorbike Purchase',
            html: emailHtmlBody,
            text: emailTextBody
        });

        // Sending confirmation email to the user
        const userEmailHtmlBody = `
     <h3>Your Purchase is Confirmed!</h3>
     <p>Hi ${name},</p>
     <p>Thank you for choosing to purchase your motorbike with us. Below are the details we have recieved:</p>
     <p><strong>Bike:</strong> ${bike.name} (${bike.model})</p>
     <p><strong>Total Price:</strong> $${totalPrice} USD</p>
     <p><strong>Payment:</strong> Pay on arrival</p>
     <p>We look forward to seeing you soon!</p>
     <p>If you have any questions, feel free to reply to this email.</p>
     <p>Sincerely,</p>
     <p>Mr Phung</p>
 `;

        const userEmailTextBody = `Your Purchase is Confirmed!
 Hi ${name},

 Thank you for choosing to purchase your motorbike with us. Below are the details we have recieved:
 - Bike: ${bike.name} (${bike.model})
 - Total Price: $${totalPrice} USD
 - Payment: Pay on arrival

 We look forward to seeing you soon!
 If you have any questions, feel free to reply to this email.

 Sincerely,
 Mr Phung`;

        // Send the confirmation email to the user
        await resend.emails.send({
            from: process.env.FROM_EMAIL,
            to: email,  // Send to the user's email
            subject: 'Your Bike Rental Booking is Confirmed',
            html: userEmailHtmlBody,
            text: userEmailTextBody
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
        console.error('Failed to send email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
}
