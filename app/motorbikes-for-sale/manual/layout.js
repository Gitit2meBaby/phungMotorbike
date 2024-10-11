export const metadata = {
    title: "Manual Scooters for Sale in Hanoi | Phung Motorbike",
    description: "Browse our selection of manual scooters for sale in Hanoi. Perfect for riders who appreciate the traditional riding experience, our scooters combine style, performance, and affordability.",
    canonical: 'https://phungmotorbike.com/motorbikes-for-sale/manual',
    keywords: 'manual scooters for sale, Hanoi scooter sales, buy manual scooters, quality manual scooters Hanoi, affordable manual scooters, scooters in Vietnam',

    // Open Graph (OG) tags for social media
    openGraph: {
        type: 'website',
        title: "Manual Scooters for Sale in Hanoi | Phung Motorbike",
        description: "Discover high-quality manual scooters for sale in Hanoi. Designed for the classic riding experience, Phung Motorbike offers a range of reliable options to suit your needs.",
        url: 'https://phungmotorbike.com/motorbikes-for-sale/manual',
        site_name: 'Phung Motorbike',

        // images: [
        //   {
        //     url: 'https://phungmotorbike.com/images/manual-scooter-hanoi.jpg', // Replace with an actual image of your manual scooters for sale
        //     width: 1200,
        //     height: 630,
        //     alt: 'Manual scooters for sale in Hanoi',
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