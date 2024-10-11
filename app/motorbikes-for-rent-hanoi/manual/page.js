import BikeList from '../../../components/BikeList';
import Filter from '../../../components/Filter';

import styles from '../../../styles/hanoiRentals.module.scss';
import camera from '../../../public/camera.png';
import Image from 'next/image';
import Link from 'next/link';

const Manual = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    let data = await fetch(`${baseUrl}api/bikes?forceRefresh=true`, {
        headers: { 'Cache-Control': 'no-store' }
    });
    let bikes = await data.json()

    bikes.sort((a, b) => a.cityPrice - b.cityPrice);
    const manualBikes = bikes.filter(bike => bike.type === 'Manual');

    const basePath = '/motorbikes-for-rent-hanoi';

    return (
        <>
            <Filter slug="/motorbikes-for-rent-hanoi" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="Hanoi" width={300} height={300} />
                <h1>Manual</h1>
                <h2>A Classic Riding Experience</h2>
                <div className={styles.padded}>
                    <p>Our manual bikes offer a classic and engaging riding experience, perfect for those who are feeling a bit more adventorous and enjoy the thrill and control of a manual bike.</p>
                    <p>Before booking a manual, please make sure you have some experience and confidence in handling a motorbike.</p>
                    <p>Our inner city rate is for riding within Hanoi city limits only, an automatic scooter might be more practical for this application, if you would like to hire a manual for a long distance adventure, perhaps <Link href="/motorbike-rentals-vietnam/manual">check out manuals available with unlimited kilometer rates.</Link></p>
                </div>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={manualBikes} basePath={basePath} />
        </>
    );
};

export default Manual;
