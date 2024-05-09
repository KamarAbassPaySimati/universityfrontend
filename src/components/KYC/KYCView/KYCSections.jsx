import React from 'react';

export default function KYCSections ({ childe, heading, testId }) {
    return (
        <div
            data-testid={testId}
            className={`mx-10 mb-4 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
            <h1 className='text-[#4F5962] font-[600] text-[18px] leading-[26px] my-2'>
                {heading}
            </h1>
            {childe}
        </div>
    );
}
