'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import BikeCard from './BikeCard';

export default function BikeList({ initialBikes }) {
    const [bikes, setBikes] = useState(initialBikes);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchBikes = async () => {
            const params = new URLSearchParams(searchParams);
            const response = await fetch(`/api/bikes?${params}`);
            const data = await response.json();
            setBikes(data);
        };

        fetchBikes();
    }, [searchParams]);

    return (
        <div>
            {initialBikes.map(bike => (
                <div key={bike.id}>
                    <BikeCard bike={bike} />
                </div>
            ))}
        </div>
    );
}