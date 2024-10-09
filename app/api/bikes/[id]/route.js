// app/api/bikes/[id]/route.js
import { NextResponse } from 'next/server';
import { getBikes } from '../../../lib/getBikes';

export async function GET(request, { params }) {
    const { id } = params;

    // Fetch all bikes
    const { bikes } = await getBikes();

    // Find the bike with the given id
    const bike = bikes.find(bike => bike.id === id);

    if (!bike) {
        return NextResponse.json({ message: 'Bike not found' }, { status: 404 });
    }

    // Return the bike details
    return NextResponse.json(bike);
}