export const metadata = {
    title: "Semi-Automatic Monthly Rentals in Hanoi | Phung Motorbike",
    description: "Rent semi-automatic scooters for long-term use in Hanoi. Enjoy flexible monthly rentals with enough power for the city and easy control for everyday riding.",
    canonical: 'https://phungmotorbike.com/monthly-rentals-hanoi/semi-auto',
    keywords: 'monthly semi-automatic scooter rental, Hanoi long-term rentals, semi-automatic motorbike rental Hanoi, scooter rentals for expats',

    openGraph: {
        type: 'website',
        title: 'Semi-Automatic Monthly Rentals in Hanoi | Phung Motorbike',
        description: "Enjoy a perfect blend of power and ease with our semi-automatic scooter monthly rentals in Hanoi. Designed for long-term use, perfect for city life.",
        url: 'https://phungmotorbike.com/monthly-rentals-hanoi/semi-auto',
        site_name: 'Phung Motorbike',

        // images: [
        //   {
        //     url: 'https://phungmotorbike.com/images/hanoi-semi-auto-monthly.jpg', // Replace with an actual image of a semi-auto scooter
        //     width: 1200,
        //     height: 630,
        //     alt: 'Monthly semi-automatic scooter rental in Hanoi',
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