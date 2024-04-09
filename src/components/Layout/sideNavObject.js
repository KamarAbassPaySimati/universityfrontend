export const sideNavObject = {
    'super-admin': {
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
        }
    }
};
