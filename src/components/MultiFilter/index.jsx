/* eslint-disable max-len */
import React, { useRef, useState } from 'react';
import Image from '../Image/Image';
import { Tooltip } from 'react-tooltip';
import { useOnClickOutside } from '../../CommonMethods/outsideClick';
import FilterCheckbox2 from '../../pages/Financials/Transaction History/components/FilterCheckbox2';
import Button from '../Button/Button';
import DatePickerAntd from '../DatePicker/DatePickerAntd';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Slugify from '../../CommonMethods/Sulgify';
import moment from 'moment';

const MultiFilter = ({
    filterOptions,
    filterType,
    searchParams,
    filterActive,
    setSearchParams,
    appliedFilter,
    setAppliedFilter,
    customClass,
    initialState,
    pageNumber
}) => {
    const filterDiv = useRef();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [dateRange, setDateRange] = useState({
        start_date: new Date(Number(searchParams.get('start_date'))).getTime() * 1000,
        end_date: new Date(Number(searchParams.get('end_date'))).getTime() * 1000
    });

    const checkTrueProperties = (obj) => {
        const trueProperties = [];

        // Mapping of original keys to desired transformations
        const keyTransformations = {
            'Pay-in': 'pay_in',
            'Pay-out': 'pay_out',
            'Cash-in': 'cash_in',
            'Cash-out': 'cashout',
            'Pay Paymaart': 'paymaart',
            'Pay Afrimax': 'afrimax',
            'Pay Merchant': 'merchant',
            'Interest Earned': 'interest',
            Refund: 'refund',
            Other: 'other'
        };

        for (const key in obj) {
            if (obj[key] === true) {
                // Apply the transformation if the key exists in the mapping
                if (keyTransformations[key]) {
                    trueProperties.push(keyTransformations[key]);
                } else {
                    // Default transformation: lowercase and replace '-' with '_'
                    const transformedKey = key.toLowerCase().replace('-', '_');
                    trueProperties.push(transformedKey);
                }
            }
        }

        return trueProperties.join(',');
    };

    const handleApplySearchParams = () => {
        const params = Object.fromEntries(searchParams);
        if (pageNumber) {
            params.page_number = 1;
        } else {
            params.page = 1;
        }
        const startdate = new Date(dateRange.start_date).getTime();
        const enddate = new Date(dateRange.end_date).getTime();

        const startDate = moment(startdate).startOf('day').unix() * 1000;
        const endDate = moment(enddate).endOf('day').subtract(0, 'minute').unix() * 1000;

        if (!dateRange.start_date) {
            delete params.start_date;
        }
        if (!dateRange.end_date) {
            delete params.end_date;
        }
        if (dateRange.start_date && dateRange.end_date) {
            if (startDate > endDate) {
                setErrorMessage('Start date cannot be greater than end date');
                return;
            } else {
                setErrorMessage(''); // Clear error message if dates are valid
            }
            setIsFilterOpen(false);
            params.start_date = (startDate / 1000).toString();
            params.end_date = (endDate / 1000).toString();
        } else {
            setIsFilterOpen(false);
            if (dateRange.start_date) {
                params.start_date = (startDate / 1000).toString();
            }
            if (dateRange.end_date) {
                params.end_date = (endDate / 1000).toString();
            }
        }

        const transactionTypes = checkTrueProperties(appliedFilter['transaction-type']);
        if (transactionTypes) {
            params.transaction_type = transactionTypes;
        } else {
            delete params.transaction_type;
        }

        setSearchParams({ ...params });
    };

    const handleClearFilter = () => {
        setAppliedFilter(initialState);
        const params = Object.fromEntries(searchParams);
        if (filterActive) {
            if (pageNumber) {
                params.page_number = 1;
            } else {
                params.page = 1;
            }
        }
        delete params.transaction_type;
        delete params.start_date;
        delete params.end_date;
        setSearchParams({ ...params });
    };

    const handleStates = (value, id) => {
        setErrorMessage('');
        setDateRange((prevState) => ({ ...prevState, [id]: value }));
    };

    useOnClickOutside(filterDiv, () => {
        setIsFilterOpen(false);
    });

    return (
        <div ref={filterDiv} className="z-1">
            <Image
                src={`${filterActive ? 'active_' : ''}filter_icon`}
                testId='filter-tab'
                className={'filter_icon absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer'}
                onClick={() => setIsFilterOpen(prevState => !prevState)}
            />
            <Tooltip
                className='my-tooltip'
                anchorSelect=".filter_icon"
                place="left"
                content="Filter"
            />
            {isFilterOpen && <div className='relative z-[12]'>
                <div data-testid='filter-modal' className="w-[570px] absolute top-[10px] right-2 rounded-[8px] z-[999] bg-white border border-neutral-outline text-[14px] leading-[24px] text-neutral-primary">
                    <div className='p-4 flex justify-between border-b border-neutral-outline'>
                        <div className='font-semibold'>
                            {filterType}
                        </div>
                        <button data-testid="clear-filter" onClick={() => { setIsFilterOpen(false); handleClearFilter(); } } className='font-[400]'>
                            Clear
                        </button>
                    </div>
                    <div className='p-4'>
                        <div className='px-2 mb-1 font-semibold capitalize'>
                            Time Period
                        </div>
                        <div className='flex'>
                            <div className='px-2.5 w-[200px]'>
                                <DatePickerAntd
                                    label={'Start date'}
                                    testID="start_date"
                                    handleStates={handleStates}
                                    type='start_date'
                                    value={dateRange.start_date}
                                />
                            </div>
                            <div className='px-2.5 w-[200px]'>
                                <DatePickerAntd
                                    label={'End date'}
                                    type='end_date'
                                    testID="end_date"
                                    handleStates={handleStates}
                                    value={dateRange.end_date}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='ml-6 mb-2'><ErrorMessage error={errorMessage} /></div>
                    <div className='p-4 pl-6 flex flex-col gap-4'>
                        { Object.keys(filterOptions).map((key) => ( // go through the number of keys  (for eg role, status)
                            <div key={key}>
                                <div className='font-semibold mb-2 capitalize'>
                                    {key}
                                </div>
                                <div className='flex gap-x-10 gap-y-4 flex-wrap'>
                                    {filterOptions[key].map((option) => ( // in a key number of options (active, inactive)
                                        <FilterCheckbox2
                                            isLoading={false}
                                            key={option} // active
                                            id={option} // active
                                            valueOf={Slugify(key)} // status
                                            checkboxText={option} // active
                                            handleSearchParams={null}
                                            searchParams={searchParams}
                                            setAppliedFilter={setAppliedFilter}
                                            appliedFilter={appliedFilter}
                                            customClass={customClass}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button testId="apply_filter" onClick={handleApplySearchParams} text='Apply' className='!w-[164px] ml-4 mb-5 mt-2' />
                </div>
            </div>
            }
        </div>
    );
};

export default MultiFilter;
