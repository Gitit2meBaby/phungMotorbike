export const metadata = {
    title: "Semi-Automatic Scooters for Sale in Hanoi | Phung Motorbike",
    description: "Explore our collection of semi-automatic scooters for sale in Hanoi. Perfect for both new riders and seasoned bikers, our scooters offer a blend of comfort and convenience at competitive prices.",
    canonical: 'https://phungmotorbike.com/motorbikes-for-sale/semi-auto',
    keywords: 'semi-automatic scooters for sale, Hanoi scooter sales, buy semi-automatic scooters, quality scooters Hanoi, affordable scooters for sale, scooters in Vietnam',

    // Open Graph (OG) tags for social media
    openGraph: {
        type: 'website',
        title: "Semi-Automatic Scooters for Sale in Hanoi | Phung Motorbike",
        description: "Discover high-quality semi-automatic scooters for sale in Hanoi. Ideal for navigating the city streets, Phung Motorbike provides reliable options that fit your lifestyle.",
        url: 'https://phungmotorbike.com/motorbikes-for-sale/semi-auto',
        site_name: 'Phung Motorbike',

        // images: [
        //   {
        //     url: 'https://phungmotorbike.com/images/semi-automatic-scooter-hanoi.jpg', // Replace with an actual image of your semi-automatic scooters for sale
        //     width: 1200,
        //     height: 630,
        //     alt: 'Semi-automatic scooters for sale in Hanoi',
        //   },
        // ],
    },
};


export default function RootLayout({ children }) {
    return (
        <section>
            {children}
        </section>
    );
}