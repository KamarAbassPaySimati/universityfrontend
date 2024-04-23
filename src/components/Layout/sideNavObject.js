export const sideNavObject = {
    'super-admin': {
        Dashboard: {
            path: 'dashboard'
        },
        Users: {
            path: 'users',
            dropdown: ['Admins', 'Agents', 'Customers', 'Merchants']
        },
        Verification: {
            path: 'verification',
            dropdown: ['KYC Verifications', 'Del. Account Request']
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
        Verification: {
            path: 'verification',
            dropdown: ['KYC Verifications', 'Del. Account Request']
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
            dropdown: ['Agents', 'Merchants', 'Customers']
        }
    },
    'finance-admin': {
        Dashboard: {
            path: 'dashboard'
        },
        Users: {
            path: 'users',
            dropdown: ['Agents', 'Merchants', 'Customers']
        },
        'Paymaart Banks': {
            path: 'paymaart-banks'
        }

    }
};
