import BikeList from '../../../components/BikeList';

const Automatic = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    let data = await fetch(`${baseUrl}api/bikes`);
    let bikes = await data.json()

    bikes.sort((a, b) => a.cityPrice - b.cityPrice);
    const automaticBikes = bikes.filter(bike => bike.type === 'automatic');

    const basePath = '/motorbike-rentals-vietnam/automatic';

    return (
        <div>
            <BikeList initialBikes={automaticBikes} basePath={basePath} />
        </div>
    );
};

export default Automatic;
