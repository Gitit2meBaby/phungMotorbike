import BikeList from '../../../components/BikeList';

const Automatic = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    let data = await fetch(`${baseUrl}api/bikes`);
    let bikes = await data.json()

    const automaticBikes = bikes.filter(bike => bike.type === 'automatic');

    return (
        <div>
            <BikeList initialBikes={automaticBikes} />
        </div>
    );
};

export default Automatic;
