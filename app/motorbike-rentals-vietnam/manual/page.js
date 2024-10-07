import BikeList from '../../../components/BikeList';

const Manual = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    let data = await fetch(`${baseUrl}api/bikes`);
    let bikes = await data.json()

    const manualBikes = bikes.filter(bike => bike.type === 'manual');

    return (
        <div>
            <BikeList initialBikes={manualBikes} />
        </div>
    );
};

export default Manual;
