import Filter from '../../components/Filter'
import Sorter from '../../components/Sorter';

import styles from '../../styles/hanoiRentals.module.scss';

export const metadata = {
    title: "Motorbikes and Scooters for Sale in Hanoi | Phung Motorbike",
    description: "Discover a wide selection of motorbikes and scooters for sale in Hanoi, catering to all sizes and budgets. Whether you're looking for a reliable scooter for city commuting or a robust motorcycle for adventure, Phung Motorbike has the perfect ride for you.",
    canonical: 'https://phungmotorbike.com/motorbikes-for-sale',

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

    meta: {
        keywords: 'motorbikes for sale in Hanoi, scooters for sale in Hanoi, buy motorbikes Hanoi, affordable motorbikes, scooters for every budget, motorbike sales Vietnam',
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