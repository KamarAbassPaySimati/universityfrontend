import React from 'react';

export default function BankViewTopHeader ({ loading, Name, Balance }) {
    return (
        <>
            <div
                className={`mx-10 px-[30px] pt-[24px] pb-[28px] mt-[32px] mb-[24px]
                 gap-5 bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                <div>
                    <div className={`font-[700] text-[30px] leading-[40px] capitalize max-w-[calc(100vw-690px)]
                                 break-words ${loading ? 'bg-slate-200 mb-2' : ''}`} >
                        {Name}
                    </div>
                </div>

                <p className='mt-2 text-[#4F5962] text-sm font-semibold'>{Balance}</p>
            </div>
        </>
    );
}
