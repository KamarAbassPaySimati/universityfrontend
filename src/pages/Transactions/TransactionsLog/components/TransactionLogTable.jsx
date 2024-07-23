/* eslint-disable max-len */
import React, { useState } from 'react';
import Image from '../../../../components/Image/Image';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import { handleSort } from '../../../../CommonMethods/ListFunctions';
import convertTimestampToCAT from '../../../../CommonMethods/timestampToCAT';
import { formattedAmount } from '../../../../CommonMethods/formattedAmount';
import IframeModal from '../../../../components/Iframe/IframeModal';

const TransactionLogTable = ({ loading, error, List, setSearchParams, notFound, searchParams }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.records?.length > 0 || loading) &&
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400]'>
                            <div className='cursor-pointer flex gap-1 w-fit' data-testid="sort_submission_date" onClick={() => handleSort('order_by', searchParams, setSearchParams)}>
                                <span>Date/Time, CAT</span>
                                <Image src='sort_icon' />
                            </div>
                        </th>
                        <th className='py-2 px-[10px] text-left font-[400] '>Transaction ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Beneficiary Paymaart ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Entry Admin</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Bank Name</th>
                        <th className='py-2 px-[10px] text-center font-[400]'>Transaction POP</th>
                        <th className='py-2 px-[10px] text-right font-[400]'>Amount (MWK)</th>
                    </tr>
                </thead>}
                {loading
                    ? <Shimmer column={7} row={10} firstIndex/>
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        { List?.records?.map((item, index) => (
                            <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                                <td data-testid="date" title = {convertTimestampToCAT(item?.created_at)} className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                    {convertTimestampToCAT(item?.created_at)}
                                </td>
                                <td data-testid="transaction_id" title={item?.transaction_id}
                                    className='py-2 px-[10px] text-left truncate max-w-[50px]'>{item?.transaction_id || '-'}
                                </td>
                                <td data-testid="beneficiary_paymaart_id" title={item?.beneficiary_paymaart_id}
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>{item?.beneficiary_paymaart_id || '-'}
                                </td>
                                <td data-testid="entry_admin" title={item?.entry_admin}
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>{item?.entry_admin || '-'}
                                </td>
                                <td data-testid="bank_name" title={item?.bank_name}
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>{item?.bank_name || '-'}
                                </td>
                                <td data-testid="pop"
                                    className='py-2 px-[10px] flex items-center justify-center truncate max-w-[200px]'>
                                    {item.pop_file_key
                                        ? <Image toolTipId={`eye-${index}`} onClick={() => setSelectedIndex(item.pop_file_key)} testId={`view-${index}`} src='eye' className={'cursor-pointer'} />
                                        : '-'}
                                </td>
                                <td data-testid="amount" title={`${formattedAmount(item?.amount)} MWK`}
                                    className='py-2 px-[10px] text-right truncate max-w-[200px]'>{`${formattedAmount(item?.amount)}` || '0.00'}
                                </td>
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
