import React from 'react'
import styles from '../styles/inforCard.module.css'
import Button from './Button';

const InfoCard = () => {
    return (
        <section className={styles.info}>
            <p>Phung Motorbike has 100's of motorbikes to choose from, ensuring you will find the perfect vehicle to match your budget, skill and thirst for adventure.</p>
            <p>We offer special rates for long term hire, inner city travelling discounts and always carry a fleet of top quality bikes for sale.</p>

            <Button />
        </section>
    )
}

export default InfoCard