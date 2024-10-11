import { ServerClient } from 'postmark';

// Initialize the Postmark client
const client = new ServerClient(process.env.POSTMARK_API_TOKEN);

export async function POST(req) {
    try {
        const {
            name, email, phone, honeypot,
            bike, rentalType, startDate, endDate,
            days, roundedTotalPrice
        } = await req.json();

        console.log('Received Data:', { name, email, phone, bike, rentalType, startDate, endDate, days, roundedTotalPrice });

        if (honeypot) {
            return new Response(JSON.stringify({ error: 'Bot submission detected' }), { status: 400 });
        }

        // Ensure bike exists
        if (!bike || !bike.name || !bike.model) {
            console.error('Bike information is missing or incomplete', bike);
            return new Response(JSON.stringify({ error: 'Bike information is missing or incomplete' }), { status: 400 });
        }

        const emailHtmlBody = `
            <h3>New Booking Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Bike:</strong> ${bike.name} (${bike.model})</p>
            <p><strong>Rental Type:</strong> ${rentalType}</p>
            <p><strong>Start Date:</strong> ${startDate}</p>
            <p><strong>End Date:</strong> ${endDate}</p>
            <p><strong>Total Days:</strong> ${days}</p>
            <p><strong>Total Price:</strong> $${roundedTotalPrice}</p>
            <p><strong>Paid:</strong> No</p>
        `;

        const emailTextBody = `New Booking Information:
        - Name: ${name}
        - Email: ${email}
        - Phone: ${phone}
        - Bike: ${bike.name} (${bike.model})
        - Rental Type: ${rentalType}
        - Start Date: ${startDate}
        - End Date: ${endDate}
        - Total Days: ${days}
        - Total Price: $${roundedTotalPrice}
        - Paid: No`;

        // Sending the email to the admin
        await client.sendEmail({
            From: process.env.FROM_EMAIL,
            To: process.env.TO_EMAIL,
            Subject: 'New Bike Rental Booking',
            HtmlBody: emailHtmlBody,
            TextBody: emailTextBody,
            MessageStream: 'outbound',
        });

        // Sending confirmation email to the user
        const userEmailHtmlBody = `
            <h3>Your Booking is Confirmed!</h3>
            <p>Hi ${name},</p>
            <p>Thank you for your booking. Below are the details of your rental:</p>
            <p><strong>Bike:</strong> ${bike.name} (${bike.model})</p>
            <p><strong>Rental Type:</strong> ${rentalType}</p>
            <p><strong>Start Date:</strong> ${startDate}</p>
            <p><strong>End Date:</strong> ${endDate}</p>
            <p><strong>Total Days:</strong> ${days}</p>
            <p><strong>Total Price:</strong> $${roundedTotalPrice}</p>
            <p><strong>Payment:</strong> Pay on arrival</p>
            <p>We look forward to seeing you soon!</p>
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>Sincerely,</p>
            <p>Mr Phung</p>
        `;

        const userEmailTextBody = `Your Booking is Confirmed!
        Hi ${name},

        Thank you for your booking. Below are the details of your rental:
        - Bike: ${bike.name} (${bike.model})
        - Rental Type: ${rentalType}
        - Start Date: ${startDate}
        - End Date: ${endDate}
        - Total Days: ${days}
        - Total Price: $${roundedTotalPrice}
        - Payment: Pay on arrival

        We look forward to seeing you soon!
        If you have any questions, feel free to reply to this email.

        Sincerely,
        Mr Phung`;

        // Send the confirmation email to the user
        await client.sendEmail({
            From: process.env.FROM_EMAIL,
            To: email,  // Send to the user's email
            Subject: 'Your Bike Rental Booking is Confirmed',
            HtmlBody: userEmailHtmlBody,
            TextBody: userEmailTextBody,
            MessageStream: 'outbound',
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
        console.error('Failed to send email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
}
