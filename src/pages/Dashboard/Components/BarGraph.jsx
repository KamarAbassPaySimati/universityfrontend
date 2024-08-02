/* eslint-disable max-len */
import React from 'react';
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

    return (
        <div className='h-[300px] w-full'>
            <div>
                <h1 className='font-semibold text-[18px] leading-[26px] pb-5 px-1'>Agent Registrations</h1>
            </div>
            <div className="dataCard customerCard">
                <Bar
                    height={350}
                    data={{
                        labels: sourceData.map((data) => data.label),
                        datasets: [
                            {
                                label: 'Count',
                                data: sourceData.map((data) => data.value),
                                backgroundColor: [
                                    'rgba(59, 42, 111, 0.7)'
                                ],
                                borderRadius: 0,
                                barThickness: 50
                            }
                        ]
                    }}
                    options={{
                        responsive: true,
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
            </div>
        </div>
    );
}
