import { clearBikesCache } from '../../lib/getBikes';

export async function GET() {
    clearBikesCache();
    return new Response(JSON.stringify({ message: 'Cache cleared successfully' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}