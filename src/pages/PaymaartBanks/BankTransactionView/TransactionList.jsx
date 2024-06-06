import React, { useRef, useState } from 'react';
import NoDataError from '../../../components/NoDataError/NoDataError';
import Image from '../../../components/Image/Image';
import { Tooltip } from 'react-tooltip';
import DatePickerAntd from '../../../components/DatePicker/DatePickerAntd';
import { useOnClickOutside } from '../../../CommonMethods/outsideClick';
import Button2 from '../../../components/Button2/Button2';

export default function TransactionList () {
    const [isFilter, setIsFilter] = useState(false);
    const filterDiv = useRef();
    const handleStates = (value, id) => {
        console.log('value, id, type', value, id);
    };
    useOnClickOutside(filterDiv, () => {
        setIsFilter(false);
    });
    return (
        <div data-testid="view_admin"
            className={`min-h-[calc(100vh-550px)] scrollBar overflow-auto mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
            flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
            `}>
            <div className='flex justify-between'>
                <h1 className='text-[#4F5962] text-lg font-semibold'>Transaction Details</h1>
                <div className='flex'>
                    <Image
                        src={`${true ? 'active_' : ''}filter_icon`}
                        testId='filter-tab'
                        className={'filter_icon cursor-pointer'}
                        onClick={() => { setIsFilter(!isFilter); }}
                    />
                    <Tooltip
                        className='my-tooltip'
                        anchorSelect=".filter_icon"
                        place="left"
                        content="Filter"
                    />
                    {isFilter && <div ref={filterDiv} className='relative z-[12]'>
                        <div
                            data-testid='filter-modal'
                            className="absolute top-[10px] right-2 rounded-[8px]
                            z-[999] bg-white border border-neutral-outline text-[14px] leading-[24px] text-neutral-primary">
                            <div className='p-4 flex justify-between border-b border-neutral-outline'>
                                <div className='font-semibold'>
                                    Filter Date Range
                                </div>
                                <button data-testid="clear-filter"
                                    onClick={() => { setIsFilter(false); } } className='font-[400]'>
                                    Clear
                                </button>
                            </div>
                            <div className='p-4 flex'>
                                <div className='px-2.5 w-[200px]'>
                                    <DatePickerAntd
                                        // disabled={isFullKYC}
                                        label={'Start date'}
                                        testID="start_date"
                                        handleStates={handleStates}
                                        type='start_date'
                                        // value={states.dob === undefined ? '' : states.dob}
                                        // error={(states.dob === undefined && submitSelected) ? 'Required field' : undefined}
                                    />
                                </div>
                                <div className='px-2.5 w-[200px]'>
                                    <DatePickerAntd
                                        // disabled={isFullKYC}
                                        label={'End date'}
                                        type='end_date'
                                        testID="end_date"
                                        handleStates={handleStates}
                                        // value={states.dob === undefined ? '' : states.dob}
                                        // error={(states.dob === undefined && submitSelected) ? 'Required field' : undefined}
                                    />
                                </div>
                            </div>
                            <button data-testid="add_new_bank"
                                className='mb-6 w-[164px] flex bg-primary-normal py-[8px]
                                px-[16px] justify-center items-center ml-8
                    h-[40px] rounded-[6px]'>
                                <p className='text-[14px] font-semibold text-[#ffffff]'>Apply</p>
                            </button>
                        </div>
                    </div>
                    }
                    <button data-testid="add_new_bank"
                        className='flex bg-primary-normal py-[8px] px-[16px] justify-center items-center ml-8
                    h-[40px] rounded-[6px]'>
                        <img src='/images/addIcon.svg'
                            className='mr-[8px]'/>
                        <p className='text-[14px] font-semibold text-[#ffffff]'>Add Trust Bank</p>
                    </button>
                </div>
            </div>
            {/* <NoDataError className='h-tableHeight'
                heading='No data found'
                text='Try adjusting your search or filter to find what you’re looking for' /> */}
            <table className='w-full min-w-max mt-7'>
                {/* {(List?.data?.length > 0 || loading) && */}
                <thead className='text-neutral-secondary whitespace-nowrap text-[14px] leading-[24px]'>
                    <tr className=' border-b border-neutral-outline sticky top-0 bg-white z-10'>
                        <th className='py-2 px-[10px] text-left font-[400] '>Service codes</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>
                            <div className='cursor-pointer flex gap-1 w-fit' data-testid="sort_admin_name">
                                <span>Date/Time</span>
                            </div>
                        </th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Type</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Entry by</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Beneficiary Paymaart ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Transaction ID</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Transaction POP Ref. No</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Transaction POP</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Amount</th>
                        <th className='py-2 px-[10px] text-left font-[400]'>Closing Balance</th>
                        <th className='py-2 px-[10px]'></th>
                    </tr>
                </thead>
                <tbody className={` text-neutral-primary whitespace-nowrap text-[14px]
                    leading-[24px]`}>
                    <tr className='border-b border-neutral-outline h-[48px]'>
                        <td data-testid="name"
                            className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                            name</td>
                        <td data-testid="name"
                            className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                            name</td>
                        <td data-testid="name"
                            className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                            name</td>
                        <td data-testid="name"
                            className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                            name</td>
                        <td data-testid="name"
                            className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                            name</td>
                        <td data-testid="name"
                            className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                            name</td>
                        <td data-testid="name"
                            className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                            name</td>
                        <td data-testid="name"
                            className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                            name</td>
                        <td data-testid="name"
                            className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                            name</td>
                        <td data-testid="name"
                            className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                            name</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
