import { revalidatePath } from 'next/cache';

export async function POST() {
    revalidatePath('/');
    return new Response('Revalidation triggered', { status: 200 });
}