import React from 'react';

export default function KYCTopWithType ({ Name, type, loading, buttonText, onClickButtonFunction, TestId }) {
    return (
        <div
            className={`mx-10 px-[30px] pt-[24px] pb-[28px] mt-[32px] mb-[24px]
                flex justify-between items-center gap-5 bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
            <div>
                <div className={`font-[700] text-[30px] leading-[40px] capitalize max-w-[calc(100vw-690px)]
                                 break-words ${loading ? 'bg-slate-200 mb-2' : ''}`} >
                    {Name}
                </div>
                {type && <div data-testid="KYC_Type" className='bg-background-light px-2.5 py-0.5 rounded text-primary-normal'>
                    {type}
                </div>}
            </div>
            {buttonText !== undefined && <button
                data-testid={TestId}
                onClick={() => onClickButtonFunction()}
                className='flex bg-primary-normal py-[8px] px-[16px] justify-center items-center h-[40px] rounded-[6px]'
            >
                <img
                    src={'/images/update.svg'}
                    alt="Icon"
                    className='mr-[8px]'
                />
                <p className='text-[14px] font-semibold text-[#ffffff]'>{buttonText}</p>
            </button>}
        </div>
    );
}
