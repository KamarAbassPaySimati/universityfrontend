import React, { useState } from 'react';
import Image from '../Image/Image';

const Topbar = ({
    searchParams,
    setSearchParams,
    toggleSearch,
    clearSearch

}) => {
    const [timer, setTimer] = useState(null);
    const [search, setSearch] = useState(!searchParams.get('search') ? '' : decodeURIComponent(searchParams.get('search')) || '');

    const handleSearch = (newValue) => {
        setSearch(newValue);
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            handleSearchParams('search', newValue);
        }, 500);
        setTimer(newTimer);
    };

    const handleSearchParams = (key, value, del) => {
        const params = Object.fromEntries(searchParams);
        if (del) {
            delete params[del];
        } else {
            params.page_number = 1;
            if (key === 'search') params[key] = encodeURIComponent(value);
            else params[key] = value;
            if (params.search === '') delete params.search;
        }
        setSearchParams({ ...params });
    };

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
                    onClick={toggleSearch}
                    data-testid='search-btn'
                    className="absolute top-1/2 -translate-y-1/2 left-[26px] cursor-pointer"
                />
                {search?.length > 1 && <Image
                    src="search_close"
                    onClick={clearSearch}
                    data-testid='search-btn'
                    className="absolute top-1/2 -translate-y-1/2 left-[320px] cursor-pointer"
                />}
                <Image
                    src="filter_icon"
                    onClick={toggleSearch}
                    data-testid='filter-btn'
                    className="absolute top-1/2 -translate-y-1/2 right-6"
                />
            </div>
        </div>
    );
};

export default Topbar;
