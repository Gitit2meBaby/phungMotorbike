import Filter from '../../components/Filter'

import styles from '../../styles/hanoiRentals.module.scss';
import BikeList from "../../components/BikeList";
import Image from 'next/image';

import camera from '../../public/camera.png';
import hanoi from '../../public/hanoi.webp';

const Hanoi = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const response = await fetch(`${baseUrl}/api/bikes`, {
        next: { revalidate: 3600 } // Revalidate every hour
    });
    const bikes = await response.json();

    const basePath = '/monthly-rentals-hanoi';

    return (
        <section>
            <Filter slug="/monthly-rentals-hanoi" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="Hanoi" width={300} height={300} />
                <h1>Monthly Rentals</h1>
                <div className={styles.deskContent}>
                    <Image className={styles.deskImg} src={hanoi} alt="Hanoi" width={500} height={750} priority />
                    <div>
                        <p>Experience the convenience of affordable motorbike rentals in Hanoi with our special monthly package. Perfect for expats and locals, these discounted rentals give you the freedom to explore the city with ease, at a fraction of the price. Our bikes are restricted to 1000 kilometers per month, offering the perfect solution for those who need reliable transport without the worry of daily mileage limits.</p>
                        <p>Each rental comes fully equipped with helmets, a sturdy rack, a phone holder, and secure straps for your convenience. Whether you're commuting to work or exploring the city, these bikes are designed to give you maximum value, comfort, and reliability.</p>
                        <div className={styles.deskInfo}>
                            <p>With a motorbike, you can dive into the heart of Hanoi's unique culture and daily life. Imagine:</p>
                            <ul>
                                <li>Weaving through the city's streets while discovering hidden gems.</li>
                                <li>Getting to know the rhythms of daily traffic as you adapt to the local way of life.</li>
                                <li>Feeling the breeze as you cruise around the bustling city, from the Old Quarter to quieter, scenic areas.</li>
                            </ul>

                            <p>And of course, no journey through Hanoi is complete without indulging in the local food and culture. You might find yourself:</p>
                            <ul>
                                <li>Rewarding yourself with a hot bowl of Phở after a day of riding.</li>
                                <li>Stopping for coffee along the shores of West Lake.</li>
                                <li>Riding over Long Bien bridge, soaking in the best views of the city.</li>
                            </ul>

                            <p>With our special monthly rentals, you’ll experience a side of Hanoi that only a motorbike can provide. Enjoy the freedom of riding with a fixed monthly cost and start exploring today!</p>
                        </div>

                    </div>
                </div>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={bikes} basePath={basePath} />
        </section>
    );
};

export default Hanoi;


