// app/motorbikes-for-rent-hanoi/[type]/page.js
import BikeList from '../components/BikeList';
import { getBikes } from '../../lib/getBikes';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return [
        { type: 'automatic' },
        { type: 'semi-auto' },
        { type: 'manual' }
    ];
}

export default async function FilteredMotorbikes({ params }) {
    const allBikes = await getBikes();
    const bikes = allBikes.filter(bike => bike.type === params.type);

    if (bikes.length === 0) notFound();

    return (
        <>
            <BikeList initialBikes={bikes} />
        </>
    );
}