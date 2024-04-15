import React from 'react';

const FullScreenImage = ({ onClose, labelValue, imagevalue }) => {
    return (
        <div data-testid="overview-modal" className="fixed inset-0 bg-black bg-opacity-50 flex flex-col">
            <div className="flex justify-between items-center  pt-[43px]">
                <label className="text-[#fff] pl-16 font-600 text-[18px]">{labelValue}</label>
                <img data-testid="close-button"
                    src="images/closeIcon.svg" alt="Close" className="cursor-pointer pr-16" onClick={onClose} />
            </div>
            <div className="flex flex-grow items-center justify-center">
                <img src={`images/${imagevalue}.svg`} alt="Centered Image" className="max-w-full max-h-full"/>
            </div>
        </div>

    );
};

export default FullScreenImage;
