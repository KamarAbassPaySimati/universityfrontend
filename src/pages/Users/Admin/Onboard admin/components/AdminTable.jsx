import React from 'react';
import Image from '../../../../../components/Image/Image';
import Shimmer from '../../../../../components/Shimmers/Shimmer';
import { formatInputPhone } from '../../../../../CommonMethods/phoneNumberFormat';
import formatTimestamp from '../../../../../CommonMethods/formatTimestamp';
import isTimestampFiveMinutesAgo from '../../../../../CommonMethods/lastLoggedInTimeStamp';

const AdminTable = (
    {
        error,
        loading,
        List,
        handleSortByName
    }
) => {
    console.log(error);
    return (
        <table className='w-full'>
            <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                    <th className='py-2 px-[10px] text-left font-[400]'>Paymaart ID</th>
                    <th className='py-2 px-[10px] text-left font-[400]'>
                        <div className='cursor-pointer flex gap-1 w-fit' onClick={handleSortByName}>
                            <span>Name</span>
                            <Image src='sort_icon' />
                        </div>
                    </th>
                    <th className='py-2 px-[10px] text-left font-[400]'>Email</th>
                    <th className='py-2 px-[10px] text-left font-[400]'>Phone Number</th>
                    <th className='py-2 px-[10px] text-left font-[400]'>Role</th>
                    <th className='py-2 px-[10px] text-left font-[400]'>Last Logged In</th>
                    <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                    <th className='py-2 px-[10px]'></th>
                </tr>
            </thead>
            {loading
                ? <Shimmer column={8} row={10} />
                : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                    {List?.data?.map((user, index) => (
                        <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                            <td title = {user?.paymaart_id}
                                className='py-2 px-[10px] text-left truncate max-w-[50px]'>{user?.paymaart_id || '-'}</td>
                            <td title = {`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}
                                className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                {`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}</td>
                            <td title = {user?.email} className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                {user?.email}</td>
                            <td title = {`${user?.country_code} ${formatInputPhone(user?.phone_number)}`}
                                className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                {`${user?.country_code} ${formatInputPhone(user?.phone_number)}`}</td>
                            <td title = {user?.user_type}
                                className='py-2 px-[10px] text-left truncate'>{user?.user_type || '-'}</td>
                            <td className='py-2 px-[10px] text-left truncate'>
                                <span className={ user?.created_at ? isTimestampFiveMinutesAgo(user?.created_at) ? 'text-[#4F5962]' : 'text-accent-positive' : 'text-[#4F5962]'}>
                                    { user?.created_at
                                        ? isTimestampFiveMinutesAgo(user?.created_at)
                                            ? formatTimestamp(user?.created_at)
                                            : 'Online'
                                        : '-'

                                    }
                                </span>
                            </td>
                            <td className='py-2 px-[10px] text-left truncate'>
                                <span className={`py-[2px] px-[10px] text-[13px] font-[600] capitalize 
                                 ${user?.status === 'active'
                            ? 'bg-[#ECFDF5] text-accent-positive'
                            : 'bg-neutral-grey text-neutral-secondary'}`}>
                                    {user?.status}
                                </span>
                            </td>
                            <td className='py-3 px-[10px] mr-1 ml-10 flex gap-[19px] text-center align-center justify-end'>
                                <Image src='eye' />
                                <Image src='edit' />
                            </td>
                        </tr>))}
                </tbody>
            }
        </table>
    );
};

export default AdminTable;
