import React from 'react';
import Dashboard from '../pages/Dashboard/Dashboard';
import Admin from '../pages/Users/Admin';
import OnboardAdmin from '../pages/Users/Admin/Onboard admin/OnboardAdmin';
import OnboardAgent from '../pages/Users/Agent/Onboard Agent/OnboardAgent';
import SpecificAdminView from '../pages/Users/Admin/Components/SpecificAdminView/SpecificAdminView';
import KycVerification from '../pages/Verification/KycVerification';
import TrustBanks from '../pages/PaymaartBanks/TrustBanks';
import AddTrustBank from '../pages/PaymaartBanks/TrustBanks/AddTrustBank/AddTrustBank';

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
            name: 'KYC Verification list',
            element: <KycVerification />,
            path: '/verification/kyc-verifications'
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
            name: 'KYC Verification list',
            element: <KycVerification />,
            path: '/verification/kyc-verifications'
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
