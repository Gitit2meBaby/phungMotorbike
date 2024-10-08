'use client';

import { useState, useEffect } from 'react';
import BikeCard from './BikeCard';
import Sorter from './Sorter';

export default function BikeList({ initialBikes, basePath }) {
    const [sortedBikes, setSortedBikes] = useState(initialBikes);
    const [sortMethod, setSortMethod] = useState({ key: 'cityPrice', direction: 'asc' });

    useEffect(() => {
        let sortedArray = [...initialBikes];

        if (sortMethod.key === 'cityPrice') {
            sortedArray.sort((a, b) =>
                sortMethod.direction === 'asc' ? a.cityPrice - b.cityPrice : b.cityPrice - a.cityPrice
            );
        } else if (sortMethod.key === 'capacity') {
            sortedArray.sort((a, b) =>
                sortMethod.direction === 'asc' ? a.capacity - b.capacity : b.capacity - a.capacity
            );
        }

        setSortedBikes(sortedArray);
    }, [sortMethod, initialBikes]);

    const handleSortChange = (key, direction) => {
        setSortMethod({ key, direction });
    };

    return (
        <div>
            <Sorter onSortChange={handleSortChange} />
            <div>
                {sortedBikes.map(bike => (
                    <div key={bike.id}>
                        <BikeCard bike={bike} basePath={basePath} />
                    </div>
                ))}
            </div>
        </div>
    );
}
