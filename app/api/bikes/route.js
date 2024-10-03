import { pb } from '../../../lib/pocketbase';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort') || '-cityPrice';
    const filter = searchParams.get('filter') || '';

    try {
        const records = await pb.collection('bikes').getList(1, 50, {
            sort,
            filter,
        });
        return NextResponse.json(records);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}