export const metadata = {
    title: "Manual Motorbike Monthly Rentals in Hanoi | Phung Motorbike",
    description: "Experience Hanoi with long-term manual motorbike rentals. Ideal for those who prefer a more hands-on riding experience with monthly packages for city commuting.",
    canonical: 'https://phungmotorbike.com/monthly-rentals-hanoi/manual',
    keywords: 'monthly manual motorbike rental, Hanoi manual motorbike rentals, long-term motorbike rental Hanoi, manual motorbike for city travel',

    openGraph: {
        type: 'website',
        title: 'Manual Motorbike Monthly Rentals in Hanoi | Phung Motorbike',
        description: "Rent manual motorbikes for long-term use in Hanoi. Designed for experienced riders who want a more engaged and authentic riding experience.",
        url: 'https://phungmotorbike.com/monthly-rentals-hanoi/manual',
        site_name: 'Phung Motorbike',

        // images: [
        //   {
        //     url: 'https://phungmotorbike.com/images/hanoi-manual-monthly.jpg', // Replace with an actual image of a manual motorbike
        //     width: 1200,
        //     height: 630,
        //     alt: 'Monthly manual motorbike rental in Hanoi',
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