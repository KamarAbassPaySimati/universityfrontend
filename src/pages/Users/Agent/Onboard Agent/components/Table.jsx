/* eslint-disable indent */
/* eslint-disable max-len */
import React, { useState } from 'react';
import Image from '../../../../../components/Image/Image';
import Shimmer from '../../../../../components/Shimmers/Shimmer';
import NoDataError from '../../../../../components/NoDataError/NoDataError';
import { handleSort } from '../../../../../CommonMethods/ListFunctions';
import AccountUnlockQuestions from '../../../../../components/Modals/AccountUnlockQuestions';
import TableBody from './TableBody';

const Table = ({ loading, error, List, notFound, searchParams, setSearchParams, GetList }) => {
    const [isUnlockAgent, setIsUnlockAgent] = useState(false);

    return (
        <>
            <table className='w-full min-w-max'>
                {(List?.data?.length > 0 || loading) &&
                    <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                        <tr className='border-b border-neutral-outline sticky top-0 bg-white z-10'>
                            <th className='py-2 px-[10px] text-left font-[400]'>Paymaart ID</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>
                                <div data-testid="sort_agent_name" className='cursor-pointer flex gap-1 w-fit' onClick={() => handleSort('name', searchParams, setSearchParams)}>
                                    <span>Name</span>
                                    <Image src='sort_icon' />
                                </div>
                            </th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Phone Number</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Created Date, CAT</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Last Logged In, CAT</th>
                            <th className='py-2 px-[10px] text-left font-[400]'>Status</th>
                            <th className='py-2 px-[10px]'></th>
                        </tr>
                    </thead>
                }
                {loading
                    ? <Shimmer column={6} row={10} firstIndex />
                    : <tbody className='text-neutral-primary whitespace-nowrap text-[14px] leading-[24px] font-[400]'>
                        {List?.data?.map((user, index) => (
                            <TableBody userRole={user} index={index} key={index} GetList={GetList} searchParams={searchParams}/>))}
                    </tbody>
                }
            </table>
            <AccountUnlockQuestions isModalOpen={isUnlockAgent} setModalOpen={setIsUnlockAgent} user={List}/>
            {!notFound && error &&
                (<NoDataError heading='There are no agents added yet' text='Click “Register Agent ” to add agent' />)}
            {List?.data?.length === 0 && !loading &&
                (searchParams.get('status') !== null || searchParams.get('search') !== null) &&
                (<NoDataError className='h-tableHeight' heading='No data found' text='Try adjusting your search or filter to find what you’re looking for' />)}
        </>
    );
};

export default Table;
