'use client'
import Link from 'next/link'
import React from 'react'

const Filter = ({ slug }) => {
    return (
        <section>
            <Link href={`${slug}/automatic`}>
                <button>Automatic</button></Link>
            <Link href={`${slug}/semi-auto`}>
                <button>Semi-auto</button>
            </Link>
            <Link href={`${slug}/manual`}>
                <button>Manual</button>
            </Link>
            <Link href={slug}>
                <button>All</button>
            </Link>
        </section>
    )
}

export default Filter