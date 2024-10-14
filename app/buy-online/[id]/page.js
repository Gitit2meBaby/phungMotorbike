import { notFound } from 'next/navigation';
import PurchaseForm from '../../../components/PurchaseForm';
import { getBikes } from '../../lib/getBikes';

export default async function Purchase({ params }) {
    const { id } = params; // Get the bike ID from URL params

    const bikes = await getBikes();
    const bike = bikes.find(b => b.id === id);

    if (!bike) {
        return notFound();
    }

    return (
        <PurchaseForm bike={bike} />
    );
}