import BikeList from '../../../components/BikeList';
import Filter from '../../../components/Filter';
import { getBikes } from '../../lib/getBikes';

import styles from '../../../styles/hanoiRentals.module.scss';
import camera from '../../../public/camera.png';
import Image from 'next/image';

const Manual = async () => {
    const manualBikes = await getBikes({ 
    type: 'Manual',
    priceType: 'salePrice'
});

    const basePath = '/motorbikes-for-sale';

    return (
        <>
            <Filter slug="/motorbikes-for-sale';" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="camera icon" width={300} height={300} priority />
                <h1>Manual</h1>
                <h2>A Classic Riding Experience</h2>
                <div className={styles.padded}>
                    <p>Our manual bikes offer a classic and engaging riding experience, perfect for those who are feeling a bit more adventorous and enjoy the thrill and control of a manual bike.</p>
                    <p>Purchasing a manual is a great way to experience the full potential of Vietnam&apos;s breathtaking landscapes. Great for long distance adventures and offroad experiences.</p>
                </div>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={manualBikes} basePath={basePath} />
        </>
    );
};

export default Manual;
