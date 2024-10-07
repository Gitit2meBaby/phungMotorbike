import BikeList from '../../../components/BikeList';

const SemiAuto = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    let data = await fetch(`${baseUrl}api/bikes`);
    let bikes = await data.json()

    const semiAutoBikes = bikes.filter(bike => bike.type === 'semi-auto');

    return (
        <div>
            <BikeList initialBikes={semiAutoBikes} />
        </div>
    );
};

export default SemiAuto;
