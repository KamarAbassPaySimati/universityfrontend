import React from 'react';
import ViewDetail from '../../../components/ViewDeatilComponent/ViewDeatil';

export default function BankDetails ({ loading, bankDetails }) {
    return (
        <div data-testid="view_admin"
            className={`max-h-[calc(100vh-120px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
            <h1 className='text-[#4F5962] font-semibold text-[18px] leading-[26px] my-2'>
                Bank Details
            </h1>
            <div className='w-full flex flex-wrap mt-1 -mx-1'>
                {loading
                    ? ([...Array(6)].map((_, ind) => (
                        <div className='w-1/3 px-1' key={_}>
                            <ViewDetail
                                itemkey='Loading...'
                                userDetails='Loading...'
                                loading={loading}
                            />
                        </div>
                    )))
                    : (Object.keys(bankDetails).map((itemkey, index = 0) => (
                        bankDetails[itemkey] !== undefined &&
                        <div key={index} className='w-1/3 px-1'>
                            <ViewDetail
                                itemkey={itemkey.replaceAll('_', ' ')}
                                userDetails={bankDetails[itemkey]}
                                loading={loading}
                            />
                        </div>)
                    ))}
            </div>
        </div>
    );
}
