import { ServerClient } from 'postmark';

const client = new ServerClient(process.env.POSTMARK_API_TOKEN);

export async function POST(req) {
    try {
        const { name, email, phone, message, honeypot } = await req.json();

        if (honeypot) {
            return new Response(JSON.stringify({ error: 'Bot submission detected' }), { status: 400 });
        }

        const emailContent = `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
        `;

        await client.sendEmail({
            From: process.env.FROM_EMAIL,
            To: process.env.TO_EMAIL,
            Subject: 'New Contact Form Submission',
            HtmlBody: emailContent,
            TextBody: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
            MessageStream: 'outbound'
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Failed to send email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
}
