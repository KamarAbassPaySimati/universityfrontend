import React, { useState } from 'react';
import Image from '../Image/Image';
import Filter from '../Filter/Filter';

const Topbar = ({
    searchParams,
    setSearchParams,
    filterOptions,
    filterType,
    placeHolder,
    isLoading
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
        if (params.search === '') delete params.search;
        setSearchParams({ ...params });
    };
    const handleSearchParamsForFilter = (key, value) => {
        const params = Object.fromEntries(searchParams);
        params.page = 1;
        if (searchParams.get(key) !== null) {
            if (!params[key].split(',').includes(value)) {
                params[key] = `${searchParams.get(key)},${value}`;
            } else {
                params[key] = params[key].split(',').filter(item => item !== value).join();
            }
        } else {
            params[key] = value;
        }
        if (params[key] === '') delete params[key];
        setSearchParams({ ...params });
    };

    const handleClearSearch = () => {
        setSearch('');
        handleSearchParams('search', '');
    };

    const handleClearFilter = () => {
        // Reset filterValues to an empty object or default values
        const params = Object.fromEntries(searchParams);
        delete params.role;
        delete params.status;
        setSearchParams({ ...params });
    };

    return (
        <div>
            <div className="relative my-2 ">
                <input
                    type="text"
                    value={search}
                    data-testid="search"
                    onChange={handleSearch}
                    placeholder= {placeHolder}
                    className={`hover:bg-[#F8F8F8] focus:bg-[#F8F8F8] text-neutral-primary placeholder:text-neutral-secondary
                outline-none pl-[42px] py-1 text-[14px] font-[400] leading-[24px] w-[330px] ml-4 pr-8 
                ${search?.length > 1 ? 'bg-[#F8F8F8]' : ''}`}
                />
                <Image
                    src={search?.length > 1 ? 'small_search_icon' : 'search_icon'}
                    testId='search-btn'
                    className="absolute top-1/2 -translate-y-1/2 left-[26px] cursor-pointer"
                />
                {search?.length > 1 && <Image
                    src="search_close"
                    onClick={handleClearSearch}
                    testId='search-close'
                    className="absolute top-1/2 -translate-y-1/2 left-[320px] cursor-pointer bg-[#F8F8F8]"
                />}
                <Filter
                    handleClearFilter={handleClearFilter}
                    filterOptions={filterOptions}
                    filterType={filterType}
                    handleSearchParams={handleSearchParamsForFilter}
                    searchParams={searchParams}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default Topbar;
