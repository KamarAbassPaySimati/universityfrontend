/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router';
import Image from '../../../../components/Image/Image';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import convertTimestampToCAT from '../../../../CommonMethods/timestampToCAT';
import { Tooltip } from 'react-tooltip';
import NoDataError from '../../../../components/NoDataError/NoDataError';
import { formattedAmount } from '../../../../CommonMethods/formattedAmount';
import { getStatusColor } from '../../../../components/KYC/KYCView/KYCViewFunctions';
import formatID from '../../../../CommonMethods/formatId';

const Table = ({ loading, error, List, notFound, searchParams, setSearchParams, accessRole }) => {
    const Navigate = useNavigate();
    console.log('transactions', List);
    const obj = {
        ft01: 'Transaction & System Failures',
        ft02: 'Policy Clarity & Customer Support',
        ft03: 'Service Quality & Marketing Accuracy',
        ft04: 'User Experience Challenges'
    };
    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.transactions?.length > 0 || loading) &&
                    <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                        <tr className='border-b border-neutral-outline sticky top-0 bg-white z-10'>
                            <th className='py-2 px-[10px] text-left font-[400]'>Date/Time In, CAT</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Transaction ID</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Flagged by</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Beneficiary Paymaart ID</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Reversal Admin</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Reason</th>
                            <th className='py-2 px-[10px] text-right font-[400]'>Amount (MWK)</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                            <th className='py-2 px-[10px]'></th>
                        </tr>
                    </thead>
                }
                {loading
                    ? <Shimmer column={9} row={10} firstIndex />
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        {List?.transactions?.map((user, index) => (
                            <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                                <td data-testid="paymaart_id" title={convertTimestampToCAT(user?.created_at) || '-'} className='py-2 px-[10px] text-left truncate min-w-[200px] max-w-[200px]'>{convertTimestampToCAT(user?.created_at) || '-'}</td>
                                <td data-testid="transaction_id" title={user?.transaction_id} className='py-2 px-[10px] truncate min-w-[250px] max-w-[250px]'>{user?.transaction_id || '-'}</td>
                                <td data-testid="flagged_by" title={user?.flagged_by} className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]'>{formatID(user?.flagged_by) || '-'}</td>
                                <td data-testid={`beneficiary_paymaart_id_${user.status === 'pending' ? 'pending' : 'other'}`} title={formatID(user?.receiver_id)} className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]'>{formatID(user?.receiver_id) || '-'}</td>
                                <td data-testid="reversal_admin_name" title={user?.reversal_admin_name} className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]'>{`${user?.reversal_admin_name || '-'}`}</td>
                                <td data-testid="reason" title={user?.reasons.map(key => obj[key]).join(', ')} className='py-2 px-[10px] truncate min-w-[250px] max-w-[250px]'>{`${user?.reasons.map(key => obj[key]).join(', ')}` || '-'}</td>
                                <td data-testid="amount" title={formattedAmount(user?.amount)} className='py-2 px-[10px] text-right truncate min-w-[150px] max-w-[150px]'>{`${formattedAmount(Math.abs(user?.amount)) || '0.00'} `}</td>

                                <td data-testid="status" className='py-2 px-[10px]'>
                                    {user?.status
                                        ? (
                                            <span className={`py-[2px] px-[10px] rounded text-[13px] font-semibold capitalize 
                                            ${getStatusColor(user.status).color}`}>
                                                {getStatusColor(user.status).text}
                                            </span>
                                        )
                                        : (
                                            <span className='text-neutral-secondary'>
                                                -
                                            </span>
                                        )}
                                </td>
                                <td className='py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-end'>
                                    <Image className='cursor-pointer' toolTipId={`eye-${index}`} src='eye' testId={`view-${user.status === 'pending' ? 'pending' : 'other'}`}
                                        onClick={() => Navigate(`/transactions/flagged/view/${user?.sender_id}/${user?.transaction_type}/${user?.id}`
                                        )} />
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
                (<NoDataError className='h-tableHeight' heading='There are no agents added yet' text='Click “Register Agent ” to add agent' />)}
            {List?.data?.length === 0 && !loading &&
                (searchParams.get('status') !== null || searchParams.get('search') !== null) &&
                (<NoDataError className='h-tableHeight' heading='No data found' text='Try adjusting your search or filter to find what you’re looking for' />)}
        </>
    );
};

export default Table;
