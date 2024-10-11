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

    const basePath = '/motorbikes-for-sale';

    return (
        <>
            <Filter slug="/motorbikes-for-sale" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="Hanoi" width={300} height={300} />
                <h1>Automatic</h1>
                <h2>Your Key to Vietnam</h2>
                <div className={styles.padded}>
                    <p>Unlock the full potential of Vietnam's breathtaking landscapes with your very own automatic bike. Say goodbye to rental worries and hello to unlimited freedom!</p>

                    <p>Perfectly suited for both newcomers and experienced riders, our selection of automatic bikes offers the ideal blend of comfort, reliability, and ease of use. Imagine cruising through bustling city streets and winding mountain roads without ever having to shift gears – that's the joy of owning an automatic.</p>

                    <p>Don't limit your Vietnamese adventure to a short-term rental. Make the smart choice and invest in your own automatic bike today. Freedom, flexibility, and unforgettable experiences await!</p>
                </div>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={automaticBikes} basePath={basePath} />
        </>
    );
};

export default Automatic;
