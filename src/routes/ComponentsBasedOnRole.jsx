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
import DeleteAccount from '../pages/Verification/DeleteAccount';
import SetLimit from '../pages/Financials/SetLimit/index';
import Commissions from '../pages/Financials/Commissions/Commissions';
import G2pList from '../pages/Financials/G2P/index';
import G2PCustomerViewList from '../pages/Financials/G2P/Components/G2PCustomerViewList';
import BankTransactionView from '../pages/PaymaartBanks/BankTransactionView';
import AddTransaction from '../pages/PaymaartBanks/AddTransaction';

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
                element: <OnboardAdmin actionKey={'update'} />,
                path: '/users/admins/update-admin/:id'
            },
            {
                name: 'Register Admin Users',
                element: <OnboardAdmin />,
                path: '/users/admins/register-admin'
            },
            {
                name: 'Onboard Agent Users',
                element: <OnboardAgent role={'agent'} />,
                path: '/users/agents/register-agent'
            },
            {
                name: 'Onboard Merchant Users',
                element: <OnboardAgent role={'merchant'} />,
                path: '/users/merchants/register-merchant'
            },
            {
                name: 'Onboard Customer Users',
                element: <OnboardAgent role={'customer'} />,
                path: '/users/customers/register-customer'
            },
            {
                name: 'KYC Verification list',
                element: <KycVerification />,
                path: '/verify/kyc-registration'
            },
            {
                name: 'Delete Account Request',
                element: <DeleteAccount />,
                path: '/verify/delete-account-requests'
            },
            // Agent Delete Account Request View
            {
                name: 'Agent Delect Account Request View',
                element: <KYCView role={'agent'} viewType={'DeleteAccount'} />,
                path: '/verify/delete-account-requests/agent-profile/:id'
            },
            // Agent Kyc Specific View
            {
                name: 'Agent Kyc Specific View',
                element: <KYCView role={'agent'} viewType={'kyc'} />,
                path: '/verify/kyc-registration/agent-profile/:id'
            },
            // Merchant Kyc Specific View
            {
                name: 'Merchant Kyc Specific View',
                element: <KYCView role={'merchant'} viewType={'kyc'} />,
                path: '/verify/kyc-registration/merchant-profile/:id'
            },
            // customer Kyc Specific View
            {
                name: 'Customer Kyc Specific View',
                element: <KYCView role={'customer'} viewType={'kyc'} />,
                path: '/verify/kyc-registration/customer-profile/:id'
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
                name: 'Paymaart View Trust Banks',
                element: <BankTransactionView type={'trust-bank'}/>,
                path: '/paymaart-banks/trust-banks/view-trust-bank/:id'
            },
            {
                name: 'Paymaart Add Trust Bank Transaction',
                element: <AddTransaction type={'trust-bank'}/>,
                path: '/paymaart-banks/trust-banks/view-trust-bank/:id/add-transaction'
            },
            {
                name: 'Paymaart View Capital Bank',
                element: <BankTransactionView type={'main-capital'}/>,
                path: '/paymaart-banks/main-capital/view-main-capital/:id'
            },
            {
                name: 'Paymaart Add Capital Transaction',
                element: <AddTransaction type={'main-capital'}/>,
                path: '/paymaart-banks/main-capital/view-main-capital/:id/add-transaction'
            },
            {
                name: 'Agent KYC Registration',
                element: <RegisterKYC role={'agent'} />,
                path: '/users/agents/register-agent/kyc-registration/:id'
            },
            {
                name: 'Customer KYC Registration',
                element: <RegisterKYC role={'customers'} />,
                path: '/users/customers/register-customer/kyc-registration/:id'
            },
            {
                name: 'Merchant KYC Registration',
                element: <RegisterKYC role={'merchant'} />,
                path: '/users/merchants/register-merchant/kyc-registration/:id'
            },

            // Agent Specific View from Agent Listing
            {
                name: 'Agent Specific View',
                element: <KYCView role={'agent'} viewType={'specific'} />,
                path: '/users/agents/register-agent/specific-view/:id'
            },
            // Agent Specific View from Agent Listing
            {
                name: 'Agent Specific View',
                element: <KYCView role={'agent'} viewType={'specific'} />,
                path: '/users/agents/register-agent/specific-view/:id'
            },
            // Merchant Specific View from Merchant Listing
            {
                name: 'Merchant Specific View',
                element: <KYCView role={'merchant'} viewType={'specific'} />,
                path: '/users/merchants/register-merchant/specific-view/:id'
            },
            // customer Specific View from Merchant Listing
            {
                name: 'Customer Specific View',
                element: <KYCView role={'customer'} viewType={'specific'} />,
                path: '/users/customers/register-customer/specific-view/:id'
            },
            // KYC Update for Agent
            {
                name: 'Agent KYC Update',
                element: <RegisterKYC role={'agent'} type='update' />,
                path: '/users/agents/register-agent/kyc-update/:id'
            },
            // KYC Update for Merchant
            {
                name: 'Merchant KYC Update',
                element: <RegisterKYC role={'merchant'} type='update' />,
                path: '/users/merchants/register-merchant/kyc-update/:id'
            },
            // KYC Update for Customer
            {
                name: 'Customer KYC Update',
                element: <RegisterKYC role={'customer'} type='update' />,
                path: '/users/customers/register-customer/kyc-update/:id'
            },
            // View and update set limit finance
            {
                name: 'Set limit View',
                element: <SetLimit />,
                path: '/financials/set-limit'
            },
            // View and update Commissions
            {
                name: 'Commissions',
                element: <Commissions />,
                path: '/financials/Commissions'
            },
            // G2p customer List
            {
                name: 'G2P Customers',
                element: <G2pList />,
                path: '/financials/g2p'
            },
            // View G2P customer
            {
                name: 'G2P Customer View',
                element: <G2PCustomerViewList />,
                path: '/financials/g2p/view-profile/:id'
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
                element: <OnboardAgent role={'agent'} />,
                path: '/users/agents/register-agent'
            },
            {
                name: 'Onboard Merchant Users',
                element: <OnboardAgent role={'merchant'} />,
                path: '/users/merchants/register-merchant'
            },
            {
                name: 'Onboard Customer Users',
                element: <OnboardAgent role={'customer'} />,
                path: '/users/customers/register-customer'
            },
            {
                name: 'KYC Verification list',
                element: <KycVerification />,
                path: '/verify/kyc-registration'
            },
            // Agent Kyc Specific View
            {
                name: 'Agent Kyc Specific View',
                element: <KYCView role={'agent'} viewType={'kyc'} />,
                path: '/verify/kyc-registration/agent-profile/:id'
            },
            // Merchant Kyc Specific View
            {
                name: 'Merchant Kyc Specific View',
                element: <KYCView role={'merchant'} viewType={'kyc'} />,
                path: '/verify/kyc-registration/merchant-profile/:id'
            },
            // customer Kyc Specific View
            {
                name: 'Customer Kyc Specific View',
                element: <KYCView role={'customer'} viewType={'kyc'} />,
                path: '/verify/kyc-registration/customer-profile/:id'
            },
            // Agent Specific View from Agent Listing
            {
                name: 'Agent Specific View',
                element: <KYCView role={'agent'} viewType={'specific'} />,
                path: '/users/agents/register-agent/specific-view/:id'
            },
            // Merchant Specific View from Merchant Listing
            {
                name: 'Merchant Specific View',
                element: <KYCView role={'merchant'} viewType={'specific'} />,
                path: '/users/merchants/register-merchant/specific-view/:id'
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
                name: 'Paymaart View Trust Banks',
                element: <BankTransactionView type={'trust-bank'}/>,
                path: '/paymaart-banks/trust-banks/view-trust-bank/:id'
            },
            {
                name: 'Paymaart Add Trust Bank Transaction',
                element: <AddTransaction type={'trust-bank'}/>,
                path: '/paymaart-banks/trust-banks/view-trust-bank/:id/add-transaction'
            },
            {
                name: 'Paymaart View Capital Bank',
                element: <BankTransactionView type={'main-capital'}/>,
                path: '/paymaart-banks/main-capital/view-main-capital/:id'
            },
            {
                name: 'Paymaart Add Capital Transaction',
                element: <AddTransaction type={'main-capital'}/>,
                path: '/paymaart-banks/main-capital/view-main-capital/:id/add-transaction'
            },
            {
                name: 'Agent KYC Registration',
                element: <RegisterKYC role={'agent'} />,
                path: '/users/agents/register-agent/kyc-registration/:id'
            },
            {
                name: 'Customer KYC Registration',
                element: <RegisterKYC role={'customers'} />,
                path: '/users/customers/register-customer/kyc-registration/:id'
            },
            {
                name: 'Merchant KYC Registration',
                element: <RegisterKYC role={'merchant'} />,
                path: '/users/merchants/register-merchant/kyc-registration/:id'
            }
        ],
    'support-admin':
        [
            {
                name: 'Onboard Agent Users',
                element: <OnboardAgent role={'agent'} />,
                path: '/users/agents/register-agent'
            },
            {
                name: 'Onboard Merchant Users',
                element: <OnboardAgent role={'merchant'} />,
                path: '/users/merchants/register-merchant'
            },
            {
                name: 'Onboard Customer Users',
                element: <OnboardAgent role={'customer'} />,
                path: '/users/customers/register-customer'
            },
            {
                name: 'Agent KYC Registration',
                element: <RegisterKYC role={'agent'} />,
                path: '/users/agents/register-agent/kyc-registration/:id'
            },
            {
                name: 'Customer KYC Registration',
                element: <RegisterKYC role={'customers'} />,
                path: '/users/customers/register-customer/kyc-registration/:id'
            },
            {
                name: 'Merchant KYC Registration',
                element: <RegisterKYC role={'merchant'} />,
                path: '/users/merchants/register-merchant/kyc-registration/:id'
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
            },
            // G2p List
            // G2p customer List
            {
                name: 'G2P Customers',
                element: <G2pList />,
                path: '/financials/g2p'
            },
            // View G2P customer
            {
                name: 'G2P Customer View',
                element: <G2PCustomerViewList />,
                path: '/financials/g2p/view-profile/:id'
            },
            {
                name: 'Paymaart View Trust Banks',
                element: <BankTransactionView type={'trust-bank'}/>,
                path: '/paymaart-banks/trust-banks/view-trust-bank/:id'
            },
            {
                name: 'Paymaart Add Trust Bank Transaction',
                element: <AddTransaction type={'trust-bank'}/>,
                path: '/paymaart-banks/trust-banks/view-trust-bank/:id/add-transaction'
            },
            {
                name: 'Paymaart View Capital Bank',
                element: <BankTransactionView type={'main-capital'}/>,
                path: '/paymaart-banks/main-capital/view-main-capital/:id'
            },
            {
                name: 'Paymaart Add Capital Transaction',
                element: <AddTransaction type={'main-capital'}/>,
                path: '/paymaart-banks/main-capital/view-main-capital/:id/add-transaction'
            }
        ]
};
