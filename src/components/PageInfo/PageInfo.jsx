import React from 'react';

function PageInfo ({ totalCount, currentPage }) {
    // Calculate the range of results displayed on the current page
    const resultsPerPage = 10; // Assuming 10 results per page
    const startIndex = (currentPage - 1) * resultsPerPage + 1;
    const endIndex = Math.min(currentPage * resultsPerPage, totalCount);

    return (
        <div className='font-[400] text-[14px] leading-[24px] text-neutral-primary
        absolute top-0 right-6 h-[52px] flex justify-center items-center p-2'>
            Showing {startIndex} to {endIndex} of {totalCount} results
        </div>
    );
}

export default PageInfo;
