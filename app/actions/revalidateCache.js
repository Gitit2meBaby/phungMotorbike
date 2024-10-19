'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateCache() {
  // Revalidate the entire site
  revalidatePath('/', 'layout')
  
  return { message: 'Revalidation triggered' }
}