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
        params.page_number = 1;
        if (key === 'search') params[key] = encodeURIComponent(value);
        else params[key] = value;
        if (params.search === '') delete params.search;
        setSearchParams({ ...params });
    };

    const handleClearSearch = () => {
        setSearch('');
        handleSearchParams('search', '');
    };

    const handleClearFilter = () => {
        // Reset filterValues to an empty object or default values
        setFilterValues(initialState);
    };

    useEffect(() => {
        const filteredOptions = Object.entries(filterValues).filter(
            ([_, value]) => Object.values(value).some((v) => v)
        ).map(([key, value]) => ({ [key]: Object.keys(value).filter((subKey) => value[subKey]).join(',') }));

        setSearchParams((prevParams) => ({
            ...prevParams,
            ...filteredOptions.reduce((acc, option) => ({ ...acc, ...option }), {})
        }));
    }, [filterValues]);

    return (
        <div className="relative py-2 border-b border-neutral-outline">
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
            <Filter
                handleClearFilter={handleClearFilter}
                setFilterValues={setFilterValues}
                filterValues={filterValues}
                filterOptions={filterOptions} />
        </div>
    );
};

export default Topbar;
