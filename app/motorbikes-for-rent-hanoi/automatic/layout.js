export const metadata = {
    title: "Automatic scooters for Rent in Hanoi | Phung Motorbike",
    description: 'Explore our fleet of automatic scooters available for rent in Hanoi. Perfect for inner-city travel, quality vehicles at competitive prices.',
    canonical: 'https://phungmotorbike.com/motorbikes-for-rent-hanoi/automatic',
    keywords: 'automatic scooters for rent, Hanoi rentals, scooter rental Hanoi, inner-city travel Hanoi, automatic scooters in Hanoi',

    // Open Graph (OG) tags for social media
    openGraph: {
        type: 'website',
        title: 'Automatic scooters for Rent in Hanoi | Phung Motorbike',
        description: 'Explore our fleet of automatic scooters available for rent in Hanoi. Perfect for inner-city travel, quality vehicles at competitive prices.',
        url: 'https://phungmotorbike.com/motorbikes-for-rent-hanoi/automatic',
        site_name: 'Phung Motorbike',

        // images: [
        //   {
        //     url: 'https://phungmotorbike.com/images/hanoi-motorbike-rental.jpg', // Replace with an actual image of your rental fleet or a Hanoi street scene
        //     width: 1200,
        //     height: 630,
        //     alt: 'Motorbikes for rent in Hanoi',
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