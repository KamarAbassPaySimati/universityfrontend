/* eslint-disable max-len */
import React, { useRef, useState } from 'react';
import NoDataError from '../../../components/NoDataError/NoDataError';
import Image from '../../../components/Image/Image';
import { Tooltip } from 'react-tooltip';
import DatePickerAntd from '../../../components/DatePicker/DatePickerAntd';
import { useSelector } from 'react-redux';
import Shimmer from '../../../components/Shimmers/Shimmer';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import Paginator from '../../../components/Paginator/Paginator';

export default function TransactionList ({ searchParams, setSearchParams }) {
    const [isFilter, setIsFilter] = useState(false);
    const { loading, Data } = useSelector((state) => state.BankTransactionViewData);
    const filterDiv = useRef();
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedFilter, setSelectedFilter] = useState({
        start_date: new Date(searchParams.get('start_date')).getTime() / 1000,
        end_date: new Date(searchParams.get('end_date')).getTime() / 1000
    });
    const handleStates = (value, id) => {
        setErrorMessage('');
        setSelectedFilter((prevState) => ({ ...prevState, [id]: value }));
    };
    // useOnClickOutside(filterDiv, () => {
    //     setIsFilter(false);
    // });
    const handleApplyFilter = () => {
        const params = Object.fromEntries(searchParams);
        params.page_number = 1;
        const startDate = new Date(selectedFilter.start_date).getTime();
        const endDate = new Date(selectedFilter.end_date).getTime();
        if (selectedFilter.start_date && selectedFilter.end_date) {
            if (startDate > endDate) {
                setErrorMessage('Start date cannot be greater than end date');
                return;
            } else {
                setErrorMessage(''); // Clear error message if dates are valid
            }
            setIsFilter(false);
            params.start_date = (startDate / 1000).toString();
            params.end_date = (endDate / 1000).toString();
        } else {
            setIsFilter(false);
            if (selectedFilter.start_date) {
                params.start_date = (startDate / 1000).toString();
            }
            if (selectedFilter.end_date) {
                params.end_date = (endDate / 1000).toString();
            }
        }

        setSearchParams({ ...params });
    };
    const handleClearFilter = () => {
        setIsFilter(false);
        const params = Object.fromEntries(searchParams);
        delete params.start_date;
        delete params.end_date;
        params.page_number = 1;
        setSearchParams({ ...params });
    };

    const getDrCr = (value) => {
        let givenValue = value.toString();
        if (givenValue.substring(0, 0) === '-') {
            givenValue = `${givenValue} DR`;
        } else {
            givenValue = `${givenValue} CR`;
        }
        return givenValue;
    };
    return (
        <div data-testid="view_admin"
            className={`min-h-[calc(100vh-550px)] mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
            flex flex-col bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
            `}>
            <div className='flex justify-between'>
                <h1 className='text-[#4F5962] text-lg font-semibold'>Transaction Details</h1>
                <div className='flex'>
                    <Image
                        src={`${(searchParams.get('start_date') !== null || searchParams.get('end_date') !== null) ? 'active_' : ''}filter_icon`}
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
                                    onClick={() => { handleClearFilter(); } } className='font-[400]'>
                                    Clear
                                </button>
                            </div>
                            {console.log('selectedFilter', selectedFilter)}
                            <div className='p-4 flex'>
                                <div className='px-2.5 w-[200px]'>
                                    <DatePickerAntd
                                        // disabled={isFullKYC}
                                        label={'Start date'}
                                        testID="start_date"
                                        handleStates={handleStates}
                                        type='start_date'
                                        open={isFilter}
                                        value={selectedFilter.start_date}
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
                                        value={selectedFilter.end_date}
                                        // error={(states.dob === undefined && submitSelected) ? 'Required field' : undefined}
                                    />
                                </div>
                            </div>
                            <div className='ml-6 mb-2'><ErrorMessage error={errorMessage} /></div>
                            <button data-testid="add_new_bank"
                                className='mb-6 w-[164px] flex bg-primary-normal py-[8px]
                                px-[16px] justify-center items-center ml-6
                    h-[40px] rounded-[6px]' onClick={() => handleApplyFilter()}>
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
            <div className='scrollBar overflow-auto '>
                {loading
                    ? <Shimmer column={10} row={10} firstIndex/>
                    : (
                        Data.transactions.length === 0
                            ? <NoDataError className='h-tableHeight' heading='No data found' text='Try adjusting your search or filter to find what you’re looking for'
                            />
                            : <table className='w-full min-w-max mt-7'>
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
                                        <th className='py-2 px-[10px] text-end font-[400]'>Amount</th>
                                        <th className='py-2 px-[10px] text-end font-[400]'>Closing Balance</th>
                                        <th className='py-2 px-[10px]'></th>
                                    </tr>
                                </thead>
                                <tbody className={` text-neutral-primary whitespace-nowrap text-[14px]
                    leading-[24px]`}>
                                    {Data.transactions && Data.transactions.map((item, index = 0) => (
                                        <tr className='border-b border-neutral-outline h-[48px]' key={`transactions${index}`}>
                                            <td data-testid="name"
                                                className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                                                {item?.transaction_code || '-'}</td>
                                            <td data-testid="name"
                                                className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                                                {item?.created_at || '-'}</td>
                                            <td data-testid="name"
                                                className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                                                {item?.transaction_type || '-'}</td>
                                            <td data-testid="name"
                                                className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                                                {item?.entered_by || '-'}</td>
                                            <td data-testid="name"
                                                className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                                                {item?.sender_id}</td>
                                            <td data-testid="name"
                                                className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                                                {item?.transaction_id || '-'}</td>
                                            <td data-testid="name"
                                                className='py-2 px-[10px] text-left truncate max-w-[200px]'>
                                                {item?.pop_file_ref_no || '-'}</td>
                                            <td data-testid="name"
                                                className='py-2 px-[10px] flex items-center justify-center truncate max-w-[200px]'>
                                                <Image
                                                    toolTipId={`eye-${index}`}
                                                    testId={`view-${index}`} src='eye' className={'cursor-pointer'}/>

                                            </td>
                                            <td data-testid="name"
                                                className='py-2 px-[10px] text-end truncate max-w-[200px]'>
                                                {getDrCr(item?.transaction_amount) || '-'}</td>
                                            <td data-testid="name"
                                                className='py-2 px-[10px] text-end truncate max-w-[200px]'>
                                                {item?.closing_balance || '-'}</td>
                                        </tr>))}
                                </tbody>
                            </table>
                    )
                }
            </div>
            {!loading && Data?.transactions?.length !== 0 && <Paginator
                currentPage={searchParams.get('page')}
                totalPages={Math.ceil(Data?.total_count / 10)}
                setSearchParams={setSearchParams}
                searchParams={searchParams}
                type={'page_number'}
                totalRecords={Data?.total_count}
            />}
        </div>
    );
}
