import React, { useEffect, useState } from 'react';
import Image from '../Image/Image';
import Filter from '../Filter/Filter';

const Topbar = ({
    searchParams,
    setSearchParams,
    filterOptions

}) => {
    const [timer, setTimer] = useState(null);
    const [search, setSearch] = useState(!searchParams.get('search') ? '' : decodeURIComponent(searchParams.get('search')) || '');

    const initialState = {};
    Object.entries(filterOptions).forEach(([key, values]) => {
        initialState[key.toLowerCase()] = {};
        values.forEach((value) => {
            initialState[key.toLowerCase()][value.toLowerCase()] = false;
        });
    });

    const [filterValues, setFilterValues] = useState(initialState);

    const handleSearch = (e) => {
        const newValue = e.target.value;
        setSearch(newValue);
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            handleSearchParams('search', newValue);
        }, 500);
        setTimer(newTimer);
    };

    const handleSearchParams = (key, value) => {
        const params = Object.fromEntries(searchParams);
        params.page = 1;
        if (key === 'search') params[key] = encodeURIComponent(value);
        else params[key] = value;
        if (value === '') delete params[key];
        setSearchParams({ ...params });
    };

    const handleClearSearch = () => {
        setSearch('');
        handleSearchParams('search', '');
    };

    useEffect(() => {
        console.log(filterValues);
        const activeFilters = Object.entries(initialState)
            .map(([key, value]) => {
                // Filter out values that are true and join them into a comma-separated string
                const activeValues = Object.entries(value)
                    .filter(([_, val]) => val)
                    .map(([k]) => k)
                    .join(',');

                // Return key-value pairs with active values
                return { [key]: activeValues };
            });
        if (activeFilters) {
            activeFilters.forEach(option => {
                const key = Object.keys(option)[0];
                const value = option[key];
                handleSearchParams(key, value);
            });
        }
    }, [filterValues]);

    return (
        <div>
            <div className="relative my-2">
                <input
                    type="text"
                    value={search}
                    data-testid="search"
                    onChange={handleSearch}
                    placeholder="Paymaart ID, name or phone number "
                    className='hover:bg-[#F8F8F8] focus:bg-[#F8F8F8] text-neutral-primary placeholder:text-neutral-secondary
                    outline-none pl-[42px] py-1 text-[14px] font-[400] leading-[24px] w-[330px] ml-4 pr-8'
                />
                <Image
                    src={search?.length > 1 ? 'small_search_icon' : 'search_icon'}
                    data-testid='search-btn'
                    className="absolute top-1/2 -translate-y-1/2 left-[26px] cursor-pointer"
                />
                {search?.length > 1 && <Image
                    src="search_close"
                    onClick={handleClearSearch}
                    data-testid='search-btn'
                    className="absolute top-1/2 -translate-y-1/2 left-[320px] cursor-pointer"
                />}
                <Filter setFilterValues={setFilterValues} filterValues={filterValues} filterOptions={filterOptions} />
            </div>
        </div>
    );
};

export default Topbar;
