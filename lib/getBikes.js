// export async function getBikes(sort = '-cityPrice', filter = '') {
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
//     const url = new URL(`${baseUrl}/api/bikes`);
//     url.searchParams.append('sort', sort);
//     url.searchParams.append('filter', filter);

//     const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
//     if (!res.ok) throw new Error('Failed to fetch bikes');
//     return res.json();
// }

import { pb } from './pocketbase';


export async function getBikes(sort = '-cityPrice', filter = '') {
    try {
        const records = await pb.collection('bikes').getList(1, 50, {
            sort,
            filter,
        });
        return records.items;
    } catch (error) {
        console.error('Failed to fetch bikes:', error);
        throw new Error('Failed to fetch bikes');
    }
}