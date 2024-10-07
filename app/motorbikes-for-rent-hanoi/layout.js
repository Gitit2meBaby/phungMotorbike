import Filter from '../../components/Filter'
import Sorter from '../../components/Sorter';

import styles from '../../styles/hanoiRentals.module.scss';

export const metadata = {
    title: "Motorbikes for Rent in Hanoi | Phung Motorbike",
    description: "Browse our wide selection of quality motorbikes available for rent in Hanoi. From scooters to motorcycles, find the perfect bike for your inner-city travel needs at one of Hanoi's most trusted brands. Phung Motorbike.",
    canonical: 'https://phungmotorbike.com/motorbikes-for-rent-hanoi',

    // Open Graph (OG) tags for social media
    openGraph: {
        type: 'website',
        title: 'Motorbikes for Rent in Hanoi | Phung Motorbike',
        description: 'Explore our diverse range of motorbikes available for rent in Hanoi. Perfect for inner-city travel, our fleet offers convenience and quality at competitive prices.',
        url: 'https://phungmotorbike.com/motorbikes-for-rent-hanoi',
        site_name: 'Phung Motorbike',

        // images: [
        //   {
        //     url: 'https://phungmotorbike.com/images/hanoi-motorbike-rental.jpg', // Replace with an actual image of your rental fleet or a Hanoi street scene
        //     width: 1200,
        //     height: 630,
        //     alt: 'Motorbikes for rent in Hanoi',
        //   },
        // ],
    },

    meta: {
        keywords: 'motorbikes for rent, Hanoi rentals, scooter rental Hanoi, Vietnam scooter rental, inner-city travel Hanoi, motorbike rental Vietnam',
    },
};

export default function RootLayout({ children }) {
    return (
        <section>
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <h1>Inner City Rentals</h1>
                <p>Explore Hanoi's vibrant city center with ease on one of our reliable inner city rental motorbikes. Our fleet is designed for convenient urban travel, with a maximum daily mileage of 50 kilometers.</p>
                <p>Enjoy the freedom and flexibility of exploring the city at your own pace. Each rental includes essential accessories like helmets, a convenient rack, a phone holder, and secure rubber straps. We'll also provide you with valuable information and tips on must-see destinations and local attractions.</p>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <Filter slug="/motorbikes-for-rent-hanoi" />
            <Sorter />
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            {children}
        </section>
    );
}