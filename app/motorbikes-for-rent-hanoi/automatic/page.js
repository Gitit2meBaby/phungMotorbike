import { getBikes } from '@/lib/getBikes';
import BikeList from '@/components/BikeList';

export default async function AutomaticBikesPage() {
    const bikes = await getBikes(undefined, 'type="automatic"');
    return <BikeList initialBikes={bikes} />;
}