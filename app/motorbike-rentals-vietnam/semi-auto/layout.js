export const metadata = {
    title: "Rent Semi-Automatic Scooters in Hanoi | Phung Motorbike",
    description: 'Rent high-quality, semi-automatic scooters in Hanoi for a convenient and affordable way to explore the city. Perfect for beginners and experienced riders alike.',
    canonical: 'https://phungmotorbike.com/motorbike-rentals-vietnam/semi-auto',
    keywords: 'semi-automatic scooters for rent, Hanoi rentals, scooter rental Hanoi, explore Hanoi on scooters, beginner friendly motorbikes Hanoi',

    // Open Graph (OG) tags for social media
    openGraph: {
        type: 'website',
        title: "Rent Semi-Automatic Scooters in Hanoi | Phung Motorbike",
        description: 'Rent high-quality, semi-automatic scooters in Hanoi for a convenient and affordable way to explore the city. Perfect for beginners and experienced riders alike.',
        url: 'https://phungmotorbike.com/motorbike-rentals-vietnam/semi-auto',
        site_name: 'Phung Motorbike',

        // images: [ // Update with an image of semi-automatic scooters
        //   {
        //     url: 'https://phungmotorbike.com/images/hanoi-semi-automatic-rental.jpg', // Replace with actual image
        //     width: 1200,
        //     height: 630,
        //     alt: 'Semi-automatic motorbikes for rent in Hanoi',
        //   },
        // ],
    },
};

export default function RootLayout({ children }) {
    return (
        <>
            {children}
        </>
    );
}