import React from 'react';
import CardHeader from '../../components/CardHeader';
import KYCTopWithType from '../../components/KYC/KYCTopWithType';
import BarGraph from './Components/BarGraph';

const Dashboard = () => {
    return (
        <div>
            <CardHeader
                activePath='Dashboard'
                minHeightRequired={true}
                UpdateIcon={true}
                navigationPath=''
                table={true}
                ChildrenElement
            >
                <KYCTopWithType
                    Name={'Dashboard'}
                />
                <div
                    data-testid="agentCommission"
                    className={`mx-10 mb-8 px-[30px] pt-[24px] pb-[28px] 
                        h-fit
                flex flex-col justify-between bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                    <div className='border-[#F0ECFF] border p-4 rounded-[6px]'>
                        <BarGraph />
                    </div>
                </div>
            </CardHeader>
        </div>
    );
};

export default Dashboard;
