import Filter from '../../components/Filter'
import Sorter from '../../components/Sorter';

import styles from '../../styles/hanoiRentals.module.scss';

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
        <section>
            <Filter slug="/motorbikes-rentals-vietnam" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <h1>Motorbikes for Travelling</h1>
                <p>Embark on your next adventure with our reliable motorbikes designed for long-distance travel. Unlike inner city rentals, there's no limit to the number of kilometers you can cover in a day, allowing you to explore Vietnam at your own pace.</p>
                <p>Our travel bikes come equipped with all the essentials to make your journey comfortable and stress-free. Each rental includes helmets, a sturdy rack for your belongings, a phone holder for navigation, and secure rubber straps. You'll also receive insider tips on the best routes, must-visit destinations, and local attractions across Vietnam.</p>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <Sorter />
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            {children}
        </section>
    );
}