'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import wally from '../public/wally.webp'
import wally1400 from '../public/wally1400.webp'

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
            <Image className={styles.imgMob} src={wally} height={600} width={600} alt='busy street in Vietnam with wheres Wally'></Image>
            <Image className={styles.imgDesk} src={wally1400} height={600} width={1400} alt='busy street in Vietnam with wheres Wally'></Image>
            <h1>404 - Page Not Found</h1>
            <p>Where&apos;s this page? Where&apos;s Wally?!?</p>
            <p>You&apos;ll be redirected to the homepage in 5 seconds.</p>
            <p>Unless you find him in time...</p>
            <p>If you&apos;re not redirected, <Link href="/">click here</Link>.</p>
        </div>
    )
}