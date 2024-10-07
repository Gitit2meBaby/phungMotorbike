import BikeList from "../../components/BikeList";
import { getBikes } from "../lib/getBikes";

const Hanoi = async () => {
    const bikes = await getBikes();

    return (
        <section>
            <BikeList initialBikes={bikes} />
        </section>
    );
};

export default Hanoi;
