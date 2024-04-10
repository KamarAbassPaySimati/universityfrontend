export const handleSort = (sortBy, searchParams, setSearchParams) => {
    const params = Object.fromEntries(searchParams);
    params.sortBy = sortBy;
    params.page = 1;
    params.sortOrder = params.sortOrder === 'asc' ? 'desc' : 'asc';
    setSearchParams({ ...params });
};

export const handleSearchParams = (key, value, searchParams, setSearchParams) => {
    console.log('caammemmeee');
    const params = Object.fromEntries(searchParams);
    params[key] = value;
    params.page = 1;
    setSearchParams({ ...params });
};
