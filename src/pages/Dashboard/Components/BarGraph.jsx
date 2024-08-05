/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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

// Register necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarGraph () {
    const [states, setStates] = useState({ dateRangeType: 'Today' });
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const sourceData = [
        {
            label: 'Ads',
            value: 32,
            links: '/manage-institutions?page_number=1&filter=true&status=true&sort=created_at%2Bdesc'
        },
        {
            label: 'Ads',
            value: 32,
            links: '/manage-institutions?page_number=1&filter=true&status=true&sort=created_at%2Bdesc'
        },
        {
            label: 'Sponsorships',
            value: 23,
            links: '/manage-institutions?page_number=1&filter=true&status=true&sort=created_at%2Bdesc'
        },
        {
            label: 'Ads',
            value: 32,
            links: '/manage-institutions?page_number=1&filter=true&status=true&sort=created_at%2Bdesc'
        },
        {
            label: 'Ads',
            value: 32,
            links: '/manage-institutions?page_number=1&filter=true&status=true&sort=created_at%2Bdesc'
        }
    ];
    const handleInput = (value, id) => {
        setStates(prevState => {
            return { ...prevState, dateRangeType: value };
        });
    };

    const fetchNotificationData = async (pageNumber) => {
        try {
            // setLoading(true); // Set loading state to true before API call
            const res = await dataService.GetAPI('admin-dashboard/agent-registration-insight?timePeriod=today');
            const newData = res.data.data;
            console.log('newwwww', newData);
            setData(res.data.data);
            setLoading(false);
            // if (res.data.nextPage === null) {
            //     setHasMore(false);
            // } else {
            //     setHasMore(true);
            // }
            // setNotificationData(prevData => [...prevData, ...newData]);
            // setPage(pageNumber + 1);
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            // setLoading(false); // Reset loading state after API call is completed
        }
    };
    useEffect(() => {
        fetchNotificationData(1);
    }, []);
    return (
        <div className='h-[324px]'>
            <div className='flex justify-between'>
                <h1 className='font-semibold text-[18px] leading-[26px] px-1 pb-4'>Agent Registrations</h1>
                <div className='flex gap-7'>
                    <InputFieldWithDropDown
                        labelName="Ref No."
                        value={states.dateRangeType}
                        placeholder="Enter Ref No."
                        error={false}
                        options={['Today', 'Yesterday', 'Last 7 days', 'last 30 days', 'Date Range']}
                        id="refNo"
                        testId="refNo"
                        handleInput={handleInput}
                        noLabel
                        button
                    />
                    <DateFilter />
                    <Image src={'export'} className={'w-7 h-7 cursor-pointer'}/>
                </div>
            </div>
            <div className="">
                {loading
                    ? <GraphShimmer />
                    : <>
                        <Bar height={250}
                            data={{
                                labels: data?.map((data) => data.hour.split(' ')[1].slice(0, 5)),
                                datasets: [
                                    {
                                        label: 'Count',
                                        data: data.map((data) => data.count),
                                        backgroundColor: [
                                            'rgba(59, 42, 111, 0.7)'
                                        ],
                                        borderRadius: 0,
                                        barThickness: data.length < 8 ? 50 : undefined,
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
                        />
                    </>
                }

            </div>
            <h1 className='font-semibold text-[#52525B] text-center text-[14px] leading-[24px] px-1 pb-4'>Time of day(Hours)</h1>
        </div>
    );
}
