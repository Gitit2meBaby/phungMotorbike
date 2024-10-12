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

    const basePath = '/motorbikes-for-sale';

    return (
        <>
            <Filter slug="/motorbikes-for-sale" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="camera icon" width={300} height={300} />
                <h1>Semi-Auto</h1>
                <h2>A Balanced Approach</h2>
                <div className={styles.padded}> <p>Looking for a perfect blend of control and convenience? Our semi-automatic motorbikes for sale offer just that. With no clutch to worry about, you can easily tackle daily commutes, while still benefiting from the extra control and power when you need it.</p>
                    <p>These bikes are ideal for both city streets and longer rides, making them a versatile choice for any rider. Whether you’re upgrading or buying your first motorbike, semi-automatic bikes are a fantastic option for exploring all that Vietnam has to offer.</p> </div>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={semiAutoBikes} basePath={basePath} />
        </>
    );
};

export default SemiAuto;
