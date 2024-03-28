import React from 'react';
import Image from '../../../../../components/Image/Image';
import { formatInputPhone } from '../../../../../CommonMethods/phoneNumberFormat';
import formatTimestamp from '../../../../../CommonMethods/formatTimestamp';
import Shimmer from '../../../../../components/Shimmers/Shimmer';

const Table = ({ loading, error, List, handleSortByName }) => {
    console.log(List);

    return (
        <table className='w-full min-w-max'>
            {(List?.data?.length > 0 || loading) &&
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className='border-y border-neutral-outline'>
                        <th className='py-2 px-[10px] text-center font-[400]'>Paymaart ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>
                            <div className='cursor-pointer flex gap-1 w-fit' onClick={handleSortByName}>
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
                ? <Shimmer column={10} row={6}/>
                : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                    {List?.data?.map((user, index) => (
                        <tr key={index} className='border-y border-neutral-outline h-[48px]'>
                            <td className='py-2 px-[10px] text-center'>{user?.paymaart_id || '-'}</td>
                            <td className='py-2 px-[10px]'>{`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}</td>
                            <td className='py-2 px-[10px]'>{`${user?.country_code} ${formatInputPhone(user?.phone_number)}`}</td>
                            <td className='py-2 px-[10px]'>{formatTimestamp(user?.created_at)}</td>
                            <td className='py-2 px-[10px]'>
                                <span className={`py-[2px] px-[10px] text-[13px] font-[600] capitalize 
                        ${user?.status === 'active'
                            ? 'bg-[#ECFDF5] text-accent-positive'
                            : 'bg-neutral-grey text-neutral-secondary'}`}>
                                    {user?.status}
                                </span>
                            </td>
                            <td className='py-2 px-3 mr-3 flex gap-[19px] justify-end'>
                                <Image src='eye' />
                                <Image src='edit' />
                                <Image src='payin' />
                            </td>
                        </tr>))}
                </tbody>
            }
        </table>
    );
};

export default Table;
