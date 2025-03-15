import React from 'react';
import CardHeader from '../../components/CardHeader';
import KYCTopWithType from '../../components/KYC/KYCTopWithType';
import BarGraph from './Components/BarGraph';
import MapView from './Components/MapView';

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
                        exportPermissions={['Super admin', 'Finance admin']}
                    />
                    <BarGraph
                        DashboardName ="Customer Registrations"
                        endpoint='customer-registration-insight'
                        initialStates={{ dateRangeType: 'Today', membership: 'All' }}
                        exportPermissions={['Super admin', 'Finance admin']}
                    />
                    <BarGraph
                        DashboardName ="Merchant Registrations"
                        endpoint='merchant-registration-insight'
                        initialStates={{ dateRangeType: 'Today', membership: 'All' }}
                        exportPermissions={['Super admin', 'Finance admin']}
                    />
                    <BarGraph
                        DashboardName ="Agent Cash-in; Cash-out"
                        endpoint='agent-cashin-cashout'
                        initialStates={{ dateRangeType: 'Today' }}
                        multiple={['Cash-in', 'Cash-out']}
                        count
                        exportPermissions={['Super admin', 'Finance admin']}
                    />
                    <BarGraph
                        DashboardName ="Agent Pay-in; Pay-out"
                        endpoint='agent-payin-payout'
                        initialStates={{ dateRangeType: 'Today' }}
                        multiple={['Pay-in', 'Pay-out']}
                        count
                        exportPermissions={['Super admin', 'Finance admin']}
                    />
                    <BarGraph
                        DashboardName ="Customer Pay-in; Cash-in; Cash-out"
                        endpoint='customer-payin-cashin-cashout'
                        initialStates={{ dateRangeType: 'Today' }}
                        multiple={['Pay-in', 'Cash-in', 'Cash-out']}
                        count
                        exportPermissions={['Super admin', 'Finance admin']}
                    />
                    <BarGraph
                        DashboardName ="Customer e-Payments"
                        endpoint='customer-epayment-insight'
                        initialStates={{ dateRangeType: 'Today', transaction_type: 'All' }}
                        count
                        exportPermissions={['Super admin', 'Finance admin']}
                    />
                    <BarGraph
                        DashboardName ="Admin KYC Approval"
                        endpoint='kyc-agent-insights'
                        initialStates={{ dateRangeType: 'Today' }}
                        multiple={['Agent', 'Customer', 'Merchant']}
                        exportPermissions={['Super admin']}
                    />
                    <MapView
                        DashboardName ="Merchant Based on Location"
                        endpoint='merchant-registration-insight-graph'
                        initialStates={{ districtFilter: 'All' }}
                        exportPermissions={['Super admin']}
                    />
                </div>
            </CardHeader>
        </div>
    );
};

export default Dashboard;
