import { notFound } from 'next/navigation';
import BookingPage from '../../../components/BookingPage';
import { getBikes } from '../../lib/getBikes';

export default async function Bookings({ params }) {
    const { id } = params; // Get the bike ID from URL params

    const bikes = getBikes();
    const bike = bikes.find(b => b.id === id);

    if (!bike) {
        return notFound();
    }

    return (
        <BookingPage bike={bike} />
    );
}
