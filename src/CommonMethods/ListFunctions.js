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
