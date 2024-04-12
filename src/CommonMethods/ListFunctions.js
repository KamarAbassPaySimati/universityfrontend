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
    console.log(key, 'key');
    console.log(value, 'valueee');
    if (value === 'non malawi citizen') {
        delete params.simplifiedkyc;
    }
    setSearchParams({ ...params });
    console.log(params, 'pa');
    console.log(searchParams.get('citizen'), 'came here 2');
};
