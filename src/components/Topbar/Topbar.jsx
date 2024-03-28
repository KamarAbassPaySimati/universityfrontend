import React, { useState } from 'react';
import Image from '../Image/Image';

const Topbar = ({
    searchValue,
    handleOnClickSearch,
    toggleSearch,
    clearSearch,
    
    filterValues

}) => {
    return (
        <div>
            <div className="relative my-2">
                <input
                    type="text"
                    value={searchValue}
                    data-testid="search"
                    onChange={(e) => handleOnClickSearch('search', e.target.value)}
                    placeholder="Paymaart ID, name, email or phone number"
                    className='hover:bg-[#F8F8F8] focus:bg-[#F8F8F8] text-neutral-primary placeholder:text-neutral-secondary
                    outline-none pl-[42px] py-1 text-[14px] font-[400] leading-[24px] w-[330px] ml-4 pr-8'
                />
                <Image
                    src="search_icon"
                    onClick={toggleSearch}
                    data-testid='search-btn'
                    className="absolute top-1/2 -translate-y-1/2 left-[26px] cursor-pointer"
                />
                {searchValue?.length > 1 && <Image
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
