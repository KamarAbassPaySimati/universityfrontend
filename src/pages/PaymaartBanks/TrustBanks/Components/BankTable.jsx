/* eslint-disable max-len */
import React from 'react';
import Image from '../../../../components/Image/Image';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import formatTimestamp from '../../../../CommonMethods/formatTimestamp';
import { Tooltip } from 'react-tooltip';

const BankTable = (
    {
        loading, List
    }
) => {
    return (
        <>
            {console.log(loading, 'loaddd')}
            {console.log(List?.data?.length, '00000')}
            <table className='w-full min-w-max'>
                {(List?.data?.length > 0 || loading) &&
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className={`border-b ${List?.data?.length === 1 ? 'border-neutral-primary' : 'border-neutral-outline'} sticky top-0 bg-white z-10`}>
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[100px]'>Ref. No</th>
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[100px] '>Name</th>
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[100px]'>Account Number</th>
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[100px]'>Purpose</th>
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[100px]'>Last Update Date / Time</th>
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[100px]'>Balance</th>
                        <th className='py-2 px-[10px]'></th>
                    </tr>
                </thead>}
                {loading
                    ? <Shimmer column={6} row={4} firstIndex/>
                    : <tbody className={` text-neutral-primary whitespace-nowrap text-[14px]
                    leading-[24px]`}>
                        {List?.data?.map((bank, index) => (
                            <tr key={index} className={`${index > 0 && index < List.data.length ? 'border-b border-neutral-primary' : 'border-b border-neutral-outline'} ${bank?.ref_no === 'PTBAT' ? 'border-t border-neutral-primary' : 'border-t border-neutral-outline'} ${bank?.ref_no === 'PTBAT' ? 'font-[600]' : 'font-[400]'} h-[48px]`}>

                                <td data-testid="paymaart_id" title = {bank?.ref_no}
                                    className='py-2 px-[10px] text-left truncate max-w-[50px]'>{bank?.ref_no || '-'}</td>
                                <td data-testid="name" title = {`${bank?.name}`}
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                                    {`${bank?.name}`}</td>
                                <td data-testid="email" title = {bank?.account_number} className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                    {bank?.account_number}</td>
                                <td data-testid="user_role" title={bank?.purpose}
                                    className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                    {bank?.purpose == null ? '-' : bank?.purpose}
                                </td>
                                <td title = {bank?.updated_at} className='py-2 px-[10px] text-left truncate max-w-[300px]]'>{ bank?.updated_at ? formatTimestamp(bank?.updated_at) : '-'}</td>
                                <td title = {bank?.balance} className='py-2 px-[10px] text-left truncate max-w-[300px]]'>{(bank?.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, style: 'currency', currency: 'MWK' }) }</td>
                                <td className={'py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-end'}>
                                    <>
                                        <Image toolTipId={`eye-${index}`} testId={`view-${index}`} src='eye' className={'cursor-pointer'} />
                                    </>
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
        </>
    );
};

export default BankTable;
