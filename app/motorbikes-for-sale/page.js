import Filter from '../../components/Filter'

import styles from '../../styles/hanoiRentals.module.scss';
import BikeList from "../../components/BikeList";
import Image from 'next/image';

import camera from '../../public/camera.png';
import dogOnBike from '../../public/dogOnBike.webp';

const ForSale = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const response = await fetch(`${baseUrl}/api/bikes`, {
        next: { revalidate: 3600 } // Revalidate every hour
    });
    const bikes = await response.json();

    const basePath = '/motorbikes-for-sale';

    return (
        <section>
            <Filter slug="/motorbikes-for-sale';" />
            <div className={styles.divider}
                style={{ margin: '0 auto' }}
            ></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="Hanoi" width={300} height={300} />
                <h1>Motorbikes for Sale</h1>
                <div className={styles.deskContent}>
                    <Image className={styles.deskImg} src={dogOnBike} alt="Hanoi" width={500} height={791} priority />
                    <div>
                        <p>Looking to own a motorbike in Vietnam? All our motorbikes for sale come with an official blue card, ensuring smooth ownership transfer and peace of mind. Each bike undergoes a thorough check by our experienced staff to ensure top performance.</p>
                        <p>Before handing over the keys, we provide a full service, ensuring your bike is in perfect condition for the road ahead. Whether you're staying long-term or just want the freedom of owning your own ride, we offer a variety of reliable bikes to suit your needs.</p>
                        <div className={styles.deskInfo}>
                            <p>Owning a motorbike in Vietnam opens up a world of immersive experiences. As you ride through the streets, you'll find yourself at the heart of the country's vibrant life. Imagine:</p>
                            <ul>
                                <li>Navigating through the organized chaos of city traffic like a local.</li>
                                <li>Discovering hidden gems in narrow alleys that cars can't access.</li>
                                <li>Marveling at the diverse countryside as you navigate down the Ho Chi Minh trail</li>
                            </ul>

                            <p>
                                With your own motorbike, you'll truly adapt to the Vietnamese way of life. Every journey becomes an adventure, creating unforgettable memories.
                            </p>

                            <p>These experiences are just the beginning of what awaits you as a motorbike owner in Vietnam. Having your own bike gives you the freedom to explore the country's culture at your own pace, from city streets to rural landscapes. Don't just visit Vietnam – become part of its vibrant, two-wheeled culture. Invest in your own motorbike and unlock endless adventures!</p>
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

export default ForSale;
