import Image from 'next/image';
import BikeList from '../../../components/BikeList';
import Filter from '../../../components/Filter';
import { getBikes } from '../../lib/getBikes';

import styles from '../../../styles/hanoiRentals.module.scss';

import camera from '../../../public/camera.png';

const SemiAuto = async () => {
    const semiAutoBikes = await getBikes({ 
    type: 'Semi - Automatic',
    priceType: 'monthPrice'
});
    const basePath = '/motorbikes-for-rent-hanoi';

    return (
        <>
            <Filter slug="/motorbikes-for-rent-hanoi" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="Hanoi" width={300} height={300} priority />
                <h1>Semi-Auto</h1>
                <h2>For Long-Term Renters</h2>
                <div className={styles.padded}>
                    <p>Take advantage of the versatility of semi-automatic scooters with our monthly rental options in Hanoi. With the ease of automatic controls and extra power when needed, these bikes offer flexibility for your extended stay.</p>
                    <p>Ideal for those who want a bit more control over their ride while navigating Hanoi’s bustling streets, our semi-auto bikes provide a great balance between power and simplicity, capped at 1000 km/month.</p>
                    <p>Enjoy the freedom of exploring the city at your own pace, perfect for long-term visitors and locals alike.</p>
                </div>

            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={semiAutoBikes} basePath={basePath} />
        </>
    );
};

export default SemiAuto;
