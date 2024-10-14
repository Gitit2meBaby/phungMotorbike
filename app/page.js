import { Suspense } from "react";
import Cards from "../components/Cards";
import ForSale from "../components/ForSale";
import Hero from "../components/Hero";
import InfoCard from "../components/InfoCard";
import Repair from "../components/Repair";
import SliderSection from "../components/SliderSection";

import styles from "../styles/home.module.css";

// Structured data (Schema.org) for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Phung Motorbike',
  url: 'https://phungmotorbike.com',
  logo: 'https://phungmotorbike.com/icon.jpg',
  description: 'Phung Motorbike offers motorbike and scooter rentals and sales in Hanoi, Vietnam. Reliable, affordable, and perfect for travelers and locals.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '+84-904-253-491',
    email: '2wheelsvietnam@gmail.com',
    availableLanguage: ['English', 'Vietnamese'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '13 Ngo Huyện, Hàng Trống, Hoàn Kiếm',
    addressLocality: 'Hà Nội',
    postalCode: '100000',
    addressCountry: 'VN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '08:30',
      closes: '18:00',
    }
  ],
  sameAs: [
    'https://www.facebook.com/PhungMotorbike',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Motorbike Rentals and Sales',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Motorbike Rental',
          description: 'Rent motorbikes and scooters to explore Hanoi and beyond. Affordable daily, weekly, and monthly rates.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Motorbike Sales',
          description: 'Quality motorbikes and scooters for sale, perfect for long-term travelers or locals looking to buy.',
        },
      }
    ],
  },
};


export default function Home() {
  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />

      <div className={styles.home}>
        <SliderSection />
        <div className={styles.hero2}>
          <h1>Phung Motorbike</h1>
          <h2 style={{ fontSize: "2rem", lineHeight: "2.2rem", textAlign: "center", color: '#e97f26', letterSpacing: '1px', padding: '0 1rem', marginBottom: '0rem' }}>Hanoi&apos;s Leading provider of quality motorbikes</h2>
          <InfoCard />
        </div>
      </div>

      <Suspense>
        <Cards />
      </Suspense>

      <div className={styles.deskGrid}>
        <Suspense>
          <ForSale />
        </Suspense>
        <Suspense>
          <Repair />
        </Suspense>
      </div>
    </main>
  );
}
