import { getBikes } from '../lib/getBikes';
import BikeList from '../../components/BikeList';

const Automatic = async () => {
    // Fetch automatic bikes on the server side
    const bikes = await getBikes({
        type: 'automatic', // Pass 'automatic' to filter the bikes by type
    });

    // Render the bikes in a client component or directly here
    return (
        <div>
            <h1>Automatic Bikes for Rent in Hanoi</h1>
            <BikeList bikes={bikes} />
        </div>
    );
};

export default Automatic;
