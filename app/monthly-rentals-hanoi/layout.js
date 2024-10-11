export const metadata = {
    title: "Monthly Motorbike Rentals in Hanoi | Phung Motorbike",
    description: "Explore our range of motorbikes for long-term rental in Hanoi. Whether you prefer automatic, semi-automatic, or manual bikes, our monthly packages are perfect for both expats and locals looking for affordable, quality transportation in the city.",
    canonical: 'https://phungmotorbike.com/monthly-rentals-hanoi',
    keywords: 'monthly motorbike rentals, Hanoi motorbike rentals, long-term scooter rental Hanoi, monthly bike rentals, expat bike rental Hanoi, affordable motorbikes Hanoi',

    openGraph: {
        type: 'website',
        title: "Monthly Motorbike Rentals in Hanoi | Phung Motorbike",
        description: "Find the perfect motorbike for your long-term stay in Hanoi. From scooters to manual motorbikes, our monthly rentals offer convenience and quality at competitive prices.",
        url: 'https://phungmotorbike.com/monthly-rentals-hanoi',
        site_name: 'Phung Motorbike',

        // images: [
        //   {
        //     url: 'https://phungmotorbike.com/images/monthly-motorbike-rental-hanoi.jpg', // Replace with an actual image of your monthly rental fleet
        //     width: 1200,
        //     height: 630,
        //     alt: 'Monthly motorbike rentals in Hanoi',
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