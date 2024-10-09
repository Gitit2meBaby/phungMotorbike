import { getBikes } from '../../lib/getBikes';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type') || 'all';
        const sortCityPrice = searchParams.get('cityPrice');
        const sortCapacity = searchParams.get('capacity');
        const forceUpdate = searchParams.get('force') === 'true'; // Check for "force" parameter

        // Force refresh data if "forceUpdate" is true
        let bikes = await getBikes({}, forceUpdate);

        // Apply filtering logic
        if (type !== 'all') {
            bikes = bikes.filter(bike => bike.type === type);
        }

        if (sortCityPrice === 'asc') {
            bikes = bikes.sort((a, b) => a.cityPrice - b.cityPrice);
        } else if (sortCityPrice === 'desc') {
            bikes = bikes.sort((a, b) => b.cityPrice - a.cityPrice);
        }

        if (sortCapacity === 'asc') {
            bikes = bikes.sort((a, b) => a.capacity - b.capacity);
        } else if (sortCapacity === 'desc') {
            bikes = bikes.sort((a, b) => b.capacity - a.capacity);
        }

        return new Response(JSON.stringify(bikes), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': forceUpdate
                    ? 'no-store' // Force no caching if updating
                    : 'public, s-maxage=86400, stale-while-revalidate=43200', // Otherwise cache for 1 day
            },
        });
    } catch (error) {
        console.error('Error occurred in /api/bikes:', error); // Log the error to see details
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
