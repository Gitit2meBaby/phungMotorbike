import { NextResponse } from 'next/server';

// Mock data
const bikes = [
    {
        id: "6i1JGtePje",
        model: "Honda",
        name: "Airblade",
        type: "automatic",
        capacity: "125",
        cityPrice: "10",
        monthPrice: "400",
        images: [
            {
                thumbURL: "https://example.com/airblade-thumb.jpg"
            }
        ]
    }
    // Other bikes...
];

// Handle GET request for individual bike
export async function GET(request, { params }) {
    const { 'model-name': modelNameSlug, id } = params; // Get dynamic segments

    console.log('API route accessed with params:', params);

    // Find the bike based on ID (you could also filter by model-name if needed)
    const bike = bikes.find((b) => b.id === id);

    if (!bike) {
        console.log('Bike not found for id:', id);
        return NextResponse.json({ error: 'Bike not found' }, { status: 404 });
    }

    console.log('Returning bike data:', bike);
    return NextResponse.json(bike);
}
