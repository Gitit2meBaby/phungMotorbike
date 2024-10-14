import Image from 'next/image';
import BikeList from '../../../components/BikeList';
import Filter from '../../../components/Filter';
import { getBikes } from '../../lib/getBikes';

import styles from '../../../styles/hanoiRentals.module.scss';
import camera from '../../../public/camera.png';

const Automatic = async () => {

    const automaticBikes = await getBikes({ type: 'Automatic' });

    const basePath = '/motorbike-rentals-vietnam';

    return (
        <>
            <Filter slug="/motorbike-rentals-vietnam" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="camera icon" width={300} height={300} priority />
                <h1>Automatic</h1>
                <h2>Effortless Exploration</h2>
                <p>Experience the convenience of our automatic scooters for a hassle-free journey through Vietnam.</p>
                <p> Perfect for beginners, our fleet of automatic bikes offers a smooth and comfortable ride, great for those who prefer a relaxed driving experience.</p>
                <p>Explore the country&apos;s stunning landscapes without shifting a gear!</p>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={automaticBikes} basePath={basePath} />
        </>
    );
};

export default Automatic;
