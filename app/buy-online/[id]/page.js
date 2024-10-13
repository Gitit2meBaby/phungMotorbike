import { notFound } from 'next/navigation';
import PurchaseForm from '../../../components/PurchaseForm';

export default async function Purchase({ params }) {
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
        <PurchaseForm bike={bike} />
    );
}