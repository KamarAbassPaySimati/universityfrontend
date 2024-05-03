import React from 'react';
import Dashboard from '../pages/Dashboard/Dashboard';
import Admin from '../pages/Users/Admin';
import OnboardAdmin from '../pages/Users/Admin/Onboard admin/OnboardAdmin';
import OnboardAgent from '../pages/Users/Agent/Onboard Agent/OnboardAgent';
import SpecificAdminView from '../pages/Users/Admin/Components/SpecificAdminView/SpecificAdminView';
import KycVerification from '../pages/Verification/KycVerification';
import TrustBanks from '../pages/PaymaartBanks/TrustBanks';
import AddTrustBank from '../pages/PaymaartBanks/TrustBanks/AddTrustBank/AddTrustBank';
import RegisterKYC from '../components/KYC/KYCComponents/RegisterKYC';
import KYCView from '../components/KYC/KYCView/KYCView';

export const ComponentsBasedOnRole = {
    'super-admin':
    [
        {
            name: 'Dashboard',
            element: <Dashboard />,
            path: '/dashboard'
        },
        {
            name: 'Admin Users List',
            element: <Admin />,
            path: '/users/admins'
        },
        {
            name: 'Admin Users Specific View',
            element: <SpecificAdminView />,
            path: '/users/admins/:id'
        },
        {
            name: 'Admin Users Update',
            element: <OnboardAdmin actionKey={'update'}/>,
            path: '/users/admins/update-admin/:id'
        },
        {
            name: 'Register Admin Users',
            element: <OnboardAdmin />,
            path: '/users/admins/register-admin'
        },
        {
            name: 'Onboard Agent Users',
            element: <OnboardAgent role={'agent'}/>,
            path: '/users/agents/register-agent'
        },
        {
            name: 'Onboard Merchant Users',
            element: <OnboardAgent role={'merchant'}/>,
            path: '/users/merchants/register-merchant'
        },
        {
            name: 'Onboard Customer Users',
            element: <OnboardAgent role={'customer'}/>,
            path: '/users/customers/register-customer'
        },
        {
            name: 'KYC Verification list',
            element: <KycVerification />,
            path: '/verify/kyc-registration'
        },
        {
            name: 'Paymaart Trust Banks',
            element: <TrustBanks />,
            path: '/paymaart-banks'
        },
        {
            name: 'Paymaart Add Trust Banks',
            element: <AddTrustBank />,
            path: '/paymaart-banks/trust-banks/add-trust-bank'
        },
        {
            name: 'Agent KYC Registration',
            element: <RegisterKYC role={'agent'}/>,
            path: '/users/agents/register-agent/kyc-registration/:id'
        },
        // Agent Specific View
        {
            name: 'Agent Specific View',
            element: <KYCView role={'agent'} viewType={'specific'}/>,
            path: '/users/agents/register-agent/specific-view/:id'
        },
        {
            name: 'Customer KYC Registration',
            element: <RegisterKYC role={'customers'}/>,
            path: '/users/customers/register-customer/kyc-registration/:id'
        },
        {
            name: 'Merchant KYC Registration',
            element: <RegisterKYC role={'merchant'}/>,
            path: '/users/merchants/register-merchant/kyc-registration/:id'
        }

    ],
    admin:
    [
        {
            name: 'Admin Users List',
            element: <Admin />,
            path: '/users/admins'
        },
        {
            name: 'Onboard Agent Users',
            element: <OnboardAgent role={'agent'}/>,
            path: '/users/agents/register-agent'
        },
        {
            name: 'Onboard Merchant Users',
            element: <OnboardAgent role={'merchant'}/>,
            path: '/users/merchants/register-merchant'
        },
        {
            name: 'Onboard Customer Users',
            element: <OnboardAgent role={'customer'}/>,
            path: '/users/customers/register-customer'
        },
        {
            name: 'KYC Verification list',
            element: <KycVerification />,
            path: '/verify/kyc-registration'
        },
        {
            name: 'Paymaart Trust Banks',
            element: <TrustBanks />,
            path: '/paymaart-banks'
        },
        {
            name: 'Paymaart Add Trust Banks',
            element: <AddTrustBank />,
            path: '/paymaart-banks/trust-banks/add-trust-bank'
        }
    ],
    'support-admin':
    [
        {
            name: 'Onboard Agent Users',
            element: <OnboardAgent role={'agent'}/>,
            path: '/users/agents/register-agent'
        },
        {
            name: 'Onboard Merchant Users',
            element: <OnboardAgent role={'merchant'}/>,
            path: '/users/merchants/register-merchant'
        },
        {
            name: 'Onboard Customer Users',
            element: <OnboardAgent role={'customer'}/>,
            path: '/users/customers/register-customer'
        }
    ],
    'finance-admin':
    [
        {
            name: 'Paymaart Trust Banks',
            element: <TrustBanks />,
            path: '/paymaart-banks'
        },
        {
            name: 'Paymaart Add Trust Banks',
            element: <AddTrustBank />,
            path: '/paymaart-banks/trust-banks/add-trust-bank'
        }
    ]
};
