'use client'
import React, { useState } from 'react';
import styles from '../styles/footer.module.css'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        honeypot: '' // Honeypot field
    });

    const [messageSent, setMessageSent] = useState(false);
    const [displayName, setDisplayName] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If honeypot field is filled, it's likely a bot
        if (formData.honeypot) {
            console.log('Bot submission detected');
            return;
        }

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setDisplayName(formData.name);
                setMessageSent(true);
                setFormData({ name: '', email: '', phone: '', message: '', honeypot: '' });
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <section className={styles.form} id='contactForm'>
            <h4>Contact Us</h4>
            {!messageSent ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder='Ask us anything! We will get back to you ASAP!'
                            required
                        />
                    </div>
                    {/* Honeypot field - hidden from users but visible to bots */}
                    <input
                        type="text"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleChange}
                        style={{ display: 'none' }}
                        tabIndex="-1"
                        autoComplete="off"
                    />
                    <button className={styles.btn} type="submit">Submit</button>
                </form>

            ) : (
                <p style={{ textAlign: 'center', color: '#ebebeb', letterSpacing: '1px', marginTop: '3rem', padding: '0 2rem' }}>Thanks {displayName} for your message! We will get back to you as soon as possible.</p>
            )}
        </section>
    );
};

export default ContactForm;