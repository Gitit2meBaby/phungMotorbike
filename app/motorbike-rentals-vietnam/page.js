import Image from "next/image";

import BikeList from "../../components/BikeList";
import Filter from "../../components/Filter";
import { getBikes } from "../lib/getBikes";

import styles from '../../styles/hanoiRentals.module.scss';
import camera from '../../public/camera.png';

const Hanoi = async () => {
    const bikes = await getBikes();

    const basePath = '/motorbike-rentals-vietnam';

    return (
        <>
            <Filter slug="/motorbike-rentals-vietnam" />
            <div className={styles.divider} style={{ margin: '0 auto' }}></div>
            <section className={styles.hanoiRentals}>
                <Image src={camera} alt="Hanoi" width={300} height={300} />
                <h1 style={{ marginBottom: '1rem' }}>Motorbikes for Travelling</h1>
                <p>Embark on your next adventure with our reliable scooters and motorbikes designed for long-distance travel. Unlike inner city rentals, there's no limit to the number of kilometers you can cover in a day, allowing you to explore Vietnam at your own pace.</p>
                <p>Our travel bikes come equipped with all the essentials to make your journey comfortable and stress-free. Each rental includes helmets, a sturdy rack for your belongings, a phone holder for navigation, and secure rubber straps. You'll also receive insider tips on the best routes, must-visit destinations, and local attractions across Vietnam.</p>
            </section>
            <div className={styles.divider} style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={bikes} basePath={basePath} />
        </>
    );
};

export default Hanoi;
