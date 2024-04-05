import React from 'react';

export default function KYCTopWithType ({ Name, type, loading }) {
    return (
        <div
            className={`mx-10 px-[30px] pt-[24px] pb-[28px] mt-[32px] mb-[24px]
                flex justify-start items-center gap-5 bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
            <div className={`font-[700] text-[30px] leading-[40px] capitalize max-w-[calc(100vw-690px)]
                                 break-words ${loading ? 'bg-slate-200 mb-2' : ''}`} >
                {Name}
            </div>
            <div className='bg-background-light px-2.5 py-0.5 rounded text-primary-normal'>
                {type}
            </div>
        </div>
    );
}
