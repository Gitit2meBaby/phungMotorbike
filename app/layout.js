import { Kanit } from 'next/font/google';
import '../styles/globals.css';
import './global.css';
import Footer from '../components/Footer';
import Header from "../components/Header";
import { Suspense } from 'react';
import ScrollBtn from '../components/ScrollBtn';

const kanit = Kanit({
  weight: ['400', '700'],
  subsets: ['latin', 'vietnamese'],
});

export const metadata = {
  title: "Phung Motorbike",
  description: "Phung Motorbike is Hanoi's leading provider of quality motorbikes for rent and sale. Find the best deals on bikes with our wide selection and excellent customer service.",
  icon: './favicon.ico',
  canonical: 'https://phungmotorbike.com',
  robots: 'index, follow',
  author: 'Daniel Thomas',
  keywords: 'motorbikes fo rent, motorbikes for sale, Hanoi Rentals, Hanoi motorbikes for sale, scooter rental Hanoi, Vietnam scooter rental, Vietnam motorbike rental',
  'theme-color': '#e97f26',
  content: "width=device-width, initial-scale=1.0",

  // Open Graph (OG) tags for social media
  openGraph: {
    type: 'website',
    title: 'Phung Motorbike',
    description: 'Phung Motorbike is Hanoi\'s leading provider of quality motorbikes for rent and sale. Find the best deals on bikes with our wide selection and excellent customer service.',
    url: 'https://phungmotorbike.com',
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
    site: '@Phung_Motorbike.',
    title: 'Phung Motorbike',
    description: 'Phung Motorbike is Hanoi\'s leading provider of quality motorbikes for rent and sale. Find the best deals on bikes with our wide selection and excellent customer service.',
    // image: '/images/twitter-card.jpg', 
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
        <Suspense>
          <ScrollBtn />
        </Suspense>
      </body>
    </html>
  );
}
