/* eslint-disable max-len */
import React from 'react';

export default function ProfileName ({
    userButtonName,
    UserName,
    payMaartID,
    loading
}) {
    return (
        <div className={`flex gap-[27px] justify-center items-center ${loading ? 'animate-pulse z-0 ' : ''}`}>
            <div className={`${loading ? 'bg-slate-200 text-slate-200 ' : 'bg-primary-normal text-[#FFFFFF] '} h-[66px] w-[66px] flex justify-center items-center
                            font-[400] text-[24px] leading-[32px] rounded-[8px] uppercase`}>
                {userButtonName}
            </div>
            <div className={`${loading ? 'text-slate-200' : 'text-neutral-primary '}`}>
                <div className={`font-[700] text-[30px] leading-[40px] capitalize max-w-[calc(100vw-690px)]
                                 break-words ${loading ? 'bg-slate-200 mb-2' : ''}`} data-testid="name">
                    {UserName}
                </div>
                <div className={`text-[14px] leading-[24px] font-[400] ${loading ? 'bg-slate-200' : ''}`}>
                    Paymaart ID: <span data-testid="paymaart_id" className='font-[600]'>{payMaartID}</span>
                </div>
            </div>
        </div>
    );
}
