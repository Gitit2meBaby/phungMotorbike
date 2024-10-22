import Image from 'next/image';
import BikeList from '../../../components/BikeList';
import Filter from '../../../components/Filter';
import { getBikes } from '../../lib/getBikes';

import styles from '../../../styles/hanoiRentals.module.scss';

import camera from '../../../public/camera.png';

const SemiAuto = async () => {
    const semiAutoBikes = await getBikes({ 
    type: 'Semi - Automatic',
    priceType: 'cityPrice'
});

    const basePath = '/motorbikes-for-rent-hanoi';

    return (
        <>
            <Filter slug="/motorbikes-for-rent-hanoi" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="camera icon" width={300} height={300} priority />
                <h1>Semi-Auto</h1>
                <h2>A Balanced Approach</h2>
                <div className={styles.padded}>
                    <p>Enjoy the best of both worlds with our semi-automatic scooters. Still no need to worry about clutch when navigating the chaotic Hanoi traffic, but pleny of power when you need it.</p>
                    <p> These scooters provide a versatile riding experience. Whether you&apos;re a seasoned rider or a beginner, semi-automatic bikes are a great choice for getting around Hanoi.</p>
                </div>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={semiAutoBikes} basePath={basePath} />
        </>
    );
};

export default SemiAuto;
