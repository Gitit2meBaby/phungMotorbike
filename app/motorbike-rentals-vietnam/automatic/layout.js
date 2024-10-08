export const metadata = {
    title: "Automatic Motorbike Rentals for Travel Across Vietnam | Phung Motorbike",
    description: 'Rent an automatic scooter in Vietnam and unlock the beauty of the country. Affordable rates and easy booking make your adventure seamless. Start your journey with Phung Motorbike!',
    canonical: 'https://phungmotorbike.com/motorbike-rentals-vietnam/automatic',
    keywords: 'automatic motorbike rentals, Vietnam travel rentals, scooter rental Vietnam, travel outside Hanoi, automatic scooters for Vietnam adventures',

    // Open Graph (OG) tags for social media
    openGraph: {
        type: 'website',
        title: 'Automatic Motorbike Rentals Across Vietnam | Phung Motorbike',
        description: 'Rent an automatic scooter in Vietnam and unlock the beauty of the country. Affordable rates and easy booking make your adventure seamless. Start your journey with Phung Motorbike!',
        url: 'https://phungmotorbike.com/motorbike-rentals-vietnam/automatic',
        site_name: 'Phung Motorbike',

        // images: [
        //   {
        //     url: 'https://phungmotorbike.com/images/vietnam-motorbike-rental.jpg', // Replace with an actual image of your rental fleet or a scenic view of Vietnam
        //     width: 1200,
        //     height: 630,
        //     alt: 'Motorbikes for rent in Vietnam',
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