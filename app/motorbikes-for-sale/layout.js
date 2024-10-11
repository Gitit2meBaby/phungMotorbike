export const metadata = {
    title: "Motorbikes and Scooters for Sale in Hanoi | Phung Motorbike",
    description: "Discover a wide selection of motorbikes and scooters for sale in Hanoi, catering to all sizes and budgets. Whether you're looking for a reliable scooter for city commuting or a robust motorcycle for adventure, Phung Motorbike has the perfect ride for you.",
    canonical: 'https://phungmotorbike.com/motorbikes-for-sale',
    keywords: 'motorbikes for sale in Hanoi, scooters for sale in Hanoi, buy motorbikes Hanoi, affordable motorbikes, scooters for every budget, motorbike sales Vietnam',

    // Open Graph (OG) tags for social media
    openGraph: {
        type: 'website',
        title: 'Motorbikes and Scooters for Sale in Hanoi | Phung Motorbike',
        description: "Explore our diverse range of motorbikes and scooters for sale in Hanoi. Perfect for every need and budget, Phung Motorbike is your trusted partner for finding the ideal bike.",
        url: 'https://phungmotorbike.com/motorbikes-for-sale',
        site_name: 'Phung Motorbike',

        // images: [
        //   {
        //     url: 'https://phungmotorbike.com/images/hanoi-motorbike-sale.jpg', // Replace with an actual image of your bikes for sale or a Hanoi street scene
        //     width: 1200,
        //     height: 630,
        //     alt: 'Motorbikes and scooters for sale in Hanoi',
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