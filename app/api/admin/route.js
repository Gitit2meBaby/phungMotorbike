import { ServerClient } from 'postmark';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

const client = new ServerClient(process.env.POSTMARK_API_TOKEN);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.uploadDir = "./public/uploads";
        form.keepExtensions = true;

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                return res.status(500).json({ error: 'Error parsing form' });
            }

            const { model, name, price, capacity, offer, description, honeypot } = fields;

            // Check honeypot
            if (honeypot) {
                return res.status(400).json({ error: 'Bot submission detected' });
            }

            // Prepare email content
            let emailContent = `
                <h2>New Motorbike Listing Submission</h2>
                <p><strong>Model:</strong> ${model}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Price:</strong> ${price}</p>
                <p><strong>Capacity:</strong> ${capacity}</p>
                <p><strong>Offer:</strong> ${offer}</p>
                <p><strong>Description:</strong> ${description}</p>
                <h3>Uploaded Images:</h3>
            `;

            // Handle uploaded files
            const uploadedFiles = [];
            Object.keys(files).forEach(key => {
                const file = files[key];
                const newPath = `${form.uploadDir}/${file.newFilename}`;
                fs.renameSync(file.filepath, newPath);
                uploadedFiles.push(newPath);
                emailContent += `<p>${file.originalFilename} - ${newPath}</p>`;
            });

            try {
                // Send email
                await client.sendEmail({
                    From: process.env.FROM_EMAIL,
                    To: process.env.TO_EMAIL,
                    Subject: 'New Motorbike Listing Submission',
                    HtmlBody: emailContent,
                    MessageStream: 'outbound'
                });

                res.status(200).json({ success: true, uploadedFiles });
            } catch (error) {
                console.error('Failed to send email:', error);
                res.status(500).json({ error: 'Failed to send email' });
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}