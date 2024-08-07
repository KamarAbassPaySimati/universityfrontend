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

// Register necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarGraph ({ DashboardName, endpoint, initialStates }) {
    const [states, setStates] = useState(initialStates);
    const [data, setData] = useState([]);
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
            const res = await dataService.GetAPI(`admin-dashboard/${endpoint}?${(DashboardName === 'Customer Registrations' && states.membership !== 'All') ? `membership=${states.membership.toUpperCase()}&` : ''}${params !== undefined ? `${params.substring(1)}` : `timePeriod=${states?.dateRangeType.toLowerCase().replaceAll(' ', '_')}`}`);
            let count = 0;
            res.data.data.forEach(element => {
                if (element.count !== 0) {
                    count = count + 1;
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
            const res = await dataService.GetAPI(`admin-dashboard/export-${endpoint}?${(DashboardName === 'Customer Registrations' && states.membership !== 'All') ? `membership=${states.membership.toUpperCase()}&` : ''}${isParams !== undefined ? `${isParams.substring(1)}` : `timePeriod=${states?.dateRangeType.toLowerCase().replaceAll(' ', '_')}`}`);
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
    return (
        <div className='py-[24px]'>
            <div className='h-[350px] border-[#F0ECFF] border p-4 rounded-[6px] '>
                <div className='flex justify-between'>
                    <h1 className='font-semibold text-[18px] leading-[26px] px-1 pb-4' data-testid={DashboardName}>{DashboardName}</h1>
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
                        <button data-testid={`${DashboardName} Export`} onClick={handleExport} disabled={data?.length === 0 || exportLoading}>
                            <Image src={'export'} className={`w-6 h-6 bottom-1 ${data?.length ? 'cursor-pointer' : ''}`} toolTipId='export'/>
                        </button>
                        <HoverToolTip id='export'/>
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
                                    datasets: [
                                        {
                                        // label: 'Count',
                                            data: data.data.map((data, index) => data.count),
                                            backgroundColor: [
                                                'rgba(59, 42, 111, 0.7)'
                                            ],
                                            borderRadius: 0,
                                            barThickness: data.data.length < 8 ? 50 : undefined,
                                            minBarLength: 5,
                                            borderWidth: 1
                                        }
                                    ]
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
                                        tooltip: {
                                            backgroundColor: '#E5E9EB',
                                            titleColor: '#4F5962',
                                            labelTextColor: '#4F5962',
                                            bodyColor: '#4F5962'
                                        }
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
                                    scales: {
                                        x: {
                                            grid: {
                                                display: false
                                            }
                                        }
                                    }
                                }}
                            />)

                    }
                </div>
                {(!loading && data.length === 0) && <div className='flex justify-center items-center h-full'>
                    <div className='border border-[#E5E9EB] text-center p-2 rounded-lg px-8 text-[#4F5962] font-normal text-[12px] leading-5'>No Data Found</div>
                </div> }
                {(!loading && data.length !== 0) && <h1 className='font-semibold text-[#52525B] text-center text-[14px] leading-[24px] px-1 pb-4 pt-2'>Time of day(Hours)</h1>}
            </div>
        </div>
    );
}
