import Image from 'next/image';
import BikeList from '../../../components/BikeList';
import Filter from '../../../components/Filter';

import styles from '../../../styles/hanoiRentals.module.scss';
import camera from '../../../public/camera.png';

const Automatic = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    let data = await fetch(`${baseUrl}api/bikes?forceRefresh=true`, {
        headers: { 'Cache-Control': 'no-store' }
    });
    let bikes = await data.json()

    bikes.sort((a, b) => a.cityPrice - b.cityPrice);
    const automaticBikes = bikes.filter(bike => bike.type === 'Automatic');

    const basePath = '/motorbikes-for-rent-hanoi';

    return (
        <>
            <Filter slug="/motorbikes-for-rent-hanoi" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="camera-icon" width={300} height={300} />
                <h1>Automatic</h1>
                <h2>Now for the Long Term</h2>
                <div className={styles.padded}>
                    <p>Enjoy the simplicity of automatic scooters for your extended stay in Hanoi with our special monthly rentals. Ride with ease and discover the city without worrying about gear shifts.</p>
                    <p>Perfect for both expats and locals who want a relaxed, long-term riding experience, our automatic scooters are reliable and comfortable for daily use, with a 1000 km/month limit.</p>
                    <p>Get the most out of your time in Hanoi by exploring its vibrant streets with the convenience of an automatic scooter at a discounted rate.</p>
                </div>

            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={automaticBikes} basePath={basePath} />
        </>
    );
};

export default Automatic;
