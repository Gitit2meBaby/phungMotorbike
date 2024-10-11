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
                <Image className={styles.cameraImg} src={camera} alt="Hanoi" width={300} height={300} />
                <h1>Automatic</h1>
                <h2>Effortless Exploration</h2>
                <div className={styles.padded}>
                    <p>Enjoy the simplicity and the convenience of our automatic scooters to discover Hanoi on two wheels.</p>
                    <p> Perfect for beginners, our fleet of automatic bikes offers a smooth and comfortable ride, great for those who prefer a relaxed driving experience.</p>
                    <p>Find all the best spots in Hanoi with a reliable, easy to ride automatic scooter</p>
                </div>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={automaticBikes} basePath={basePath} />
        </>
    );
};

export default Automatic;
