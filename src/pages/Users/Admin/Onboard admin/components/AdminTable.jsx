/* eslint-disable max-len */
import React from 'react';
import Image from '../../../../../components/Image/Image';
import Shimmer from '../../../../../components/Shimmers/Shimmer';
import { formatInputPhone } from '../../../../../CommonMethods/phoneNumberFormat';
import formatTimestamp from '../../../../../CommonMethods/formatTimestamp';
import isTimestampFiveMinutesAgo from '../../../../../CommonMethods/lastLoggedInTimeStamp';
import { useNavigate } from 'react-router-dom';

const AdminTable = (
    {
        loading,
        List,
        handleSortByName
    }
) => {
    const navigate = useNavigate();
    return (
        <table className='w-full'>
            <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                    <th className='py-2 px-[10px] text-left font-[400] min-w-[150px]'>Paymaart ID</th>
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
                ? <Shimmer column={8} row={10}/>
                : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                    {List?.data?.map((user, index) => (
                        <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                            <td title = {user?.paymaart_id}
                                className='py-2 px-[10px] text-left truncate max-w-[50px]'>{user?.paymaart_id || '-'}</td>
                            <td title = {`${user?.name}`}
                                className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                {`${user?.name}`}</td>
                            <td title = {user?.email} className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                {user?.email}</td>
                            <td title = {`${user?.country_code} ${formatInputPhone(user?.phone_number)}`}
                                className='py-2 px-[10px] text-left truncate max-w-[300px]'>
                                {`${user?.country_code} ${formatInputPhone(user?.phone_number)}`}</td>
                            <td title = {user?.user_type}
                                className='py-2 px-[10px] text-left truncate'>{user?.user_type || '-'}</td>
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
                            <td className='py-2 px-[10px] text-left truncate'>
                                <span className={`py-[2px] px-[10px] text-[13px] font-[600] capitalize 
                                 ${user?.status === 'active'
                            ? 'bg-[#ECFDF5] text-accent-positive'
                            : 'bg-neutral-grey text-neutral-secondary'}`}>
                                    {user?.status}
                                </span>
                            </td>
                            <td className='py-3 px-[10px] mr-1 ml-10 flex gap-[19px] text-center align-center justify-end'>
                                <Image src='eye' onClick={() => navigate(`/users/admins/${user?.paymaart_id}`)}/>
                                <Image src='edit' />
                            </td>
                        </tr>))}
                </tbody>
            }
        </table>
    );
};

export default AdminTable;
