import React from 'react';
import Dashboard from '../pages/Dashboard/Dashboard';
import Admin from '../pages/Users/Admin';
import OnboardAdmin from '../pages/Users/Admin/Onboard admin/OnboardAdmin';
import OnboardAgent from '../pages/Users/Agent/Onboard Agent/OnboardAgent';
import SpecificAdminView from '../pages/Users/Admin/Components/SpecificAdminView/SpecificAdminView';
import RegisterKYC from '../pages/Users/Agent/Onboard Agent/components/RegisterKYC';

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
            element: <OnboardAgent />,
            path: '/users/agents/register-agent'
        },
        {
            name: 'Agent KYC Registration',
            element: <RegisterKYC />,
            path: '/users/agents/register-agent/kyc-registration/:id'
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
            element: <OnboardAgent />,
            path: '/users/agents/register-agent'
        }
    ],
    'support-admin':
    [
        {
            name: 'Onboard Agent Users',
            element: <OnboardAgent />,
            path: '/users/agents/register-agent'
        }
    ],
    'finance-admin':
    [

    ]
};
