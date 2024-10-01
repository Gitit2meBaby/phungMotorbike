import { Kanit } from 'next/font/google';
import '../styles/globals.css';
import './global.css';
import Footer from '../components/Footer';
import Header from "../components/Header";
import { Suspense } from 'react';

const kanit = Kanit({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin', 'vietnamese'],
});

export const metadata = {
  title: "Phung Motorbike",
  description: "Phung Motorbike is Hanoi's leading provider of quality motorbikes for rent and sale. Find the best deals on bikes with our wide selection and excellent customer service.",
  icon: './favicon.ico',
  canonical: 'https://phungmotorbike.com',

  // Open Graph (OG) tags for social media
  openGraph: {
    type: 'website',
    title: 'Phung Motorbike',
    description: 'Phung Motorbike is Hanoi\'s leading provider of quality motorbikes for rent and sale. Find the best deals on bikes with our wide selection and excellent customer service.',
    url: 'https://phungmotorbike.com', // Replace with your actual URL
    site_name: 'Phung Motorbike',
    images: [
      {
        url: './favicon.ico',
        width: 100,
        height: 100,
        alt: 'Phung Motorbike - Quality Motorbikes for Rent and Sale',
      },
    ],
  },

  // Twitter Card data
  twitter: {
    card: 'summary_large_image',
    site: '@Phung_Motorbike.', // Replace with your Twitter handle
    title: 'Phung Motorbike',
    description: 'Phung Motorbike is Hanoi\'s leading provider of quality motorbikes for rent and sale. Find the best deals on bikes with our wide selection and excellent customer service.',
    image: '/images/twitter-card.jpg', // Replace with your Twitter card image URL
  },

  // Additional meta tags
  meta: {
    robots: 'index, follow',
    author: 'Phung Motorbike Team',
    keywords: 'motorbikes fo rent, motorbikes for sale, Hanoi Rentals, Hanoi motorbikes for sale, scooter rental Hanoi, Vietnam scooter rental, Vietnam motorbike rental',
    'theme-color': '#e97f26',
  },

  // Structured data (Schema.org) for SEO
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Phung Motorbike',
    url: 'https://phungmotorbike.com',
    logo: '../assets/logo.webp',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+84-123-456-789',
      email: '2wheelsvietnam@gmail.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '13 Ngo Huyện, Hàng Trống, Hoàn Kiếm',
      addressLocality: 'Hà Nội',
      addressCountry: 'VN',
    },
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <Header />
        {children}
        <Suspense>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
