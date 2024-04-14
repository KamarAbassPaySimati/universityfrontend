import React from 'react';
import Image from '../Image/Image';

export default function DocumentSidebar ({ documentTypes, handleOnClick, selectedData }) {
    const getColor = (type) => {
        switch (type) {
        case 'pending':
            return <Image src='documentError' className="w-7 h-7 green-tick" />;
        case 'filled':
            return <div
                class={'rounded-full  w-7 h-7 flex items-center justify-center bg-accent-positive-secondary'}>
                <Image src='greenTick' className="w-5 h-5 green-tick" />
            </div>;
        case 'clear':
        default:
            break;
        }
    };
    return (
        <div className='w-[30%] border-r-[2px] border-[#000000] h-heightSideBar' >
            {Object.keys(documentTypes).map((docItem) => (
                <div className='flex items-center mb-[30px]' key={docItem}>
                    {/* for the not selected one we have to give text color as neutral-secondary */}
                    <p
                        className={`cursor-pointer font-bold text-[16px] leading-4 
                        ${selectedData === docItem ? 'text-neutral-primary' : 'text-neutral-secondary'}  mr-[18px]`}
                        onClick={() => handleOnClick(docItem)}
                    >{docItem}</p>
                    {getColor(documentTypes[docItem])}
                </div>))}
        </div>
    );
}
