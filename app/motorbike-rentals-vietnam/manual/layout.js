export const metadata = {
    title: "Rent Manual Motorbikes in Hanoi | Phung Motorbike",
    description: "Rent modern or classic manual motorbikes in Hanoi for an authentic local experience. Explore breathtaking landscapes and immerse yourself in local culture.",
    canonical: 'https://phungmotorbike.com/motorbike-rentals-vietnam/manual',
    keywords: 'manual motorbikes for rent, Hanoi rentals, motorbike rental Hanoi, explore Hanoi on motorbikes, authentic Hanoi experience',

    // Open Graph (OG) tags for social media
    openGraph: {
        type: 'website',
        title: "Rent Manual Motorbikes in Hanoi | Phung Motorbike",
        description: "Rent modern or classic manual motorbikes in Hanoi for an authentic local experience. Explore breathtaking landscapes and immerse yourself in local culture.",
        url: 'https://phungmotorbike.com/motorbike-rentals-vietnam/manual',
        site_name: 'Phung Motorbike',

        // images: [ // Update with an image of manual motorbikes
        //   {
        //     url: 'https://phungmotorbike.com/images/hanoi-manual-motorbike-rental.jpg', // Replace with actual image
        //     width: 1200,
        //     height: 630,
        //     alt: 'Manual motorbikes for rent in Hanoi',
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