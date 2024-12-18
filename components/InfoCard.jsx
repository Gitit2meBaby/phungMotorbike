import React from 'react'
import styles from '../styles/infoCard.module.css'
import Button from './Button';

const InfoCard = () => {
    return (
        <section className={styles.info}>
            <p>Phung Motorbike has 100&apos;s of motorbikes to choose from, ensuring you will find the perfect vehicle to match your budget, skill, and thirst for adventure.</p>

            <p>We offer special rates for long term rentals, inner city rates and travellers discounts. We always carry a fleet of top quality bikes for sale.</p>

            <Button inCard={true} />
        </section>
    )
}

export default InfoCard