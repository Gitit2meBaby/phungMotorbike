import { getBikes } from '../../lib/getBikes';

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const type = searchParams.get('type') || 'all';
    const sortCityPrice = searchParams.get('cityPrice'); // asc or desc
    const sortCapacity = searchParams.get('capacity');   // asc or desc

    // Fetch all bikes (cached fetch from Firebase)
    let bikes = await getBikes();

    // Apply filters
    if (type !== 'all') {
        bikes = bikes.filter(bike => bike.type === type);
    }

    // Sorting by cityPrice
    if (sortCityPrice === 'asc') {
        bikes = bikes.sort((a, b) => a.cityPrice - b.cityPrice);
    } else if (sortCityPrice === 'desc') {
        bikes = bikes.sort((a, b) => b.cityPrice - a.cityPrice);
    }

    // Sorting by capacity
    if (sortCapacity === 'asc') {
        bikes = bikes.sort((a, b) => a.capacity - b.capacity);
    } else if (sortCapacity === 'desc') {
        bikes = bikes.sort((a, b) => b.capacity - a.capacity);
    }

    return new Response(JSON.stringify(bikes), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
