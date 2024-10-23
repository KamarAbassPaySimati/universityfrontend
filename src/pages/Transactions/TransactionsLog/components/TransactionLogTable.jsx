/* eslint-disable max-len */
import React, { useState } from 'react';
import Image from '../../../../components/Image/Image';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import { handleSortWithKey } from '../../../../CommonMethods/ListFunctions';
import convertTimestampToCAT from '../../../../CommonMethods/timestampToCAT';
import { formattedAmount } from '../../../../CommonMethods/formattedAmount';
import IframeModal from '../../../../components/Iframe/IframeModal';
import { getStatusStyles, getStatusText } from '../../../../CommonMethods/getStatusUI';
import formatID from '../../../../CommonMethods/formatId';
import formatPhoneNumber from '../../../../CommonMethods/formatPhoneNumber';

const TransactionLogTable = ({ loading, error, List, setSearchParams, notFound, searchParams }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const getStatus = (transactionType) => {
        console.log(transactionType);
        switch (transactionType) {
        case 'payout':
            return 'pending';
        case 'payout_reject':
            return 'rejected';
        case 'payout_approved':
            return 'approved';
        default:
            return '-'; // Default text when status doesn't match any condition
        }
    };

    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.data?.length > 0 || loading) &&
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400]'>
                            <div className='cursor-pointer flex gap-1 w-fit' data-testid="sort_submission_date" onClick={() => handleSortWithKey('sort_by', searchParams, setSearchParams)}>
                                <span>Date/Time, CAT</span>
                                <Image src='sort_icon' />
                            </div>
                        </th>
                        <th className='py-2 px-[10px] text-left font-[400] '>Transaction ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Beneficiary Paymaart ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Entry By</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Bank Name</th>
                        <th className='py-2 px-[10px] text-center font-[400]'>Transaction POP</th>
                        <th className='py-2 px-[10px] text-right font-[400]'>Amount (MWK)</th>
                        {searchParams.get('type') === 'pay-out' && <th className='py-2 px-[10px] text-left font-[400] min-w-[100px]'>Status</th>}
                    </tr>
                </thead>}
                {loading
                    ? <Shimmer column={searchParams.get('type') === 'pay-out' ? 8 : 7} row={10} firstIndex/>
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        { List?.data?.map((item, index) => (
                            <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                                <td data-testid="date" title = {convertTimestampToCAT(item?.created_at)} className='py-2 px-[10px] text-left truncate max-w-[200px] min-w-[200px]'>
                                    {convertTimestampToCAT(item?.created_at)}
                                </td>
                                <td data-testid="transaction_id" title={item?.transaction_id}
                                    className='py-2 px-[10px] text-left truncate max-w-[250px] min-w-[250px]'>{item?.transaction_id || '-'}
                                </td>
                                <td data-testid="beneficiary_paymaart_id" title={item?.reciever_id?.startsWith('+') ? formatPhoneNumber(item?.reciever_id) : formatID(item?.reciever_id)}
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>{(item?.reciever_id?.startsWith('+') ? formatPhoneNumber(item?.reciever_id) : formatID(item?.reciever_id)) || '-'}
                                </td>
                                <td data-testid="entry_by" title={formatID(item?.entered_by)}
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>{formatID(item?.entered_by) || '-'}
                                </td>
                                <td data-testid="bank_name" title={item?.bank_name || item?.name || '-'}
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>{item?.bank_name || item?.name || '-'}
                                </td>
                                <td data-testid="pop"
                                    className='py-2 px-[10px] flex items-center justify-center truncate max-w-[200px]'>
                                    {item.pop_file_key
                                        ? <Image toolTipId={`eye-${index}`} onClick={() => setSelectedIndex(item.pop_file_key)} testId={`view-${index}`} src='eye' className={'cursor-pointer'} />
                                        : '-'}
                                </td>
                                <td data-testid="amount" title={`${formattedAmount(item?.transaction_amount)} MWK`}
                                    className='py-2 px-[10px] text-right truncate max-w-[200px]'>{`${formattedAmount(Math.abs(item?.transaction_amount))}` || '0.00'}
                                </td>
                                {searchParams.get('type') === 'pay-out' &&
                                <td data-testid="status" className='py-2 px-[10px]'>
                                    {item?.transaction_type
                                        ? (
                                            <span className={`py-[4px] px-[10px] rounded text-[13px] font-semibold capitalize ${getStatusStyles(getStatus(item?.transaction_type))} `} title={getStatusText(getStatus(item?.transaction_type))}>
                                                {getStatusText(getStatus(item?.transaction_type))}
                                            </span>
                                        )
                                        : (
                                            <span className='text-neutral-secondary'>
                                                -
                                            </span>
                                        )}
                                </td>}
                            </tr>))}
                    </tbody>
                }
            </table>
            {selectedIndex !== null && <IframeModal
                isOpen={selectedIndex !== null} handleClose={() => setSelectedIndex(null)} link={selectedIndex}
                labelValue={selectedIndex?.split('/')[selectedIndex?.split('/').length - 1]}
            />}
        </>
    );
};

export default TransactionLogTable;
