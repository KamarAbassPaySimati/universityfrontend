/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Image from '../Image/Image';
import Filter from '../Filter/Filter';
import FilterWithSingleOption from '../FilterWithSingleOption/FilterWithSingleOption';
import MultiFilter from '../MultiFilter';

const Topbar = ({
    searchParams,
    setSearchParams,
    filterOptions,
    filterType,
    placeHolder,
    isLoading,
    filterActive,
    singleSelectFilter,
    filter1,
    filter2,
    filter3,
    multiFilter,
    setAppliedFilter,
    appliedFilter,
    pageNumber,
    NoFilter,
    customClass,
    initialState

}) => {
    const [timer, setTimer] = useState(null);
    const [search, setSearch] = useState(!searchParams.get('search') ? '' : decodeURIComponent(searchParams.get('search')) || '');

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
        if (pageNumber) {
            params.page_number = 1;
        } else {
            params.page = 1;
        }
        if (key === 'search') params[key] = encodeURIComponent(value);
        else params[key] = value;
        if (params.search === '') delete params.search;
        setSearchParams({ ...params });
    };

    const handleSearchParamsForFilter = (key, value) => {
        const params = Object.fromEntries(searchParams);
        if (pageNumber) {
            params.page_number = 1;
        } else {
            params.page = 1;
        }
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
    useEffect(() => {
       if (searchParams.get('search') === null) {
        setSearch('');
       }
    }, [searchParams]);

    const handleClearFilter = () => {
        // Reset filterValues to an empty object or default values
        const params = Object.fromEntries(searchParams);
        if (filterActive) {
            if (pageNumber) {
                params.page_number = 1;
            } else {
                params.page = 1;
            }
        }
        delete params.role;
        delete params.status;
        delete params['Flagged Reason'];
        delete params.filter;
        delete params.start_date;
        delete params.end_date;
        setSearchParams({ ...params });
    };
    const handleClearFilterForSingleCheck = () => {
        // Reset filterValues to an empty object or default values
        const params = Object.fromEntries(searchParams);
        if (filterActive) {
            if (pageNumber) {
                params.page_number = 1;
            } else {
                params.page = 1;
            }
        }
        delete params.fullkyc;
        delete params.simplifiedkyc;
        params.citizen = 'all';
        setSearchParams({ ...params });
    };

    return (
        <div className="relative my-2  ">
            <input
                type="text"
                value={search}
                data-testid="search"
                onChange={handleSearch}
                placeholder= {placeHolder}
                className={`hover:bg-[#F8F8F8] focus:bg-[#F8F8F8] text-neutral-primary placeholder:text-neutral-secondary
                outline-none pl-[42px] py-1 text-[14px] font-[400] leading-[24px] w-[350px] ml-4 pr-8 rounded-[4px]
                ${search?.length > 0 ? 'bg-[#F8F8F8]' : ''}`}
            />
            <Image
                src={search?.length > 0 ? 'small_search_icon' : 'search_icon'}
                testId='search-btn'
                className="absolute top-1/2 -translate-y-1/2 left-[26px] cursor-pointer"
            />
            {search?.length > 0 && <Image
                src="search_close"
                onClick={handleClearSearch}
                testId='search-close'
                className="absolute top-1/2 -translate-y-1/2 left-[340px] cursor-pointer bg-[#F8F8F8]"
            />}
            {NoFilter === undefined && (
                multiFilter
                    ? <MultiFilter
                            filterOptions={filterOptions}
                            filterType={filterType}
                            handleApplySearchParams={ null } // write a function to apply the seach params
                            searchParams={searchParams}
                            filterActive={filterActive}
                            setSearchParams={setSearchParams}
                            appliedFilter={appliedFilter}
                            setAppliedFilter={setAppliedFilter}
                            customClass={customClass}
                            initialState={initialState}
                            pageNumber={pageNumber}
                     />
                    : singleSelectFilter
                        ? <FilterWithSingleOption
                                filterOptionOne={filter1}
                                filterOptionTwo={filter2}
                                filterOptionThree={filter3}
                                handleClearFilter={handleClearFilterForSingleCheck}
                                filterActive={filterActive}
                                filterType={filterType}
                                searchParams={searchParams}
                                setSearchParams={setSearchParams}
                                handleSearchParamValue={handleSearchParamsForFilter}
                                isLoading={isLoading}

                        />
                        : <Filter
                                handleClearFilter={handleClearFilter}
                                filterOptions={filterOptions}
                                filterType={filterType}
                                handleSearchParams={handleSearchParamsForFilter}
                                searchParams={searchParams}
                                isLoading={isLoading}
                                filterActive={filterActive}
                                customClass={customClass}
                                appliedFilter={appliedFilter}
                                setAppliedFilter={setAppliedFilter}
                        />

            )}

        </div>
    );
};

export default Topbar;
