import React from 'react';

export default function KYCSections ({ childe, heading }) {
    return (
        <div
            data-testid="view_admin"
            className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
            <h1 className='text-[#4F5962] font-[600] text-[18px] leading-[26px] my-2'>
                {heading}
            </h1>
            {childe}
        </div>
    );
}
