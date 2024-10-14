import Image from 'next/image';
import BikeList from '../../../components/BikeList';
import Filter from '../../../components/Filter';
import { getBikes } from '../../lib/getBikes';

import styles from '../../../styles/hanoiRentals.module.scss';
import camera from '../../../public/camera.png';

const Automatic = async () => {
    const automaticBikes = await getBikes({ type: 'Automatic' });

    const basePath = '/motorbikes-for-sale';

    return (
        <>
            <Filter slug="/motorbikes-for-sale" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="camera icon" width={300} height={300} priority />
                <h1>Automatic</h1>
                <h2>Your Key to Vietnam</h2>
                <div className={styles.padded}>
                    <p>Unlock the full potential of Vietnam&apos;s breathtaking landscapes with your very own automatic bike. Say goodbye to rental worries and hello to unlimited freedom!</p>

                    <p>Perfectly suited for both newcomers and experienced riders, our selection of automatic bikes offers the ideal blend of comfort, reliability, and ease of use. Imagine cruising through bustling city streets and winding mountain roads without ever having to shift gears – that&apos;s the joy of owning an automatic.</p>

                    <p>Don&apos;t limit your Vietnamese adventure to a short-term rental. Make the smart choice and invest in your own automatic bike today. Freedom, flexibility, and unforgettable experiences await!</p>
                </div>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={automaticBikes} basePath={basePath} />
        </>
    );
};

export default Automatic;
