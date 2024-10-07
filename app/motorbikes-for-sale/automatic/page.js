import BikeList from '../../../components/BikeList';

const Automatic = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    let data = await fetch(`${baseUrl}api/bikes`);
    let bikes = await data.json()

    bikes.sort((a, b) => a.salePrice - b.salePrice);
    const automaticBikes = bikes.filter(bike => bike.type === 'automatic');

    const basePath = '/motorbikes-for-sale/automatic';

    return (
        <div>
            <BikeList initialBikes={automaticBikes} basePath={basePath} />
        </div>
    );
};

export default Automatic;
