/* eslint-disable max-len */
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import InputFieldWithDropDown from '../../../components/InputFieldWithDropDown/InputFieldWithDropDown';
import Image from '../../../components/Image/Image';
import { dataService } from '../../../services/data.services';
import GraphShimmer from './GraphShimmer';
import DateFilter from '../../../components/DateFilter';
import moment from 'moment';
import HoverToolTip from '../../../components/HoverToolTip';
import GlobalContext from '../../../components/Context/GlobalContext';
import { formattedAmount } from '../../../CommonMethods/formattedAmount';
import { useSelector } from 'react-redux';

// Register necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarGraph ({ DashboardName, endpoint, initialStates, multiple, count }) {
    const [states, setStates] = useState(initialStates);
    const [data, setData] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const { user_type: CurrentUserRole } = user;
    const [loading, setLoading] = useState(true);
    const [openDate, setOpenDate] = useState(false);
    const [dateRange, setDateRange] = useState({});
    const [exportLoading, setExportloading] = useState(false);
    const { setToastError, setToastSuccess, setToastInformation } = useContext(GlobalContext);
    const [isParams, setIsParams] = useState('');
    const handleInput = (value, id) => {
        if (value !== 'Date Range') {
            setDateRange({});
            setIsParams('');
            setLoading(true); // Set loading state to true before API call
        } else {
            setOpenDate(true);
        }
        setStates(prevState => {
            return { ...prevState, [id]: value };
        });
    };

    const fetchNotificationData = useCallback(async (params) => {
        try {
            setLoading(true); // Set loading state to true before API call
            setIsParams(params);
            const res = await dataService.GetAPI(`admin-dashboard/${endpoint}?time_period=${states?.dateRangeType.toLowerCase().replaceAll(' ', '_')}${(DashboardName === 'Customer Registrations' && states.membership !== 'All') ? `&membership=${states.membership.toUpperCase()}` : ''}${(DashboardName === 'Customer e-Payments' && states.transaction_type !== 'All') ? `&transaction_type=${states.transaction_type.toUpperCase()}` : ''}${params !== undefined ? `${params}` : ''}`);
            let count = 0;
            res.data.data.forEach(element => {
                if (multiple) {
                    multiple.forEach(item => {
                        if (element[item.toLowerCase().replaceAll('-', '_').replaceAll(' ', '_')] !== 0) {
                            count = count + 1;
                        }
                    });
                } else {
                    if (element.count !== 0) {
                        count = count + 1;
                    }
                }
            });
            setData(count === 0 ? [] : res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setLoading(false); // Reset loading state after API call is completed
        }
    }, [states]);

    useEffect(() => {
        fetchNotificationData();
    }, [fetchNotificationData]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'short', year: '2-digit' };
        const day = date.getDate(); // Get the day without leading zero
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return `${day} ${formattedDate}`;
    };
    const handleApply = () => {
        const startdate = new Date(dateRange.start_date).getTime();
        const enddate = new Date(dateRange.end_date).getTime();

        const startDate = moment(startdate).startOf('day').unix() * 1000;
        const endDate = moment(enddate).endOf('day').subtract(0, 'minute').unix() * 1000;
        setLoading(true);
        fetchNotificationData(`${(isNaN(Number(startDate)) || dateRange.start_date === null) ? '' : `&start_date=${startDate}`}${(isNaN(Number(endDate)) || dateRange.end_date === null) ? '' : `&end_date=${endDate}`}`);
        setOpenDate(false);
    };
    const handleClearFilter = () => {
        setOpenDate(false);
        setDateRange({});
        setStates(prevState => {
            return { ...prevState, dateRangeType: 'Today' };
        });
    };
    const handleExport = async () => {
        try {
            setExportloading(true);
            const res = await dataService.GetAPI(`admin-dashboard/export-${endpoint}?time_period=${states?.dateRangeType.toLowerCase().replaceAll(' ', '_')}${(DashboardName === 'Customer Registrations' && states.membership !== 'All') ? `&membership=${states.membership.toUpperCase()}&` : ''}${(DashboardName === 'Customer e-Payments' && states.transaction_type !== 'All') ? `&transaction_type=${states.transaction_type.toUpperCase()}&` : ''}${isParams !== undefined ? `${isParams}` : ''}&paymaart_id=${user.paymaart_id}`);
            if (!res.error) {
                if (res.data.s3_url) {
                    window.open(
                        res.data.s3_url,
                        '_blank'
                    );
                    setToastSuccess('Exported successfully');
                } else {
                    setToastInformation(`${res.data.message}`);
                }
                setExportloading(false);
            } else {
                setToastError('An Error Occured!');
                setExportloading(false);
            }
        } catch (error) {
            setToastError('An Error Occured!');
            setExportloading(false);
        }
    };
    const color = ['rgba(59, 42, 111, 0.7)', 'rgba(167, 159, 190, 1)', 'rgba(240, 236, 255, 1)'];

    const getGroupDataSet = () => {
        const array = [];
        if (multiple) {
            multiple.forEach((element, index) => {
                array.push({
                    label: element,
                    data: data?.data?.map((data) => data[element.toLowerCase().replaceAll('-', '_').replaceAll(' ', '_')]),
                    backgroundColor: color[index],
                    borderRadius: 0,
                    minBarLength: 5
                });
            });
        } else {
            array.push({
                // label: 'Count',
                data: data?.data?.map((data, index) => data.count),
                backgroundColor: [
                    'rgba(59, 42, 111, 0.7)'
                ],
                borderRadius: 0,
                barThickness: data?.data?.length < 8 ? 50 : undefined,
                minBarLength: 5,
                borderWidth: 1
            });
        }
        return array;
    };
    const scale = count
        ? {
            x: {
                grid: {
                    display: false
                },
                categoryPercentage: 0.5,
                barPercentage: 0.8
            },
            y: {
                grid: {
                    borderDash: [3, 3]
                },
                min: 0,
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        // Check if value is 0, and format it explicitly
                        if (value === 0) {
                            return '0.00 MWK';
                        }
                        // Format other Y-axis values
                        return `${formattedAmount(value)} MWK`;
                    }
                }
            }
        }
        : multiple
            ? {
                x: {
                    grid: {
                        display: false
                    },
                    categoryPercentage: 0.5,
                    barPercentage: 0.8
                },
                y: {
                    grid: {
                        borderDash: [3, 3]
                    },
                    min: 0,
                    ticks: {
                        beginAtZero: true
                    }
                }
            }
            : {
                x: {
                    grid: {
                        display: false
                    }
                }
            };
    const toolTipValue = count === undefined
        ? {
            backgroundColor: '#E5E9EB',
            titleColor: '#4F5962',
            labelTextColor: '#4F5962',
            bodyColor: '#4F5962'
        }
        : {
            backgroundColor: '#E5E9EB',
            titleColor: '#4F5962',
            labelTextColor: '#4F5962',
            bodyColor: '#4F5962',
            callbacks: {
                label: (tooltipItem) => {
                    // Check if the value is 0, and format it explicitly
                    const formattedValue = tooltipItem.raw === 0 ? '0.00' : formattedAmount(tooltipItem.raw);

                    // Format the label based on whether `multiple` is true or false
                    return multiple
                        ? `${tooltipItem.dataset.label}: ${formattedValue} MWK`
                        : `${formattedValue} MWK`;
                }
            }
        };
    return (
        <div className='py-[24px]'>
            <div className='h-[350px] border-[#F0ECFF] border p-4 rounded-[6px] '>
                <div className='flex justify-between pb-4'>
                    <h1 className='font-semibold text-[18px] leading-[26px] px-1 pt-1' data-testid={DashboardName}>{DashboardName}</h1>
                    <div className='flex gap-7'>
                        {DashboardName === 'Customer Registrations' && <InputFieldWithDropDown
                            labelName="Ref No."
                            value={states.membership}
                            placeholder="Enter Ref No."
                            error={false}
                            options={['All', 'Go', 'Prime', 'PrimeX']}
                            id="membership"
                            testId="membership"
                            handleInput={handleInput}
                            noLabel
                            button
                            dateRange={setOpenDate}
                        />}
                        {DashboardName === 'Customer e-Payments' && <InputFieldWithDropDown
                            labelName="Ref No."
                            value={states.transaction_type}
                            placeholder="Enter Ref No."
                            error={false}
                            options={['All', 'Pay Person', 'Pay Paymaart', 'Pay Afrimax']}
                            id="transaction_type"
                            testId="transaction_type"
                            handleInput={handleInput}
                            noLabel
                            button
                            dateRange={setOpenDate}
                        />}
                        {multiple && multiple.map((ele, ind) => (
                            <div className='flex justify-center items-center' key={ind + 'clor'}>
                                <div
                                    className='rounded-full h-4 w-4 flex'
                                    style={{ backgroundColor: color[ind] }}
                                ></div>
                                <h1 className='pl-2 text-[#4F5962] text-[12px] font-normal leading-[20px]'>{ele}</h1>
                            </div>
                        ))}
                        <InputFieldWithDropDown
                            labelName="Ref No."
                            value={states.dateRangeType}
                            placeholder="Enter Ref No."
                            error={false}
                            options={['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'Date Range']}
                            id="dateRangeType"
                            testId="dateRangeType"
                            handleInput={handleInput}
                            noLabel
                            button
                            dateRange={setOpenDate}
                        />
                        {openDate &&
                        <DateFilter
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                            handleApply={handleApply}
                            handleClearFilter={handleClearFilter}
                        />}
                        {
                            CurrentUserRole === 'Super admin' &&
                            <>
                                <button data-testid={`${DashboardName} Export`} onClick={handleExport} disabled={data?.length === 0 || exportLoading}>
                                    <Image src={'export'} className={`w-6 h-6 bottom-1 ${data?.length ? 'cursor-pointer' : ''}`} toolTipId='export'/>
                                </button>
                                <HoverToolTip id='export'/>
                            </>
                        }
                    </div>
                </div>
                <div className="">
                    {loading
                        ? <GraphShimmer />
                        : (
                            data?.length !== 0 && <Bar height={250}
                                data={{
                                    labels: data.data?.map((item) => data?.scale === 'day'
                                        ? formatDate(item.day)
                                        : data?.scale === 'hour'
                                            ? item.hour.split(' ')[1].slice(0, 5)
                                            : item[data?.scale]),
                                    datasets: getGroupDataSet()
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        title: {
                                            display: false
                                        },
                                        legend: {
                                            display: false
                                        },
                                        tooltip: toolTipValue
                                    },
                                    animations: {
                                        tension: {
                                            duration: 1000,
                                            easing: 'linear',
                                            from: 1,
                                            to: 0,
                                            loop: true
                                        }
                                    },
                                    scales: scale
                                }}
                            />)

                    }
                </div>
                {(!loading && data.length === 0) && <div className='flex justify-center items-center h-full'>
                    <div className='border border-[#E5E9EB] text-center p-2 rounded-lg px-8 text-[#4F5962] font-normal text-[12px] leading-5'>No Data Found</div>
                </div> }
                {(!loading && data.length !== 0) && <h1 className='font-semibold text-[#52525B] text-center text-[14px] leading-[24px] px-1 pb-4 pt-2'>{
                    data?.scale === 'day'
                        ? 'Days'
                        : data?.scale === 'month' ? 'Months' : 'Time of day(Hours)'}</h1>}
            </div>
        </div>
    );
}
