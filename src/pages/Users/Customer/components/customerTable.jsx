/* eslint-disable max-len */
import React from 'react';

import { Tooltip } from 'react-tooltip';

import Image from '../../../../components/Image/Image';
import { formatInputPhone } from '../../../../CommonMethods/phoneNumberFormat';
import formatTimestamp from '../../../../CommonMethods/formatTimestamp';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import NoDataError from '../../../../components/NoDataError/NoDataError';
import { handleSort } from '../../../../CommonMethods/ListFunctions';
import { useNavigate } from 'react-router';

const CustomerTable = ({ loading, error, List, notFound, searchParams, setSearchParams }) => {
    const Navigate = useNavigate();

    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.data?.length > 0 || loading) &&
                    <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                        <tr className='border-b border-neutral-outline sticky top-0 bg-white z-10'>
                            <th className='py-2 px-[10px] text-left font-[400]'>Paymaart ID</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>
                                <div data-testid="sort_customer_name" className='cursor-pointer flex gap-1 w-fit' onClick={() => handleSort('name', searchParams, setSearchParams)}>
                                    <span>Name</span>
                                    <Image src='sort_icon' />
                                </div>
                            </th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Phone Number</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Created Date</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                            <th className='py-2 px-[10px]'></th>
                        </tr>
                    </thead>
                }
                {loading
                    ? <Shimmer column={6} row={10} firstIndex />
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        {List?.data?.map((user, index) => (
                            <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                                <td data-testid="paymaart_id" title={user?.paymaart_id} className='py-2 px-[10px] text-left truncate min-w-[70px] max-w-[70px]'>{user?.paymaart_id || '-'}</td>
                                <td data-testid="customer_name" title={user?.name} className='py-2 px-[10px] truncate min-w-[150px] max-w-[150px]'>{`${user?.name}`}</td>
                                <td className='py-2 px-[10px] truncate min-w-[130px] max-w-[110px]' title={`${user?.country_code} ${formatInputPhone(user?.phone_number)}`}>
                                    {`${user?.country_code} ${formatInputPhone(user?.phone_number)}`}
                                </td>

                                <td className='py-2 px-[10px] truncate min-w-[80px] max-w-[150px]' title={formatTimestamp(user?.created_at)}>
                                    {formatTimestamp(user?.created_at)}
                                </td>

                                <td data-testid="status" className='py-2 px-[10px] truncate min-w-[50px] max-w-[100px]'>
                                    {user?.status
                                        ? (
                                            <span className={`py-[2px] px-[10px] rounded text-[13px] font-[600] capitalize 
                                             ${user.status === 'active'
                                                ? 'bg-[#ECFDF5] text-accent-positive'
                                                : 'bg-neutral-grey text-neutral-secondary'}`}>
                                                {user.status}
                                            </span>
                                        )
                                        : (
                                            <span className='text-neutral-secondary'>
                                                -
                                            </span>
                                        )}
                                </td>
                                <td className='py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-end'>
                                    <Image className='cursor-pointer' toolTipId={`eye-${index}`} src='eye' testId={`view-${index}`}
                                        onClick={() => Navigate(`/users/customer/register-customer/specific-view/${user?.paymaart_id}`
                                        )} />
                                    <Image className='cursor-pointer' toolTipId={`edit-${index}`} src='edit'
                                        onClick={() => Navigate(`/users/customers/register-customer/kyc-update/${user?.paymaart_id}`)}
                                    />
                                    <Image className='cursor-pointer' toolTipId={`payin-${index}`} src='payin' />
                                    <Tooltip
                                        id={`eye-${index}`}
                                        className='my-tooltip z-30'
                                        place="top"
                                        content="View"
                                    />
                                    <Tooltip
                                        id={`edit-${index}`}
                                        className='my-tooltip z-30'
                                        place="top"
                                        content="Edit"
                                    />
                                    <Tooltip
                                        id={`payin-${index}`}
                                        className='my-tooltip z-30'
                                        place="top"
                                        content="Payin"
                                    />
                                </td>
                            </tr>))}
                    </tbody>
                }
            </table>
            {!notFound && error &&
                (<NoDataError heading='There are no customers added yet' text='Click “Register Customer” to add customer' />)}
            {List?.data?.length === 0 && !loading &&
                (searchParams.get('status') !== null || searchParams.get('search') !== null) &&
                (<NoDataError className='h-tableHeight' heading='No data found' text='Try adjusting your search or filter to find what you’re looking for' />)}
        </>
    );
};

export default CustomerTable;
