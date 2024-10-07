import BikeList from "../../components/BikeList";
import { getBikes } from "../lib/getBikes";

const Hanoi = async () => {
    const bikes = await getBikes();

    const basePath = '/motorbikes-for-rent-hanoi';

    return (
        <section>
            <BikeList initialBikes={bikes} basePath={basePath} />
        </section>
    );
};

export default Hanoi;
