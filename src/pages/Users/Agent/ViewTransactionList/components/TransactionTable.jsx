/* eslint-disable max-len */
import React from 'react';
import Shimmer from '../../../../../components/Shimmers/Shimmer';
import NoDataError from '../../../../../components/NoDataError/NoDataError';
import Image from '../../../../../components/Image/Image';
import convertTimestampToCAT from '../../../../../CommonMethods/timestampToCAT';
import { useNavigate } from 'react-router';
import { formattedAmount } from '../../../../../CommonMethods/formattedAmount';

const TransactionTable = ({ loading, error, List, notFound, searchParams, setSearchParams, paymaartId, type }) => {
    const navigate = useNavigate();

    // Mapping of original keys to desired transformations
    const keyTransformations = {
        'Pay-in': 'pay_in',
        'Pay-out': 'pay_out',
        'Cash-in': 'cash_in',
        'Cash-out': 'cashout',
        'Pay Paymaart': 'paymaart',
        'Pay Afrimax': 'afrimax',
        'Pay Merchant': 'merchant',
        Other: 'other',
        'Un-registered Cash-in': 'unregistered_cash_in',
        'Un-registered Cash-out': 'unregistered_cashout',
        'Cash-out request': 'cashout_request'
    };

    const getKeyByValue = (obj, value) => {
        console.log(Object.keys(obj).find(key => obj[key] === value), 'llll');
        return Object.keys(obj).find(key => obj[key] === value);
    };

    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.transactions?.length > 0 || loading) &&
                    <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                        <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                            <th className='py-2 px-[10px] text-left font-[400] '>Service Code</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Date/ Time, CAT</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Transaction ID</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Beneficiary Paymaart ID</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Type</th>
                            <th className='py-2 px-[10px] text-right font-[400]'>Amount (MWK)</th>
                            <th className='py-2 px-[10px] min-w-[60px]'></th>
                        </tr>
                    </thead>
                }
                {loading
                    ? <Shimmer column={7} row={10} firstIndex />
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        {List?.transactions?.map((transaction, index) => (
                            <tr className='border-b border-neutral-outline h-[48px]' key={`transactions${index}`}>
                                <td data-testid="transaction_code"
                                    className='py-2 px-[10px] text-left truncate max-w-[200px] min-w-[100px]'>
                                    {transaction?.transaction_code || '-'}
                                </td>
                                <td data-testid="dateRow"
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                                    {convertTimestampToCAT(transaction?.created_at) || '-'}
                                </td>
                                <td data-testid="transaction_id"
                                    className='py-2 px-[10px] text-left truncate max-w-[200px] min-w-[250px]'
                                    title={transaction?.transaction_id || '-'}
                                >
                                    {transaction?.transaction_id || '-'}
                                </td>
                                <td data-testid="beneficiary_id"
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                                    {transaction?.receiver_id || '-'}
                                </td>
                                <td data-testid="transaction_type"
                                    className="py-2 px-[10px] text-left truncate max-w-[200px]"
                                    title={getKeyByValue(keyTransformations, transaction?.transaction_type) || transaction?.transaction_type.replace(/\b\w/g, char => char.toUpperCase()).replace(/_/g, ' ')}
                                >
                                    {getKeyByValue(keyTransformations, transaction?.transaction_type) || transaction?.transaction_type.replace(/\b\w/g, char => char.toUpperCase()).replace(/_/g, ' ')}
                                </td>
                                <td data-testid="transaction_amount"
                                    className='py-2 px-[10px] text-right truncate max-w-[200px]'>
                                    {`${formattedAmount(Math.abs(transaction?.transaction_amount))}` || '0.00'}
                                </td>
                                <td data-testid='transaction_view'
                                    className='py-2 px-[10px] flex items-center justify-center h-[48px]'>
                                    <Image toolTipId={`eye-${index}`} onClick={() => navigate(`/users/${type}/${type}-transaction-histories/view/${paymaartId}/${transaction?.transaction_type}/${transaction?.id}`)} testId={`view-${index}`} src='eye' className={'cursor-pointer'} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            </table>
            {!notFound && error &&
                (<NoDataError heading='No transaction history to view yet' text='Please check back later' />)}
            {List?.transactions?.length === 0 && !loading &&
                (searchParams.get('transaction_type') !== null || searchParams.get('search') !== null || searchParams.get('start_date') !== null || searchParams.get('end_date') !== null) &&
                (<NoDataError className='h-tableHeight' heading='No data found' text='Try adjusting your search or filter to find what you’re looking for' />)}
        </>
    );
};
export default TransactionTable;
