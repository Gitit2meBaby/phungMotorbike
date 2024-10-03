import React from 'react'
import { getBikes } from '../../lib/getBikes';
import BikeList from '../../components/BikeList';

const bikes = await getBikes();

const Hanoi = () => {
    return (
        <>
            <BikeList initialBikes={bikes} />
        </>
    )
}

export default Hanoi