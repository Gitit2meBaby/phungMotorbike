import React from 'react'
import styles from '../../styles/repairPage.module.css'
import Image from 'next/image'

import repairShop340 from '../../public/repairShop340.webp'
import repairShop700 from '../../public/repairShop700.webp'
import wheelFix from '../../public/wheelFix.webp'
import mother340 from '../../public/mother340.webp'

const repairSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Phung Motorbike",
    "description": "Phung Motorbike provides professional motorbike repair services in Hanoi, including engine diagnostics, tyre repairs, oil changes, and general maintenance.",
    "url": "https://phungmotorbike.com/repairs",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "99 Bac Cau Street, Long Bien",
        "addressLocality": "Hanoi",
        "addressCountry": "VN"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+84 904 2534 91",
        "contactType": "Customer Service",
        "availableLanguage": ["English", "Vietnamese"]
    },
    "areaServed": {
        "@type": "Place",
        "name": "Hanoi"
    },
    "openingHours": "Mo-Sa 08:00-18:00",
    "priceRange": "$$",
    "serviceType": [
        "Engine diagnostics",
        "Tyre repair",
        "Brake repair",
        "Oil change",
        "Battery replacement"
    ],
    "sameAs": [
        "https://facebook.com/phungmotorbike",
        "https://wa.me/84904253491"
    ]
}

const page = () => {
    return (
        <main className={styles.repairPage}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(repairSchema) }}
            />
            <h1>Motorbike Repair Service</h1>

            <div className={styles.deskContent}>
                <div className={styles.imgWrapper}>
                    <Image className={styles.deskImg} src={repairShop700} width={700} height={394} alt='Phung Motorbikes in Hanoi' priority></Image>
                </div>
                <div>
                    <p>
                        At Phung Motorbike in Hanoi, we take pride in offering professional and reliable motorbike repair services, ensuring your bike is in top condition for the bustling streets of Vietnam. Whether you're a daily commuter or a traveller exploring the country, keeping your motorbike in optimal shape is essential, and that's where we come in.</p>

                    <Image className={styles.mobImg} src={repairShop340} width={340} height={191} alt='Phung Motorbikes in Hanoi' priority></Image>

                    <h2>Comprehensive Motorbike Check-Up & Repair</h2>
                    <p>
                        Our repair process starts with a thorough inspection and a test drive to assess your bike&apos;s condition. Based on the test results, we&apos;ll provide you with a detailed breakdown of any necessary repairs, along with a transparent cost estimate. Only when you&apos;re comfortable with the proposed plan and cost will we proceed with the work.
                    </p>
                </div>
            </div>

            <div className={styles.deskContent}>
                <div className={styles.listItems}>
                    <h3>
                        Some of the common repairs and maintenance services we offer include:
                    </h3>

                    <ul>
                        <li>
                            Engine diagnostics and tuning to keep your bike running smoothly.
                        </li>
                        <li>Oil changes, using high-quality motorbike oil to protect your engine.</li>
                        <li>Brake system checks and repairs, ensuring your bike&apos;s safety on the road.</li>
                        <li>Tyre repair and replacement, including puncture fixes and tyre balancing.</li>
                        <li>Battery inspection and replacement, for reliable starting power.</li>
                        <li>Chain and sprocket adjustments or replacements, for efficient power transfer.</li>
                        <li>Suspension maintenance and shock absorber replacement, for a smoother ride.</li>
                    </ul>
                </div>
                <div className={styles.imgWrapper}>
                    <Image className={styles.normImg} src={wheelFix} alt='service and repairs performed at Phung motorbike' width={340} height={453}></Image>
                </div>
            </div>

            <div className={styles.deskContent}>
                <div className={styles.imgWrapper}>
                    <Image className={styles.deskImg} src={mother340} width={588} height={414} alt='Phung Motorbikes - Mother Phungerr!'></Image>
                </div>
                <div>
                    <h2>Specialized Services & Advanced Repairs</h2>
                    <p>
                        For more complex repairs, such as engine rebuilds or frame alignment, we recommend scheduling an appointment in advance. These services are handled at our fully-equipped workshop located at 99 Bac Cau Street, Long Bien, where we have specialized tools and a skilled team ready to tackle any challenging issues.</p>

                    <p>
                        If you have a specific request or are dealing with a complex issue, it’s best to contact us ahead of time. You can reach us via Facebook or WhatsApp (+84 904 2534 91) to discuss your needs before visiting the shop. This ensures we can prepare the necessary tools and parts for your repair, saving you time and hassle.</p>

                    <h2>Why Choose Phung Motorbike?</h2>
                    <p>
                        Experienced Technicians: Our team has years of experience in repairing and maintaining all types of motorbikes, from local brands to high-end imports.
                        Affordable & Transparent Pricing: We believe in offering fair, competitive pricing without any hidden fees. You&apos;ll always know what you&apos;re paying for before we start any work.
                        Convenient Location: Centrally located in Hanoi, we&apos;re easy to find and ready to help you with all your motorbike needs.
                        Customer-Focused Service: Your satisfaction is our top priority. We&apos;ll explain the work in detail and ensure you feel confident in your bike&apos;s repair.
                        Whether you need a quick oil change, a tyre repair, or a more in-depth overhaul, Phung Motorbike is here to ensure your bike runs at its best. Drop by for a general check-up or contact us directly to discuss any specific issues.</p>
                </div>

                <Image className={styles.mobImg} src={mother340} width={340} height={239} alt='Phung Motorbikes - Mother Phungerr!'></Image>
            </div>
        </main>
    )
}

export default page