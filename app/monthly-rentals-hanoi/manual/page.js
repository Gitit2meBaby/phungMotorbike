import BikeList from '../../../components/BikeList';
import Filter from '../../../components/Filter';
import { getBikes } from '../../lib/getBikes';

import styles from '../../../styles/hanoiRentals.module.scss';
import camera from '../../../public/camera.png';
import Image from 'next/image';
import Link from 'next/link';

const Manual = async () => {

    // const baseUrl = process.env.NEXT_PUBLIC_URL;
    // let data = await fetch(`${baseUrl}api/bikes?forceRefresh=true`, {
    //     headers: { 'Cache-Control': 'no-store' }
    // });
    // let bikes = await data.json()

    // bikes.sort((a, b) => a.cityPrice - b.cityPrice);
    // const manualBikes = bikes.filter(bike => bike.type === 'Manual');

    const manualBikes = await getBikes({ type: 'Manual' });

    const basePath = '/motorbikes-for-rent-hanoi';

    return (
        <>
            <Filter slug="/motorbikes-for-rent-hanoi" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="camera icon" width={300} height={300} />
                <h1>Manual</h1>
                <h2>The Classic Ride</h2>
                <div className={styles.padded}>
                    <p>For riders who seek adventure and control, our manual motorbikes are available for discounted monthly rentals in Hanoi. Get the full experience of riding a manual, with all the power and precision you need.</p>
                    <p>This option is perfect for experienced riders who want to immerse themselves in Hanoi’s streets while enjoying the classic manual riding experience. Please note the 1000 km/month restriction—ideal for local city riding. For longer adventures, you might prefer our <Link href="/motorbike-rentals-vietnam/manual">unlimited kilometer packages.</Link></p>
                </div>

            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={manualBikes} basePath={basePath} />
        </>
    );
};

export default Manual;
