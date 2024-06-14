/* eslint-disable max-len */
import React from 'react';

export default function ProfileName ({
    userButtonName,
    UserName,
    payMaartID,
    loading,
    lastLoggedIn,
    CreatedDate,
    viewType,
    profilePicture,
    Amount,
    g2pCustomer
}) {
    return (
        <div className={`flex gap-[27px] justify-center items-center ${loading ? 'animate-pulse z-0 ' : ''}`}>
            {profilePicture
                ? (<div>
                    <img src={profilePicture} alt="profilePicture" className='h-[66px] rounded-[8px] w-fit' />
                </div>)
                : (<div className={`${loading ? 'bg-slate-200 text-slate-200 ' : 'bg-primary-normal text-[#FFFFFF] '} h-[66px] px-2 w-fit flex justify-center items-center
                            font-[400] text-[24px] leading-[32px] rounded-[8px] uppercase`}>
                    {userButtonName}
                </div>)
            }
            <div className={`${loading ? 'text-slate-200' : 'text-neutral-primary '}`}>
                <div className={`font-[700] text-[30px] leading-[40px] capitalize max-w-[calc(100vw-690px)]
                                 break-words ${loading ? 'bg-slate-200 mb-2' : ''}`} data-testid="name">
                    {UserName}
                </div>
                <div className={`text-[14px] leading-[24px] font-[400] ${loading ? 'bg-slate-200' : ''}`}>
                    Paymaart ID: <span data-testid="paymaart_id" className='font-semibold'>{payMaartID}</span>
                </div>
                {g2pCustomer &&
                <div className='flex items-center'>
                    <div className={`text-[14px] leading-[24px] font-[400] ${loading ? 'bg-slate-200' : ''}`}>
                        Amount: <span data-testid="paymaart_id" className='font-semibold'>{Amount}</span>
                    </div>
                    <div className={`ml-6 ${loading ? 'bg-slate-200' : ''}`}>
                        Created Date: <span data-testid="paymaart_id" className='font-semibold mr-4'>{CreatedDate}</span>
                    </div>
                </div>}
                {viewType === 'specific' && lastLoggedIn && <div className={`text-[14px] leading-[24px] font-[400] ${loading ? 'bg-slate-200' : ''}`}>
                    Created Date: <span data-testid="paymaart_id" className={`font-semibold mr-4 ${loading ? 'bg-slate-200' : ''}`}>{CreatedDate}</span>
                    Last Logged in: <span data-testid="paymaart_id" className={`font-semibold ${lastLoggedIn !== 'Online' ? '' : 'text-accent-positive'}`}>{lastLoggedIn}</span>
                </div>}
            </div>
        </div>
    );
}
