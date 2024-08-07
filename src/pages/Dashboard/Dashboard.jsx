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
                    className={`mx-10 mb-8 px-[30px] 
                         overflow-auto h-noDataError scrollBar
                flex flex-col justify-between bg-[#FFFFFF] border border-neutral-outline rounded-[6px]
                `}>
                    <BarGraph
                        DashboardName ="Agent Registrations"
                        endpoint='agent-registration-insight'
                        initialStates={{ dateRangeType: 'Today' }}
                    />
                    <BarGraph
                        DashboardName ="Customer Registrations"
                        endpoint='customer-registration-insight'
                        initialStates={{ dateRangeType: 'Today', membership: 'All' }}
                    />
                    <BarGraph
                        DashboardName ="Agent Cash-in; Cash-out (MWK)"
                        endpoint='agent-cashin-cashout'
                        initialStates={{ dateRangeType: 'Today', membership: 'All' }}
                        multiple={['Cash-in', 'Cash-out']}
                    />
                    <BarGraph
                        DashboardName ="Admin KYC Approval"
                        endpoint='kyc-agent-insights'
                        initialStates={{ dateRangeType: 'Today', membership: 'All' }}
                        multiple={['Agent', 'Customer', 'Merchant']}
                    />

                </div>
            </CardHeader>
        </div>
    );
};

export default Dashboard;
