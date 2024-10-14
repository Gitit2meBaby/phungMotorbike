import { getBikes } from '../../../lib/getBikes';
import { notFound } from 'next/navigation';
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { id, 'model-name': modelName } = params;

    const bikes = await getBikes();
    const bike = bikes.find(b => b.id === id && `${b.model.toLowerCase()}-${b.name.toLowerCase()}` === modelName);

    if (!bike) {
        return { title: 'Bike Not Found' };
    }

    return {
        title: `${bike.model} ${bike.name} - Monthly rentals in Hanoi, Vietnam`,
        description: `At Phung Motorbike, rent a ${bike.model} ${bike.name} for just $${bike.monthPrice}/month. Cheap rates for expats and locals staying in the city for extended periods.`,
        keywords: `${bike.model} ${bike.name} ${bike.capacity}cc, monthly scooter Rental in Hanoi, ${bike.model} rental per month`,
        openGraph: {
            title: `${bike.model} ${bike.name}`,
            description: `Rent a ${bike.model} ${bike.name} ${bike.capacity}cc at Hanoi's best rate of ₫${bike.cityPrice}/month.`,
            images: [
                {
                    url: bike.images[0].thumbURL,
                    width: 300,
                    height: 225,
                    alt: `${bike.model} ${bike.name}`
                }
            ],
            locale: 'en_US',
            type: 'website',
        }
    };
}

const BikeDetailLayout = async ({ children, params }) => {
    const { id, 'model-name': modelName } = params;

    const bikes = await getBikes();
    const bike = bikes.find(b => b.id === id && `${b.model.toLowerCase()}-${b.name.toLowerCase()}` === modelName);

    if (!bike) {
        return notFound();
    }

    return (
        <>
            {children}
        </>
    );
};

export default BikeDetailLayout;
