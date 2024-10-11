export const metadata = {
    title: "Automatic scooters for Sale in Hanoi | Phung Motorbike",
    description: 'Shop the best automatic scooters for sale in Hanoi. Enjoy competitive prices and a variety of models at our well established and trusted local business.',
    canonical: 'https://phungmotorbike.com/motorbikes-for-sale/automatic',
    keywords: 'automatic scooters for rent, Hanoi rentals, scooter rental Hanoi, inner-city travel Hanoi, automatic scooters in Hanoi',

    // Open Graph (OG) tags for social media
    openGraph: {
        type: 'website',
        title: 'Automatic scooters for Sale in Hanoi | Phung Motorbike',
        description: 'Shop the best automatic scooters for sale in Hanoi. Enjoy competitive prices and a variety of models at our well established and trusted local business.',
        url: 'https://phungmotorbike.com/motorbikes-for-sale/automatic',
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
        <>
            {children}
        </>
    );
}