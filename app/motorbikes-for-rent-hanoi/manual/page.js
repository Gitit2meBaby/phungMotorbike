import BikeList from '../../../components/BikeList';

const Manual = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    let data = await fetch(`${baseUrl}api/bikes`);
    let bikes = await data.json()

    bikes.sort((a, b) => a.cityPrice - b.cityPrice);
    const manualBikes = bikes.filter(bike => bike.type === 'manual');

    const basePath = '/motorbikes-for-rent-hanoi/manual';

    return (
        <div>
            <BikeList initialBikes={manualBikes} basePath={basePath} />
        </div>
    );
};

export default Manual;
