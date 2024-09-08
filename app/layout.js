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
  description: "Phung Motorbike is Hanoi's leading provider of quality motrobikes for rent and sale",
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
