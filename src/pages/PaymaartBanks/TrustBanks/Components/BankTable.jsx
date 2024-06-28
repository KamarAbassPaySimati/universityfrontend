/* eslint-disable max-len */
import React from 'react';
import Image from '../../../../components/Image/Image';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import formatTimestamp from '../../../../CommonMethods/formatTimestamp';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router';
import { formattedAmount } from '../../../../CommonMethods/formattedAmount';

const BankTable = (
    {
        loading, List, searchParams
    }

) => {
    const Navigate = useNavigate();

    const getUrl = (bank) => {
        const bankType = searchParams.get('type');
        let url;

        switch (bankType) {
        case 'trust-banks':
            url = `/paymaart-banks/trust-banks/view-trust-bank/${bank?.ref_no}`;
            break;
        case 'main-capital':
            url = `/paymaart-banks/main-capital/view-main-capital/${bank?.ref_no}`;
            break;
        case 'suspense-account':
            url = `/paymaart-banks/suspense-account/view-suspense-account/${bank?.ref_no}`;
            break;
        case 'transaction-fees-and-commissions':
            url = `/paymaart-banks/transaction-fees-and-commissions/view-transaction-fees-and-commissions/${bank?.ref_no}`;
            break;
        default:
            url = `/paymaart-banks/main-capital/view-main-capital/${bank?.ref_no}`;
            break;
        }
        return url;
    };

    return (
        <>
            <table className='w-full min-w-max '>
                {(List?.data?.length > 0 || loading) &&
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className={`border-b ${searchParams.get('type') === 'trust-banks' && List?.data?.length === 1 ? 'border-neutral-primary' : 'border-neutral-outline'} sticky top-0 bg-white z-10`}>
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[100px]'>Ref. No</th>
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[100px] '>Name</th>
                        {searchParams.get('type') === 'trust-banks' && (
                            <th className='py-2 px-[10px] text-left font-[400] min-w-[100px]'>Account Number</th>
                        )}
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[100px]'>Purpose</th>
                        <th className='py-2 px-[10px] text-left font-[400] min-w-[100px]'>Last Update Date / Time</th>
                        <th className='py-2 px-[10px] text-right font-[400] min-w-[100px]'>Balance (MWK)</th>
                        <th className='py-2 px-[10px]'></th>
                    </tr>
                </thead>}
                {loading
                    ? <Shimmer column={6} row={4} firstIndex/>
                    : <tbody className={` text-neutral-primary whitespace-nowrap text-[14px]
                    leading-[24px]`}>
                        {List?.data?.map((bank, index) => (
                            <tr key={index} className={`${bank?.ref_no === 'PTBAT' ? 'border-t border-b border-neutral-primary font-semibold' : 'border-neutral-outline font-normal'} ${searchParams.get('type') === 'trust-banks' && List?.data?.length > 1 && index !== List.data.length - 2 ? 'border-b' : searchParams.get('type') !== 'trust-banks' ? 'border-b' : ''} h-[48px]`}>
                                <td data-testid="paymaart_id" title = {bank?.ref_no}
                                    className='py-2 px-[10px] text-left truncate max-w-[50px]'>{bank?.ref_no || '-'}</td>
                                <td data-testid="name" title = {`${bank?.name}`}
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                                    {`${bank?.name}`}</td>
                                {searchParams.get('type') === 'trust-banks' && (
                                    <td data-testid="email" title = {bank?.account_number} className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                        {bank?.account_number === null ? '-' : bank?.account_number}</td>
                                )}
                                <td data-testid="user_role" title={bank?.purpose}
                                    className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                    {bank?.ref_no === 'PTBAT' ? '-' : bank?.purpose}
                                </td>
                                <td title = {bank?.updated_at} className='py-2 px-[10px] text-left truncate max-w-[300px]]'>{ bank?.updated_at ? formatTimestamp(bank?.updated_at) : '-'}</td>
                                <td title={formattedAmount(bank?.balance).split('MWK')[1].trim()} className='py-2 px-[10px] text-right truncate max-w-[300px]'>
                                    {formattedAmount(bank?.balance).split('MWK')[1].trim()}
                                </td>

                                <td className={'py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-end'}>
                                    <>
                                        <Image
                                            toolTipId={`eye-${index}`}
                                            testId={`view-${index}`}
                                            src='eye'
                                            className={'cursor-pointer'}
                                            onClick={() => Navigate(getUrl(bank)) }
                                        />
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
