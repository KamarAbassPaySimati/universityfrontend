export const handleSort = (sortBy, searchParams, setSearchParams) => {
    const params = Object.fromEntries(searchParams);
    params.sortBy = sortBy;
    params.page = 1;
    params.order_by = params.order_by === 'ASC' ? 'DESC' : 'ASC';
    setSearchParams({ ...params });
};

export const handleSortWithKey = (key, searchParams, setSearchParams) => {
    const params = Object.fromEntries(searchParams);
    params.page = 1;
    params[key] = params[key] === 'ASC' ? 'DESC' : 'ASC';
    setSearchParams({ ...params });
};

export const handleSearchParams = (key, value, searchParams, setSearchParams, page) => {
    const params = Object.fromEntries(searchParams);
    params[key] = value;
    if (page !== 'false') {
        params.page = 1;
    }
    if (value === 'non malawi citizen') {
        delete params.simplifiedkyc;
    }
    setSearchParams({ ...params });
};
export const handleSearchParamsForKyc = (key, value, searchParams, setSearchParams, page) => {
    const params = Object.fromEntries(searchParams);
    params[key] = value;
    if (page !== 'false') {
        params.page = 1;
    }
    if (value === 'non malawi citizen') {
        delete params.simplifiedkyc;
    }
    if (searchParams.get('search') !== null) {
        delete params.search;
    }
    setSearchParams({ ...params });
};

export const handleSearchParamsValue = (id, value, searchParams, setSearchParams) => {
    const params = Object.fromEntries(searchParams);
    params[id] = value;
    if (value === null) delete params[id];
    setSearchParams({ ...params });
};
