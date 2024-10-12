export const metadata = {
    title: "Monthly Automatic Scooter Rentals in Hanoi | Phung Motorbike",
    description: "Discover the ease of long-term automatic scooter rentals in Hanoi. Ideal for extended stays, our scooters offer comfort and convenience for daily city commuting.",
    canonical: 'https://phungmotorbike.com/monthly-rentals-hanoi/automatic',
    keywords: 'monthly automatic scooter rental, Hanoi scooter rentals, long-term scooter rental Hanoi, automatic motorbikes Hanoi, expat rentals Hanoi',

    openGraph: {
        type: 'website',
        title: 'Monthly Automatic Scooter Rentals in Hanoi | Phung Motorbike',
        description: "Discover the ease of long-term automatic scooter rentals in Hanoi. Perfect for expats and locals, ride hassle-free with our comfortable and reliable scooters.",
        url: 'https://phungmotorbike.com/monthly-rentals-hanoi/automatic',
        site_name: 'Phung Motorbike',

        // images: [
        //   {
        //     url: 'https://phungmotorbike.com/images/hanoi-monthly-automatic.jpg', // Replace with an actual image of an automatic scooter
        //     width: 1200,
        //     height: 630,
        //     alt: 'Monthly automatic scooter rental in Hanoi',
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