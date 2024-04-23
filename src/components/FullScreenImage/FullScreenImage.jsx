import React from 'react';
import Image from '../Image/Image';

const FullScreenImage = ({ onClose, labelValue, imagevalue, cdnImg }) => {
    return (
        <div data-testid="overview-modal" className="fixed inset-0 bg-black bg-opacity-50 flex flex-col z-10">
            <div className="flex justify-between items-center  pt-[43px]">
                <label className="text-[#fff] pl-16 font-600 text-[18px] capitalize">{labelValue}</label>
                <Image testId="close-button"
                    src="closeIcon" alt="Close" className="cursor-pointer pr-16" onClick={onClose} />
            </div>
            <div className="flex flex-grow items-center justify-center">
                <img src={cdnImg
                    ? `${imagevalue}`
                    : `images/${imagevalue}.svg`} alt="Centered Image" className="max-w-full max-h-[600px] p-10"/>
            </div>
        </div>
    );
};

export default FullScreenImage;
