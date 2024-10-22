import { getBikes } from '../../../lib/getBikes';
import { notFound } from 'next/navigation';
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id, 'model-name': modelName } = params;

  const normalize = (str) => {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

    const bikes = await getBikes();

const bike = bikes.find(b => 
  b.id.toString() === id && 
  `${normalize(b.model)}-${normalize(b.name)}` === modelName
);

 if (!bike) {
        return { title: 'Bike Not Found' };
    }

    return {
        title: `${bike.model} ${bike.name} - For sale in Hanoi, Vietnam`,
        description: `For sale, second hand ${bike.model} ${bike.name} in Hanoi, Vietnam. Perfect for exploring the city or travelling the countryside. Well maintained and reliable bikes for sale at Phung Motorbike.`,
        keywords: `${bike.model} ${bike.name} ${bike.capacity}cc, Scooters for sale in Hanoi, Vietnam, ${bike.model} for sale`,
        openGraph: {
            title: `${bike.model} ${bike.name}`,
            description: `Buy a ${bike.model} ${bike.name}${bike.capacity}cc for just ₫${bike.salePrice}.`,
            images: [
                {
                    url: bike.images[0].fullURL,
                    width: 600,
                    height: 450,
                    alt: `${bike.model} ${bike.name}`
                }
            ],
            locale: 'en_US',
            type: 'website',
        },
    };
}

const BikeDetailLayout = async ({ children, params }) => {
    const { id, 'model-name': modelName } = params;

    const bikes = await getBikes();

    const normalize = (str) => {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

const bike = bikes.find(b => 
  b.id.toString() === id && 
  `${normalize(b.model)}-${normalize(b.name)}` === modelName
);

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