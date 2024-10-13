import Image from "next/image";

import BikeList from "../../components/BikeList";
import Filter from "../../components/Filter";

import styles from '../../styles/hanoiRentals.module.scss';
import camera from '../../public/camera.png';
import sunrise from '../../public/sunrise.webp';

const Travel = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const response = await fetch(`${baseUrl}/api/bikes`, {
        next: { revalidate: 3600 } // Revalidate every hour
    });
    const bikes = await response.json();
    const basePath = '/motorbike-rentals-vietnam';

    return (
        <>
            <Filter slug="/motorbike-rentals-vietnam" />

            <div className={styles.divider} style={{ margin: '0 auto' }}></div>
            <section className={styles.hanoiRentals}>
                <Image className={styles.cameraImg} src={camera} alt="camera icon" width={300} height={300} />
                <h1 style={{ marginBottom: '1rem' }}>Motorbikes for Travelling</h1>
                <div className={styles.deskContent}>
                    <Image className={styles.deskImg} src={sunrise} alt="Hanoi" width={600} height={600} priority />
                    <div>
                        <p>Embark on your next adventure with our reliable scooters and motorbikes designed for long-distance travel. Unlike inner city rentals, there&apos;s no limit to the number of kilometers you can cover in a day, allowing you to explore Vietnam at your own pace.</p>
                        <p>Our travel bikes come equipped with all the essentials to make your journey comfortable and stress-free. Each rental includes helmets, a sturdy rack for your belongings, a phone holder for navigation, and secure rubber straps. You&apos;ll also receive insider tips on the best routes, must-visit destinations, and local attractions across Vietnam.</p>
                        <div className={styles.deskInfo}>
                            <p>Unlike the bustling streets of Hanoi, venturing beyond the city offers a unique and immersive experience. Imagine cruising along scenic coastal roads, winding through lush rice paddies, or conquering challenging mountain passes. With a motorbike, you have the freedom to explore hidden gems, off-the-beaten-path destinations, and cultural experiences that are often missed by tourists.</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className={styles.divider} style={{ margin: '0 auto', marginBottom: '1rem' }}></div>
            <BikeList initialBikes={bikes} basePath={basePath} />
        </>
    );
};

export default Travel;
