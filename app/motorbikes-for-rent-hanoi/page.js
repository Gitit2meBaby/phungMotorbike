import React from 'react'
import Filter from '../../components/Filter'

import styles from '../../styles/hanoiRentals.module.scss';


const Hanoi = () => {
    return (
        <>
            <Filter slug="/motorbikes-for-rent-hanoi" />
            <section className={styles.hanoiRentals}>
                <h1>Inner City Rentals</h1>
                <p>Explore Hanoi's vibrant city center with ease on one of our reliable inner city rental motorbikes. Our fleet is designed for convenient urban travel, with a maximum daily mileage of 50 kilometers.</p>
                <p>Enjoy the freedom and flexibility of exploring the city at your own pace. Each rental includes essential accessories like helmets, a convenient rack, a phone holder, and secure rubber straps. We'll also provide you with valuable information and tips on must-see destinations and local attractions.</p>
            </section>
        </>
    )
}

export default Hanoi