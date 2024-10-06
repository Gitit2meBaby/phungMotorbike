import BikeCard from './BikeCard';
// import { getBikes } from '../lib/getBikes';
// import Sorter from './Sorter';
// import Filter from './Filter';

export default function BikeList({ initialBikes }) {
    console.log('initialBikes:', initialBikes);


    // useEffect(() => {
    //     const fetchBikes = async () => {
    //         const sort = searchParams.get('sort') || '-created';
    //         const filter = searchParams.get('filter') || '';
    //         const categoryFilter = pathname.includes('automatic') ? 'type="automatic"' :
    //             pathname.includes('semi-auto') ? 'type="semi-auto"' :
    //                 pathname.includes('manual') ? 'type="manual"' : '';
    //         const combinedFilter = `${filter}${filter && categoryFilter ? ' && ' : ''}${categoryFilter}`;
    //         const newBikes = await getBikes(sort, combinedFilter);
    //         setBikes(newBikes);
    //     };
    //     fetchBikes();
    // }, [searchParams, pathname]);

    // const handleSort = (newSort) => {
    //     const params = new URLSearchParams(searchParams);
    //     params.set('sort', newSort);
    //     replace(`${pathname}?${params.toString()}`);
    // };

    // const handleFilter = (newFilter) => {
    //     const params = new URLSearchParams(searchParams);
    //     params.set('filter', newFilter);
    //     replace(`${pathname}?${params.toString()}`);
    // };

    return (
        <div>
            {/* <Sorter onSort={handleSort} />
            <Filter onFilter={handleFilter} slug={pathname} /> */}
            {/* Render your bikes list */}
            <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>Hello World</h1>

            {initialBikes.map(bike => (
                <div key={bike.id}>
                    <BikeCard bike={bike} />
                </div>
            ))}
        </div>
    );
}