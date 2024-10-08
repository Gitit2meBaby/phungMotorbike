export const metadata = {
    title: "Scooters and Motorbikes for Rent Across Vietnam | Phung Motorbike",
    description: "Explore Vietnam with our diverse range of scooters and motorbikes available for rent. Experience the beauty of the country with Phung Motorbike's reliable and affordable rentals, perfect for every adventure!",
    canonical: 'https://phungmotorbike.com/motorbikes-rentals-vietnam',
    keywords: 'scooters for rent in Vietnam, motorbikes for rent in Vietnam, scooter rental Vietnam, explore Vietnam by motorbike, all sizes motorbike rental, affordable bike rentals Vietnam',

    // Open Graph (OG) tags for social media
    openGraph: {
        type: 'website',
        title: 'Scooters and Motorbikes for Rent Across Vietnam | Phung Motorbike',
        description: "Explore Vietnam with our diverse range of scooters and motorbikes available for rent. Experience the beauty of the country with Phung Motorbike's reliable and affordable rentals, perfect for every adventure!",
        url: 'https://phungmotorbike.com/motorbikes-rentals-vietnam',
        site_name: 'Phung Motorbike',

        // images: [
        //   {
        //     url: 'https://phungmotorbike.com/images/vietnam-motorbike-rental.jpg', // Replace with an actual image representing Vietnam's landscapes or your rental fleet
        //     width: 1200,
        //     height: 630,
        //     alt: 'Scooters and motorbikes for rent across Vietnam',
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