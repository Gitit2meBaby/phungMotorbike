import Image from 'next/image';
import BikeList from '../../../components/BikeList';
import Filter from '../../../components/Filter';

import styles from '../../../styles/hanoiRentals.module.scss';

import camera from '../../../public/camera.png';

const SemiAuto = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    let data = await fetch(`${baseUrl}api/bikes?forceRefresh=true`, {
        headers: { 'Cache-Control': 'no-store' }
    }); let bikes = await data.json()

    bikes.sort((a, b) => a.cityPrice - b.cityPrice);
    const semiAutoBikes = bikes.filter(bike => bike.type === 'Semi - Automatic');

    const basePath = '/motorbike-rentals-vietnam';

    return (
        <>
            <Filter slug="/motorbike-rentals-vietnam" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="camera icon" width={300} height={300} />
                <h1>Semi-Auto</h1>
                <h2>A Balanced Approach</h2>
                <p>Enjoy the best of both worlds with our semi-automatic motorbikes. Still no need to worry about clutch, and ideal for hilly terrain.</p>
                <p> These bikes provide a versatile riding experience. Whether you&apos;re a seasoned rider or a beginner, semi-automatic bikes are a great choice for exploring Vietnam.</p>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={semiAutoBikes} basePath={basePath} />
        </>
    );
};

export default SemiAuto;
