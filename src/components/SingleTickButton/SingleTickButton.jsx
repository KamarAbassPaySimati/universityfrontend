import React from 'react';

const SingleTickButton = ({
    singleCheckText,
    isSelected,
    onClick,
    isLoading
}) => {
    return (
        <button className={`${isSelected ? 'bg-primary-normal text-[#fff]' : 'text-neutral-primary'} 
        px-6 py-1 rounded-[8px] text-[#ffffff] font-400 text-[14px]`}
            onClick={() =>
            onClick(singleCheckText)} >
            {singleCheckText}
        </button>
    );
};

export default SingleTickButton;
