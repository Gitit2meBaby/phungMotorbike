import BikeList from '../../../components/BikeList';
import Filter from '../../../components/Filter';
import { getBikes } from '../../lib/getBikes';

import styles from '../../../styles/hanoiRentals.module.scss';
import camera from '../../../public/camera.png';
import Image from 'next/image';

const Manual = async () => {

    // const baseUrl = process.env.NEXT_PUBLIC_URL;
    // let data = await fetch(`${baseUrl}api/bikes?forceRefresh=true`, {
    //     headers: { 'Cache-Control': 'no-store' }
    // });
    // let bikes = await data.json()

    // bikes.sort((a, b) => a.cityPrice - b.cityPrice);
    // const manualBikes = bikes.filter(bike => bike.type === 'Manual');

    const manualBikes = await getBikes({ type: 'Manual' });

    const basePath = '/motorbike-rentals-vietnam';


    return (
        <>
            <Filter slug="/motorbike-rentals-vietnam" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="camera icon" width={300} height={300} />
                <h1>Manual</h1>
                <h2>A Classic Riding Experience</h2>
                <p>Our manual bikes offer a classic and engaging riding experience, perfect for those who are feeling a bit more adventorous and enjoy the thrill and control of a manual bike.</p>
                <p>Before booking a manual, please make sure you have some experience and confidence in handling a motorbike.</p>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={manualBikes} basePath={basePath} />
        </>
    );
};

export default Manual;
