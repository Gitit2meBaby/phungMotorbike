import BikeList from '../../../components/BikeList';

const SemiAuto = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    let data = await fetch(`${baseUrl}api/bikes`);
    let bikes = await data.json()

    bikes.sort((a, b) => a.cityPrice - b.cityPrice);
    const semiAutoBikes = bikes.filter(bike => bike.type === 'semi-auto');

    const basePath = '/motorbike-rentals-vietnam';

    return (
        <div>
            <BikeList initialBikes={semiAutoBikes} basePath={basePath} />
        </div>
    );
};

export default SemiAuto;