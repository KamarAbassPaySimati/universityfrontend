export const handleSort = (sortBy, searchParams, setSearchParams) => {
    const params = Object.fromEntries(searchParams);
    params.sortBy = sortBy;
    params.page = 1;
    params.sortOrder = params.sortOrder === 'asc' ? 'desc' : 'asc';
    setSearchParams({ ...params });
};

export const handleSearchParams = (key, value, searchParams, setSearchParams) => {
    const params = Object.fromEntries(searchParams);
    params[key] = value;
    params.page = 1;
    setSearchParams({ ...params });
};
export const handleDeleteSearchParams = (key, searchParams, setSearchParams) => {
    console.log(key, 'key');
    const params = Object.fromEntries(searchParams);

    params.page = 1;
    delete params[key];
    setSearchParams({ ...params });
    if (searchParams.get(key) !== null) {
        console.log('not nullllllllllll');
       
    }
   
};
