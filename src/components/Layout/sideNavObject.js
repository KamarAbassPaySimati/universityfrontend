export const sideNavObject = {
    'super-admin': {
        Dashboard: {
            path: 'dashboard'
        },
        Users: {
            path: 'users',
            dropdown: ['Admins', 'Agents', 'Customers', 'Merchants']
        },
        Verify: {
            path: 'verify',
            dropdown: ['KYC Registration', 'Delete Account']
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
