export const metadata = {
    title: "Motorbikes for Rent in Hanoi | Phung Motorbike",
    description: "Browse our wide selection of quality motorbikes available for rent in Hanoi. From scooters to motorcycles, find the perfect bike for your inner-city travel needs at one of Hanoi's most trusted brands. Phung Motorbike.",
    canonical: 'https://phungmotorbike.com/motorbikes-for-rent-hanoi',
    keywords: 'motorbikes for rent, Hanoi rentals, scooter rental Hanoi, Vietnam scooter rental, inner-city travel Hanoi, motorbike rental Vietnam',

    // Open Graph (OG) tags for social media
    openGraph: {
        type: 'website',
        title: 'Motorbikes for Rent in Hanoi | Phung Motorbike',
        description: 'Explore our diverse range of motorbikes available for rent in Hanoi. Perfect for inner-city travel, our fleet offers convenience and quality at competitive prices.',
        url: 'https://phungmotorbike.com/motorbikes-for-rent-hanoi',
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