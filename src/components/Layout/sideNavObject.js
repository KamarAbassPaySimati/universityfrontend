export const sideNavObject = {
    'super-admin': {
        Dashboard: {
            path: 'dashboard'
        },
        Transactions: {
            path: 'transactions',
            dropdown: ['Pay-out Requests', 'Flagged', 'Log']
        },
        Users: {
            path: 'users',
            dropdown: ['Admins', 'Agents', 'Customers', 'Merchants']
        },
        Financials: {
            path: 'financials',
            dropdown: ['Commissions', 'G2P', 'Set Limit', 'Transaction History']
        },
        Verify: {
            path: 'verify',
            dropdown: ['KYC Registration', 'Delete Account Requests']
        },
        'Paymaart Banks': {
            path: 'paymaart-banks'
        }

    },
    admin: {
        Dashboard: {
            path: 'dashboard'
        },
        Users: {
            path: 'users',
            dropdown: ['Admins', 'Agents', 'Merchants', 'Customers']
        },
        Verify: {
            path: 'verify',
            dropdown: ['KYC Registration', 'Delete Account']
        },
        'Paymaart Banks': {
            path: 'paymaart-banks'
        }

    },
    'support-admin': {
        Dashboard: {
            path: 'dashboard'
        },
        Users: {
            path: 'users',
            dropdown: ['KYC Registration', 'Delete Account']
        }
    },
    'finance-admin': {
        Dashboard: {
            path: 'dashboard'
        },
        Users: {
            path: 'users',
            dropdown: ['KYC Registration', 'Delete Account']
        },
        'Paymaart Banks': {
            path: 'paymaart-banks'
        }

    }
};
