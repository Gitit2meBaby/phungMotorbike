import { ServerClient } from 'postmark';

const client = new ServerClient(process.env.POSTMARK_API_TOKEN);

export default async function handler(req, res) {
    console.log('Handling form submission...');
    console.log('Form Data:', req.body);

    if (req.method === 'POST') {
        const { name, email, phone, message, honeypot } = req.body;

        // Check if honeypot field is filled
        if (honeypot) {
            return res.status(400).json({ error: 'Bot submission detected' });
        }

        const emailContent = `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
        `;

        try {
            await client.sendEmail({
                From: process.env.FROM_EMAIL,
                To: email,
                Subject: 'New Contact Form Submission',
                HtmlBody: emailContent,
                TextBody: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
                MessageStream: 'outbound'
            });
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Failed to send email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    console.log('Postmark API Token:', process.env.POSTMARK_API_TOKEN);
    console.log('From Email:', process.env.FROM_EMAIL);
}