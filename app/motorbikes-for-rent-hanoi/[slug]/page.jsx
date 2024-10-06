import { pb } from "../../../lib/pocketbase";  // Ensure correct pb initialization

export async function generateStaticParams() {
    try {
        // Fetch the list of bikes from PocketBase
        const bikes = await pb.collection('bikes').getFullList({
            sort: '+cityPrice', // Sorting option if needed
        });

        return bikes.map(bike => ({
            slug: `${bike.model}-${bike.name}`.toLowerCase(),  // Ensure consistent slug formatting
        }));
    } catch (error) {
        console.error("Error fetching static params:", error);
        throw new Error("Failed to fetch bikes for static params");
    }
}

export async function getBikeData(slug) {
    try {
        const [model, name] = slug.split('-');
        const records = await pb.collection('bikes').getFullList({
            filter: `model="${model}" && name="${name}"`,
        });
        return records[0];
    } catch (error) {
        console.error("Error fetching bike data:", error);
        return null;
    }
}

export default async function BikeDetails({ params }) {
    const { slug } = params;
    const bike = await getBikeData(slug);

    if (!bike) {
        return <div>Bike not found</div>;
    }

    const baseUrlThumb = `https://phung-motorbike.pockethost.io/api/files/${bike.collectionId}/${bike.id}/`;

    return (
        <div>
            <h1>{`${bike.model} ${bike.name} Details`}</h1>
            <Image
                src={baseUrlThumb + bike.thumb[0]}
                alt={`${bike.model} ${bike.name}`}
                width={600}
                height={450}
                unoptimized
            />
            <p>Capacity: {bike.capacity}cc</p>
            <p>Price: {bike.cityPrice}/day</p>
            <p>{bike.description}</p>
            <Link href="/motorbikes-for-rent-hanoi">
                <button>Back to Listings</button>
            </Link>
        </div>
    );
}
