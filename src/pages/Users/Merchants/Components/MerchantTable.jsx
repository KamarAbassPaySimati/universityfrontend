/* eslint-disable max-len */
import React from 'react';
import Image from '../../../../../components/Image/Image';
import { formatInputPhone } from '../../../../../CommonMethods/phoneNumberFormat';
import formatTimestamp from '../../../../../CommonMethods/formatTimestamp';

import { Tooltip } from 'react-tooltip';
import { handleSort } from '../../../../../CommonMethods/ListFunctions';

const Table = ({ loading, error, List, notFound, searchParams, setSearchParams }) => {
    return (
        <>
            <table className='w-full min-w-max'>
                {
                    <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                        <tr className='border-b border-neutral-outline sticky top-0 bg-white z-10'>
                            <th className='py-2 px-[10px] text-left font-[400]'>Paymaart ID</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>
                                <div data-testid="sort_agent_name" className='cursor-pointer flex gap-1 w-fit' onClick={() => handleSort('name', searchParams, setSearchParams)}>
                                    <span>Name</span>
                                    <Image src='sort_icon' />
                                </div>
                            </th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Trading Name</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Created Date</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Till Number</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Location</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                            <th className='py-2 px-[10px]'></th>
                        </tr>
                    </thead>
                }
                {
                    <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        {Array.from({ length: 10 }, (_, index) => (
                            <tr key={index} className='border-b border-neutral-outline h-[48px]'>
                                <td className='py-2 px-[10px] text-left truncate min-w-[70px] max-w-[70px]'>MER12345678</td>
                                <td data-testid="agent_name" className='py-2 px-[10px] truncate min-w-[200px] max-w-[200px]'>Sophia Rose WILLIAMS </td>
                                <td className='py-2 px-[10px]'>Sunny Day Trading</td>
                                <td className='py-2 px-[10px]'>01 Mar 2024</td>
                                <td className='py-2 px-[10px]'>1234567890</td>
                                <td className='py-2 px-[10px]'>California, USA</td>
                                <td className='py-2 px-[10px]'>Active</td>


                                {/* <td data-testid="status" className='py-2 px-[10px]'>
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
                                </td> */}
                                <td className='py-3 px-[10px] mr-1 ml-1 flex gap-[19px] text-center align-center justify-end'>
                                    <Image className='cursor-pointer' toolTipId={`eye-${index}`} src='eye' />
                                    <Image className='cursor-pointer' toolTipId={`edit-${index}`} src='edit' />
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
                                </td>
                            </tr>))}
                    </tbody>
                }
            </table>
        </>
    );
};

export default Table;
