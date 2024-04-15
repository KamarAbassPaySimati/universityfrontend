/* eslint-disable max-len */
import React from 'react';
import Image from '../../../../components/Image/Image';
import Shimmer from '../../../../components/Shimmers/Shimmer';
import { formatInputPhone } from '../../../../CommonMethods/phoneNumberFormat';
import formatTimestamp from '../../../../CommonMethods/formatTimestamp';
import isTimestampFiveMinutesAgo from '../../../../CommonMethods/lastLoggedInTimeStamp';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { handleSort } from '../../../../CommonMethods/ListFunctions';

const BankTable = (
    {
        loading, error, List, setSearchParams, notFound, searchParams, CurrentUserRole, paymaartId
    }
) => {
    const navigate = useNavigate();
    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.data?.length > 0 || loading) &&
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400] '>Ref. No</th>
                        <th className='py-2 px-[10px] text-left font-[400] '>Name</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Account Number</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Purpose</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Last Update Date / Time</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Balance</th>
                        <th className='py-2 px-[10px]'></th>
                    </tr>
                </thead>}
                {loading
                    ? <Shimmer column={6} row={4} firstIndex/>
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        {List?.data?.map((user, index) => (
                            <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                                <td data-testid="paymaart_id" title = {user?.paymaart_id}
                                    className='py-2 px-[10px] text-left truncate max-w-[50px]'>{user?.paymaart_id || '-'}</td>
                                <td data-testid="name" title = {`${user?.name}`}
                                    className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                                    {`${user?.name}`}</td>
                                <td data-testid="email" title = {user?.email} className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                    {user?.email}</td>
                                <td data-testid="phone" title = {`${user?.country_code} ${formatInputPhone(user?.phone_number)}`}
                                    className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                    {`${user?.country_code} ${formatInputPhone(user?.phone_number)}`}</td>
                                <td data-testid="user_role" title = {user?.user_type}
                                    className='py-2 px-[10px] text-left truncate capitalize'>{user?.user_type || '-'}</td>
                                <td className='py-2 px-[10px] text-left truncate'>
                                    <span className={ user?.last_logged_in ? isTimestampFiveMinutesAgo(user?.last_logged_in) ? 'text-[#4F5962]' : 'text-accent-positive' : 'text-[#4F5962]'}>
                                        { user?.last_logged_in
                                            ? isTimestampFiveMinutesAgo(user?.last_logged_in)
                                                ? formatTimestamp(user?.last_logged_in)
                                                : 'Online'
                                            : '-'
                                        }
                                    </span>
                                </td>
                                <td data-testid="status" className='py-2 px-[10px] text-left truncate'>
                                    {user?.status
                                        ? (
                                            <span className={`py-[2px] px-[10px] text-[13px] font-[600] capitalize rounded
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
                                <td className={'py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-end'}>
                                    {/* {CurrentUserRole === 'super-admin' && <><Image toolTipId={`eye-${index}`} testId={`view-${index}`} src='eye' className={'cursor-pointer'} onClick={() => navigate(`/users/admins/${user?.paymaart_id}`)}/>
                                        <Image src='edit' toolTipId={`edit-${index}`}/></>} */}

                                    {
                                        CurrentUserRole === 'super-admin' && (
                                            <>
                                                <Image toolTipId={`eye-${index}`} testId={`view-${index}`} src='eye' className={'cursor-pointer'} onClick={() => navigate(`/users/admins/${user?.paymaart_id}`)} />
                                                {paymaartId !== user?.paymaart_id && <Image src='edit' testId={`edit-${index}`} className={'cursor-pointer'} toolTipId={`edit-${index}`} onClick={() => navigate(`/users/admins/update-admin/${user?.paymaart_id}`)}/>}
                                            </>
                                        )
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
        </>
    );
};

export default BankTable;
