/* eslint-disable max-len */
import React from 'react';
import Image from '../../../../components/Image/Image';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import { Tooltip } from 'react-tooltip';
import { handleSort } from '../../../../CommonMethods/ListFunctions';
import { useNavigate } from 'react-router';
import convertTimestampToCAT from '../../../../CommonMethods/timestampToCAT';
import { formattedAmount } from '../../../../CommonMethods/formattedAmount';
import formatID from '../../../../CommonMethods/formatId';

const PayOutTable = (
    {
        loading, error, List, setSearchParams, notFound, searchParams
    }
) => {
    const getStatusStyles = (status) => {
        switch (status) {
        case 'pending':
            return 'bg-[#F0ECFF] text-[#67389A]';
        case 'approved':
            return 'bg-accent-positive-secondary text-accent-positive';
        case 'rejected':
            return 'bg-accent-negative-secondary text-primary-negative';
        default:
            return ''; // Default styles when status doesn't match any condition
        }
    };
    const getStatusText = (status) => {
        switch (status) {
        case 'pending':
            return 'Pending';
        case 'approved':
            return 'Approved';
        case 'rejected':
            return 'Rejected';
        default:
            return '-'; // Default text when status doesn't match any condition
        }
    };
    const geturl = () => {
        // switch (searchParams.get('type')) {
        // case 'agents':
        //     return '/verify/kyc-registration/agent-profile/';
        // case 'merchants':
        //     return '/verify/kyc-registration/merchant-profile/';
        // case 'customers':
        //     return '/verify/kyc-registration/customer-profile/';
        // default:
        //     // Add a fallback return value here
        //     return '/verify/kyc-registration/';
        // }
        return '/transactions/pay-out-requests/';
    };

    const Navigate = useNavigate();
    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.records?.length > 0 || loading) &&
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[200px]'>Pay-out Request ID</th>
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[200px]'>Recipient Paymaart ID</th>
                        <th className='py-2 px-[10px] text-right font-[400] min-w-[200px]'>Amount</th>
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[200px]'>
                            <div className='cursor-pointer flex gap-1 w-fit' data-testid="sort_submission_date" onClick={() => handleSort('order_by', searchParams, setSearchParams)}>
                                <span>Date/Time In, CAT</span>
                                <Image src='sort_icon' />
                            </div>
                        </th>
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[200px]'>Status</th>
                        <th className='py-2 px-[10px]'></th>
                    </tr>
                </thead>}
                {loading
                    ? <Shimmer column={6} row={10} firstIndex/>
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        { List?.records?.map((user, index) => (
                            <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                                <td data-testid="paymaart_id" title={user?.transaction_id}
                                    className='py-2 px-[10px] text-left truncate'>{user?.transaction_id || '-'}</td>
                                <td data-testid="recipient_paymaart_id" title={formatID(user?.recipient_id)}
                                    className='py-2 px-[10px] text-left truncate'>{formatID(user?.recipient_id) || '-'}
                                </td>
                                <td data-testid="amount" title={`${formattedAmount(user?.amount)} MWK`}
                                    className='py-2 px-[10px] text-right truncate'>{`${formattedAmount(user?.amount)} MWK` || '-'}
                                </td>
                                <td data-testid="submission_date" title = {convertTimestampToCAT(user?.created_at)} className='py-2 px-[10px] text-left truncate'>
                                    {convertTimestampToCAT(user?.created_at)}</td>
                                <td data-testid="status" className='py-2 px-[10px]'>
                                    {user?.status
                                        ? (
                                            <span className={`py-[4px] px-[10px] rounded text-[13px] font-semibold capitalize ${getStatusStyles(user?.status)} `} title={getStatusText(user?.kyc_status)}>
                                                {getStatusText(user?.status)}
                                            </span>
                                        )
                                        : (
                                            <span className='text-neutral-secondary'>
                                                -
                                            </span>
                                        )}
                                </td>

                                <td className={'py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-start'}>
                                    {
                                        <>
                                            <Image toolTipId={`eye-${index}`} testId={`view-${index}`} src='eye' className={'cursor-pointer'}
                                                onClick={() => Navigate(`${geturl()}${user?.request_id}`, { state: { page: searchParams.get('page'), payoutRequest: 'payoutRequest', type: searchParams.get('type'), search: searchParams.get('search') ? searchParams.get('search') : '' } }
                                                )}
                                            />
                                        </>
                                    }
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
            {/* {!notFound && error &&
            (<NoDataError heading='No profiles for verification' text='No profiles currently require verification. Please check back later' />)}
            {List?.data?.length === 0 && !loading &&
            (searchParams.get('simplifiedkyc') !== null || searchParams.get('fullkyc') !== null || searchParams.get('search') !== null) &&
            (<NoDataError className='h-tableHeight' heading='No data found' text='Try adjusting your search or filter to find what you’re looking for' />)} */}

        </>
    );
};

export default PayOutTable;
