export const metadata = {
    title: "Rent Manual Motorbikes in Hanoi | Phung Motorbike",
    description: "Rent modern or classic manual motorbikes in Hanoi for an authentic local experience. Explore Hanoi's hidden gems and feel the wind in your hair.",
    canonical: 'https://phungmotorbike.com/motorbikes-for-rent-hanoi/manual',

    // Open Graph (OG) tags for social media
    openGraph: {
        type: 'website',
        title: "Rent Manual Motorbikes in Hanoi | Phung Motorbike",
        description: "Rent modern or classic manual motorbikes in Hanoi for an authentic local experience. Explore Hanoi's hidden gems and feel the wind in your hair.",
        url: 'https://phungmotorbike.com/motorbikes-for-rent-hanoi/manual',
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

    meta: {
        keywords: 'manual motorbikes for rent, Hanoi rentals, motorbike rental Hanoi, explore Hanoi on motorbikes, authentic Hanoi experience',
    },
};

export default function RootLayout({ children }) {
    return (
        <section>
            {children}
        </section>
    );
}