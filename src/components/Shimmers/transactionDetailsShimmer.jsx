import React from 'react';

const TransactionDetailsShimmer = ({ col }) => {
    return (
        <>
            {[...Array(col)]?.map((item, index) => (
                <div key={index} className="h-[20px] bg-neutral-primary rounded animate-pulse" />
            ))}
        </>
    );
};

export default TransactionDetailsShimmer;
