'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import wally from '../public/wally.webp'

import styles from '../styles/notfound.module.css'
import Link from 'next/link'

export default function Custom404() {
    const router = useRouter()

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            router.push('/')
        }, 5000) // Redirect after 5 seconds

        return () => clearTimeout(redirectTimer)
    }, [router])

    return (
        <div className={styles.notFound}>
            <Image src={wally} height={600} width={600}></Image>
            <h1>404 - Page Not Found</h1>
            <p>Where's this page? Where's Wally???</p>
            <p>You'll be redirected to the homepage in 5 seconds.</p>
            <p>Unless you find him in time...</p>
            <p>If you're not redirected, <Link href="/">click here</Link>.</p>
        </div>
    )
}