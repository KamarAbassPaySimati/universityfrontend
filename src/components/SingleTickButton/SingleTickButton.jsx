import React from 'react';
import { handleSearchParams } from '../../CommonMethods/ListFunctions';

const SingleTickButton = ({
    singleCheckText,
    isSelected,
    onClick,
    searchParams,
    setSearchParams,
    isLoading
}) => {
    const handleSingleButtonClick = (selectedText) => {
        handleSearchParams('citizen', selectedText.toLowerCase(), searchParams, setSearchParams);
        console.log(searchParams.get('citizen'), 'citizennnnnn');
    };

    return (
        <button className={`${isSelected ? 'bg-primary-normal text-[#fff]' : 'text-neutral-primary'} 
        px-6 py-1 rounded-[8px] text-[#ffffff] font-400 text-[14px]`}
            onClick={() =>
            handleSingleButtonClick(singleCheckText)} >
            {singleCheckText}
        </button>
    );
};

export default SingleTickButton;
