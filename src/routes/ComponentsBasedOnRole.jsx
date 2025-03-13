/* eslint-disable max-len */
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
import TransactionHistory from '../pages/Financials/Transaction History/TransactionHistory';
import ViewTransactionDetails from '../pages/Financials/Transaction History/View Transaction Details/ViewTransactionDetails';
import PayOutRequests from '../pages/Transactions/PayOutRequests';
import ViewPayOutRequest from '../pages/Transactions/PayOutRequests/Components/ViewPayOutRequest';
import ViewTransactionList from '../pages/Users/Agent/ViewTransactionList/ViewTransactionList';
import Flagged from '../pages/Transactions/Flagged';
import TransactionsLog from '../pages/Transactions/TransactionsLog/TransactionsLog';
import ViewSpecificFlagged from '../pages/Transactions/Flagged/ViewSpecific/ViewSpecificFlagged';
import Agent from '../pages/Users/Agent';
import Merchant from '../pages/Users/Merchants';
import Customer from '../pages/Users/Customer';

export const ComponentsBasedOnRole = {
    'super-admin':
        [
            {
                name: 'Dashboard',
                element: <Dashboard />,
                path: '/dashboard'
            },
            // pay-out
            {
                name: 'Pay Out Requests',
                element: <PayOutRequests />,
                path: '/transactions/pay-out-requests'
            },
            {
                name: 'Pay Out Requests Specific View',
                element: <ViewPayOutRequest />,
                path: '/transactions/pay-out-requests/:id'
            },
            // Flagged List
            {
                name: 'Flagged List',
                element: <Flagged />,
                path: '/transactions/flagged'
            },
            {
                name: 'View specific flagged transaction',
                element: <ViewSpecificFlagged />,
                path: '/transactions/flagged/view/:senderId/:transactionType/:id'
            },
            // Transaction Log
            {
                name: 'Transaction Log',
                element: <TransactionsLog />,
                path: '/transactions/log'
            },
            // Admin
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
            // Agent
            {
                name: 'Agent Users List',
                element: <Agent />,
                path: '/users/agents'
            },
            {
                name: 'Agent Specific View',
                element: <KYCView role={'agent'} viewType={'specific'} />,
                path: '/users/agents/register-agent/specific-view/:id'
            },
            // Merchant
            {
                name: 'Merchant Users List',
                element: <Merchant />,
                path: '/users/merchants'
            },
            // customers
            {
                name: 'customers Users List',
                element: <Customer />,
                path: '/users/customers'
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
            // Customer Delete Account Request View
            {
                name: 'Customer Delect Account Request View',
                element: <KYCView role={'customer'} viewType={'DeleteAccount'} />,
                path: '/verify/delete-account-requests/customer-profile/:id'
            },
            // Merchant Delete Account Request View
            {
                name: 'Merchant Delect Account Request View',
                element: <KYCView role={'merchant'} viewType={'DeleteAccount'} />,
                path: '/verify/delete-account-requests/merchant-profile/:id'
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
                element: <BankTransactionView type={'trust-bank'} />,
                path: '/paymaart-banks/trust-banks/view-trust-bank/:id'
            },
            {
                name: 'Paymaart Add Trust Bank Transaction',
                element: <AddTransaction type={'trust-bank'} />,
                path: '/paymaart-banks/trust-banks/view-trust-bank/:id/add-transaction'
            },
            {
                name: 'Paymaart View Suspense Account',
                element: <BankTransactionView type={'suspense-account'} />,
                path: '/paymaart-banks/suspense-account/view-suspense-account/:id'
            },
            {
                name: 'Paymaart Add Suspense Account Transaction',
                element: <AddTransaction type={'suspense-account'} />,
                path: '/paymaart-banks/suspense-account/view-suspense-account/:id/add-transaction'
            },
            {
                name: 'Paymaart View Capital Bank',
                element: <BankTransactionView type={'main-capital'} />,
                path: '/paymaart-banks/main-capital/view-main-capital/:id'
            },
            {
                name: 'Paymaart Add Capital Transaction',
                element: <AddTransaction type={'main-capital'} />,
                path: '/paymaart-banks/main-capital/view-main-capital/:id/add-transaction'
            },
            // Paymaart Bank Transaction fees and Commision View
            {
                name: 'Paymaart View Transaction fees and Commision',
                element: <BankTransactionView type={'transaction-fees-and-commissions'} />,
                path: '/paymaart-banks/transaction-fees-and-commissions/view-transaction-fees-and-commissions/:id'
            },
            {
                name: 'Paymaart Add Transaction fees and Commision',
                element: <AddTransaction type={'transaction-fees-and-commissions'} />,
                path: '/paymaart-banks/transaction-fees-and-commissions/view-transaction-fees-and-commissions/:id/add-transaction'
            },
            // Paymaart Bank Tax account
            {
                name: 'Paymaart View Tax Account',
                element: <BankTransactionView type={'taxes'} />,
                path: '/paymaart-banks/taxes/view-taxes/:id'
            },
            {
                name: 'Paymaart Add Tax Account',
                element: <AddTransaction type={'taxes'} />,
                path: '/paymaart-banks/taxes/view-taxes/:id/add-transaction'
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
            // Merchant Specific View from Merchant Listing
            {
                name: 'Merchant Specific View',
                element: <KYCView role={'merchant'} viewType={'All_merchants'} />,
                path: '/users/merchants/register-merchant/specific-view/:id'
            },
            // Reported Merchant Specific View from Merchant Listing
            {
                name: 'Reported Merchant Specific View',
                element: <KYCView role={'merchant'} viewType={'Reported_merchants'} />,
                path: '/users/merchants/reported-merchant/specific-view/:id'
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
            },
            // Financial Transaction History List
            {
                name: 'List Self Transaction History',
                element: <TransactionHistory />,
                path: '/financials/transaction-history'
            },
            // Financial Transaction History View Specific
            {
                name: 'View specific Self Transaction History',
                element: <ViewTransactionDetails type='admin' />,
                path: '/financials/transaction-history/:id'
            },
            // Specific agent transaction list
            {
                name: 'Specific Agent Transaction List',
                element: <ViewTransactionList type='agents' />,
                path: '/users/agents/agents-transaction-histories/:id'
            },
            // Specific Customer transaction list
            {
                name: 'Specific Customer Transaction List',
                element: <ViewTransactionList type='customers' />,
                path: '/users/customers/customers-transaction-histories/:id'
            },
            // Specific Merchant transaction list
            {
                name: 'Specific Merchant Transaction List',
                element: <ViewTransactionList type='merchants' />,
                path: '/users/merchants/merchants-transaction-histories/:id'
            },
            // Specific agent view specific transaction
            {
                name: 'Specific Agent view Specific Transaction',
                element: <ViewTransactionDetails type='agent' />,
                path: '/users/agents/agents-transaction-histories/view/:agentId/:transactionType/:id'
            },
            // Specific customer view specific transaction
            {
                name: 'Specific Customer view Specific Transaction',
                element: <ViewTransactionDetails type='customer' />,
                path: '/users/customers/customers-transaction-histories/view/:agentId/:transactionType/:id'
            },
            // Specific Merchant view specific transaction
            {
                name: 'Specific Merchant view Specific Transaction',
                element: <ViewTransactionDetails type='merchant' />,
                path: '/users/merchants/merchants-transaction-histories/view/:agentId/:transactionType/:id'
            }
        ],
    admin:
        [
            {
                name: 'Dashboard',
                element: <Dashboard />,
                path: '/dashboard'
            },
            // Flagged List
            {
                name: 'Flagged List',
                element: <Flagged />,
                path: '/transactions/flagged'
            },
            {
                name: 'View specific flagged transaction',
                element: <ViewSpecificFlagged />,
                path: '/transactions/flagged/view/:senderId/:transactionType/:id'
            },
            // Transaction Log
            {
                name: 'Transaction Log',
                element: <TransactionsLog />,
                path: '/transactions/log'
            },
            // Admin
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
            // Agent
            {
                name: 'Agent Users List',
                element: <Agent />,
                path: '/users/agents'
            },
            {
                name: 'Agent Specific View',
                element: <KYCView role={'agent'} viewType={'specific'} />,
                path: '/users/agents/register-agent/specific-view/:id'
            },
            // Merchant
            {
                name: 'Merchant Users List',
                element: <Merchant />,
                path: '/users/merchants'
            },
            // customers
            {
                name: 'customers Users List',
                element: <Customer />,
                path: '/users/customers'
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
            // Specific Customer transaction list
            {
                name: 'Specific Customer Transaction List',
                element: <ViewTransactionList type='customers'/>,
                path: '/users/customers/customers-transaction-histories/:id'
            },
            // Specific Merchant transaction list
            {
                name: 'Specific Merchant Transaction List',
                element: <ViewTransactionList type='merchants' />,
                path: '/users/merchants/merchants-transaction-histories/:id'
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
                element: <BankTransactionView type={'trust-bank'} />,
                path: '/paymaart-banks/trust-banks/view-trust-bank/:id'
            },
            {
                name: 'Paymaart Add Trust Bank Transaction',
                element: <AddTransaction type={'trust-bank'} />,
                path: '/paymaart-banks/trust-banks/view-trust-bank/:id/add-transaction'
            },
            {
                name: 'Paymaart View Suspense Account',
                element: <BankTransactionView type={'suspense-account'} />,
                path: '/paymaart-banks/suspense-account/view-suspense-account/:id'
            },
            {
                name: 'Paymaart Add Suspense Account Transaction',
                element: <AddTransaction type={'suspense-account'} />,
                path: '/paymaart-banks/suspense-account/view-suspense-account/:id/add-transaction'
            },
            {
                name: 'Paymaart View Capital Bank',
                element: <BankTransactionView type={'main-capital'} />,
                path: '/paymaart-banks/main-capital/view-main-capital/:id'
            },
            {
                name: 'Paymaart Add Capital Transaction',
                element: <AddTransaction type={'main-capital'} />,
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
            // Paymaart Bank Tax account
            {
                name: 'Paymaart View Tax Account',
                element: <BankTransactionView type={'taxes'} />,
                path: '/paymaart-banks/taxes/view-taxes/:id'
            },
            {
                name: 'Paymaart Add Tax Account',
                element: <AddTransaction type={'taxes'} />,
                path: '/paymaart-banks/taxes/view-taxes/:id/add-transaction'
            },
            // Financial Transaction History List
            {
                name: 'List Self Transaction History',
                element: <TransactionHistory />,
                path: '/financials/transaction-history'
            },
            // Financial Transaction History View Specific
            {
                name: 'View specific Self Transaction History',
                element: <ViewTransactionDetails type='admin' />,
                path: '/financials/transaction-history/:id'
            }
        ],
    'support-admin':
        [
            {
                name: 'Dashboard',
                element: <Dashboard />,
                path: '/dashboard'
            },
            // Flagged List
            {
                name: 'Flagged List',
                element: <Flagged />,
                path: '/transactions/flagged'
            },
            {
                name: 'View specific flagged transaction',
                element: <ViewSpecificFlagged />,
                path: '/transactions/flagged/view/:senderId/:transactionType/:id'
            }
        ],
    'finance-admin':
        [
            {
                name: 'Dashboard',
                element: <Dashboard />,
                path: '/dashboard'
            },
            // pay-out
            {
                name: 'Pay Out Requests',
                element: <PayOutRequests />,
                path: '/transactions/pay-out-requests'
            },
            {
                name: 'Pay Out Requests Specific View',
                element: <ViewPayOutRequest />,
                path: '/transactions/pay-out-requests/:id'
            },
            // Flagged List
            {
                name: 'Flagged List',
                element: <Flagged />,
                path: '/transactions/flagged'
            },
            {
                name: 'View specific flagged transaction',
                element: <ViewSpecificFlagged />,
                path: '/transactions/flagged/view/:senderId/:transactionType/:id'
            },
            // Transaction Log
            {
                name: 'Transaction Log',
                element: <TransactionsLog />,
                path: '/transactions/log'
            },
            // Admin
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
            // Agent
            {
                name: 'Agent Users List',
                element: <Agent />,
                path: '/users/agents'
            },
            {
                name: 'Agent Specific View',
                element: <KYCView role={'agent'} viewType={'specific'} />,
                path: '/users/agents/register-agent/specific-view/:id'
            },
            // Merchant
            {
                name: 'Merchant Users List',
                element: <Merchant />,
                path: '/users/merchants'
            },
            // customers
            {
                name: 'customers Users List',
                element: <Customer />,
                path: '/users/customers'
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
                element: <BankTransactionView type={'trust-bank'} />,
                path: '/paymaart-banks/trust-banks/view-trust-bank/:id'
            },
            {
                name: 'Paymaart Add Trust Bank Transaction',
                element: <AddTransaction type={'trust-bank'} />,
                path: '/paymaart-banks/trust-banks/view-trust-bank/:id/add-transaction'
            },
            {
                name: 'Paymaart View Suspense Account',
                element: <BankTransactionView type={'suspense-account'} />,
                path: '/paymaart-banks/suspense-account/view-suspense-account/:id'
            },
            {
                name: 'Paymaart Add Suspense Account Transaction',
                element: <AddTransaction type={'suspense-account'} />,
                path: '/paymaart-banks/suspense-account/view-suspense-account/:id/add-transaction'
            },
            {
                name: 'Paymaart View Capital Bank',
                element: <BankTransactionView type={'main-capital'} />,
                path: '/paymaart-banks/main-capital/view-main-capital/:id'
            },
            {
                name: 'Paymaart Add Capital Transaction',
                element: <AddTransaction type={'main-capital'} />,
                path: '/paymaart-banks/main-capital/view-main-capital/:id/add-transaction'
            },
            // Paymaart Bank Tax account
            {
                name: 'Paymaart View Tax Account',
                element: <BankTransactionView type={'taxes'} />,
                path: '/paymaart-banks/taxes/view-taxes/:id'
            },
            {
                name: 'Paymaart Add Tax Account',
                element: <AddTransaction type={'taxes'} />,
                path: '/paymaart-banks/taxes/view-taxes/:id/add-transaction'
            },
            // Paymaart Bank Transaction fees and Commision View
            {
                name: 'Paymaart View Transaction fees and Commision',
                element: <BankTransactionView type={'transaction-fees-and-commissions'}/>,
                path: '/paymaart-banks/transaction-fees-and-commissions/view-transaction-fees-and-commissions/:id'
            },
            {
                name: 'Paymaart Add Transaction fees and Commision',
                element: <AddTransaction type={'transaction-fees-and-commissions'}/>,
                path: '/paymaart-banks/transaction-fees-and-commissions/view-transaction-fees-and-commissions/:id/add-transaction'
            },
            // Financial Transaction History List
            {
                name: 'List Self Transaction History',
                element: <TransactionHistory />,
                path: '/financials/transaction-history'
            },
            // Financial Transaction History View Specific
            {
                name: 'View specific Self Transaction History',
                element: <ViewTransactionDetails type='admin'/>,
                path: '/financials/transaction-history/:id'
            }
        ]
};
