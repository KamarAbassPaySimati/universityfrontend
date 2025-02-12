/* eslint-disable max-len */
import React from 'react';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import NoDataError from '../../../../components/NoDataError/NoDataError';
import Image from '../../../../components/Image/Image';
import { handleSort } from '../../../../CommonMethods/ListFunctions';
import ReportedMerchantTableBody from './ReportedMerchantTableBody';

const ReportedMerchantTable = ({ loading, error, List, notFound, searchParams, setSearchParams, GetList }) => {
    console.log(List?.data, 'List');
    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.data?.length > 0 || loading) &&
                    <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                        <tr className='border-b border-neutral-outline sticky top-0 bg-white z-10'>
                            <th className='py-2 px-[10px] text-left font-[400]'>Paymaart ID</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>
                                <div data-testid="sort_merchant_name" className='cursor-pointer flex gap-1 w-fit' onClick={() => handleSort('name', searchParams, setSearchParams)}>
                                    <span>Name</span>
                                    <Image src='sort_icon' />
                                </div>
                            </th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Phone Number</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Email</th>
                            <div data-testid="sort_merchant_name" className='cursor-pointer flex gap-1 w-fit py-2 px-[10px] text-left font-[400]' onClick={() => handleSort('name', searchParams, setSearchParams)}>
                                <span>Reported date</span>
                                <Image src='sort_icon' />
                            </div>
                            <th className='py-2 px-[10px]'></th>
                        </tr>
                    </thead>
                }
                {loading
                    ? <Shimmer column={6} row={10} firstIndex />
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        {List?.data?.map((user, index) => (
                            <ReportedMerchantTableBody key={index} user={user} index={index} GetList={GetList} />
                        ))}
                    </tbody>
                }
            </table>
            {!notFound && error &&
                (<NoDataError heading='No merchants reported yet' text='please check back later' />)}
            {List?.data?.length === 0 && !loading &&
                (searchParams.get('status') !== null || searchParams.get('search') !== null) &&
                (<NoDataError className='h-tableHeight' heading='No data found' text='Try adjusting your search or filter to find what you’re looking for' />)}
        </>
    );
};
export default ReportedMerchantTable;
