import Filter from '../../components/Filter'
import Sorter from '../../components/Sorter';

import styles from '../../styles/hanoiRentals.module.scss';

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
        <section>
            <Filter slug="/motorbikes-for-sale" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <h1>Motorbikes for Sale</h1>
                <p>Looking to own a motorbike in Vietnam? All our motorbikes for sale come with an official blue card, ensuring smooth ownership transfer and peace of mind. Each bike undergoes a thorough check by our experienced staff to ensure top performance.</p>
                <p>Before handing over the keys, we provide a full service, ensuring your bike is in perfect condition for the road ahead. Whether you're staying long-term or just want the freedom of owning your own ride, we offer a variety of reliable bikes to suit your needs.</p>
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