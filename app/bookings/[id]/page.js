import { notFound } from 'next/navigation';
import BookingPage from '../../../components/BookingPage';

export default async function Bookings({ params }) {
    const { id } = params; // Get the bike ID from URL params

    // Fetch bike details based on the ID
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const apiUrl = `${baseUrl}/api/bikes?force=true`;
    const res = await fetch(apiUrl);
    const bikes = await res.json();
    const bike = bikes.find(b => b.id === id);

    if (!bike) {
        return notFound();
    }

    return (
        <BookingPage bike={bike} />
    );
}
