/* eslint-disable max-len */
import React from 'react';
import Image from '../../../../../components/Image/Image';
import { formatInputPhone } from '../../../../../CommonMethods/phoneNumberFormat';
import formatTimestamp from '../../../../../CommonMethods/formatTimestamp';
import Shimmer from '../../../../../components/Shimmers/Shimmer';
import NoDataError from '../../../../../components/NoDataError/NoDataError';
import { Tooltip } from 'react-tooltip';

const Table = ({ loading, error, List, handleSortByName, notFound, searchParams }) => {
    const param = Object.fromEntries(searchParams);
    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.data?.length > 0 || loading) &&
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]
                    border-y border-neutral-outline sticky top-0 left-0 bg-[#fff] !m-0'>
                    <tr>
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
                    ? <Shimmer column={9} row={10}/>
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400] overflow-auto scrollBar'>
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
                                    <Image className='cursor-pointer' toolTipId={`eye-${index}`} src='eye' />
                                    <Image className='cursor-pointer' toolTipId={`edit-${index}`} src='edit' />
                                    <Image className='cursor-pointer' toolTipId={`payin-${index}`} src='payin' />
                                    <Tooltip
                                        id={`eye-${index}`}
                                        className='my-tooltip'
                                        place="top"
                                        content="View"
                                    />
                                    <Tooltip
                                        id={`edit-${index}`}
                                        className='my-tooltip'
                                        place="top"
                                        content="Edit"
                                    />
                                    <Tooltip
                                        id={`payin-${index}`}
                                        className='my-tooltip'
                                        place="top"
                                        content="Payin"
                                    />
                                </td>
                            </tr>))}
                    </tbody>
                }
            </table>
            {notFound && <NoDataError className='h-noDataError' heading='No data found' text = "404 could not find what you are looking for."/>}
            {!notFound && error &&
            (<NoDataError heading='There are no agents added yet' text='Click “Register Agent ” to add agent' />)}
            {List?.data?.length === 0 && !loading && !(param.search || param.status) &&
            (<NoDataError heading='No data found' text='Click “Register Agent ” to add agent' />)}
            {List?.data?.length === 0 && !loading &&
            (param.status || param.search) &&
            (<NoDataError heading='No data found' text='Try adjusting your search or filter to find what you’re looking for' />)}
        </>
    );
};

export default Table;
