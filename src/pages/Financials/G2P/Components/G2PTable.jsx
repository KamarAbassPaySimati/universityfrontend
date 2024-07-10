/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router';
import { Tooltip } from 'react-tooltip';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import Image from '../../../../components/Image/Image';
import NoDataError from '../../../../components/NoDataError/NoDataError';
import convertTimestampToCAT from '../../../../CommonMethods/timestampToCAT';

function G2PTable ({ loading, error, List, notFound, searchParams, setSearchParams }) {
    const Navigate = useNavigate();

    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.data?.length > 0 || loading) &&
                    <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                        <tr className='border-b border-neutral-outline sticky top-0 bg-white z-10'>
                            <th className='py-2 px-[10px] text-left font-[400]'>G2P Customer Name</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Paymaart ID</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Created Date, CAT</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Amount</th>
                            <th className='py-2 px-[10px]'></th>
                        </tr>
                    </thead>
                }
                {loading
                    ? <Shimmer column={5} row={10} firstIndex />
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        {List?.data?.map((user, index) => (
                            <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                                <td data-testid="customer_name" title={user?.full_name}
                                    className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]'>{user?.full_name ? user.full_name : '-'}</td>
                                <td data-testid="paymaart_id" title={user?.paymaart_id}
                                    className='py-2 px-[10px] text-left truncate min-w-[70px] max-w-[70px]'>{user?.paymaart_id || '-'}</td>
                                <td className='py-2 px-[10px]'>{convertTimestampToCAT(user?.created_at)}</td>
                                <td data-testid="amount" title={user?.amount.toLocaleString()}
                                    className='py-2 px-[10px] truncate min-w-[100px] max-w-[100px]'>
                                    {user?.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className='py-3 px-[10px] mr-1 ml-1 min-w-[75px] max-w-[100px] flex gap-[19px] text-center align-center justify-end'>
                                    <Image className='cursor-pointer' toolTipId={`eye-${index}`} src='eye' testId={`view-${index}`}
                                        onClick={() => Navigate(`/financials/g2p/view-profile/${user?.transaction_id}`)} />
                                    {/* <Image className='cursor-pointer' toolTipId={`payin-${index}`} src='payin' /> */}
                                    <Tooltip
                                        id={`eye-${index}`}
                                        className='my-tooltip z-30'
                                        place="top"
                                        content="View"
                                    />
                                </td>
                            </tr>))}
                    </tbody>
                }
            </table>
            {!notFound && error &&
                (<NoDataError heading='There are no agents added yet' text='Click “Register Agent ” to add agent' />)}
            {List?.data?.length === 0 && !loading &&
                (searchParams.get('status') !== null || searchParams.get('search') !== null) &&
                (<NoDataError className='h-tableHeight' heading='There are no G2P list to view yet' />)}
        </>
    );
}

export default G2PTable;
