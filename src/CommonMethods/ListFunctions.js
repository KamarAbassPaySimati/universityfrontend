export default function handleSort (sortBy, searchParams, setSearchParams) {
    const params = Object.fromEntries(searchParams);
    params.sortBy = sortBy;
    params.page = 1;
    if (params.sortOrder === 'asc') {
        params.sortOrder = 'desc';
    } else {
        params.sortOrder = 'asc';
    }
    setSearchParams({ ...params });
}

export const handleSearchParams = (id, value, searchParams, setSearchParams) => {
    const params = Object.fromEntries(searchParams);
    params[id] = value;
    if (value === null) delete params[id];
    setSearchParams({ ...params });
};
