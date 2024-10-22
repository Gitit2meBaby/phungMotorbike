import Filter from '../../components/Filter'

import styles from '../../styles/hanoiRentals.module.scss';
import BikeList from "../../components/BikeList";
import Image from 'next/image';

import camera from '../../public/camera.png';
import hanoi2 from '../../public/hanoi.webp';
import { getBikes } from '../lib/getBikes';

const Hanoi = async () => {
    const bikes = await getBikes({ 
    priceType: 'cityPrice'
});

    const basePath = '/motorbikes-for-rent-hanoi';

    return (
        <section>
            <Filter slug="/motorbikes-for-rent-hanoi" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="camera-icon" width={300} height={300} priority />
                <h1>Inner City Rentals</h1>
                <div className={styles.deskContent}>
                    <Image className={styles.deskImg} src={hanoi2} alt="Hanoi street" width={500} height={750} priority />
                    <div>
                        <p>Explore Hanoi&apos;s vibrant city center with ease on one of our reliable inner city rental motorbikes. Our fleet is designed for convenient urban travel, with a maximum daily mileage of 50 kilometers.</p>
                        <p>Enjoy the freedom and flexibility of exploring the city at your own pace. Each rental includes essential accessories like helmets, a convenient rack, a phone holder, and secure rubber straps. We&apos;ll also provide you with valuable information and tips on must-see destinations and local attractions.</p>
                        <div className={styles.deskInfo}>
                            <p>Setting off on a tour in Hanoi makes you feel immersed in the hustle and bustle of life there. You may experience:</p>
                            <ul>
                                <li>People passing through traffic lights rulelessly.</li>
                                <li>Being stuck in dozens of traffic jams or in a narrow path of an old quarter&apos;s ally.</li>
                                <li>Getting confused or even frustrated by all the bulky, huge and funny-looking vehicles.</li>
                            </ul>

                            <p>
                                But eventually you will get to the destination safe and sound. At the end of the day, Hà Nội has its own way of operating things, you are adopting our Vietnamese lifestyle, which is surely will be your most unforgettable memories as you try:</p>
                            <ul>
                                <li>Driving through all those stressful things then get yourselves a bowl of hot Phở as a reward.</li>
                                <li>Slowly follow along around the West lake and get tripped off into any local coffee shop</li>
                                <li>Taking a ride to Long Bien bridge and having the best open view of Ha Noi</li>
                            </ul>
                            <p>These are some of very least things that you must do! After all, travelling with motorbike in Vietnam in general is much more fun than any other options. So come with us, Take a motorcycle and Explore our culture yourselves!</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className={styles.divider}
                style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={bikes} basePath={basePath} />
        </section>
    );
};

export default Hanoi;


