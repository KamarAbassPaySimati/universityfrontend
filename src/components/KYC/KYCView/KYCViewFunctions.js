export const getPaths = (viewType, role, status) => {
    switch (viewType) {
    case 'specific':
        switch (role) {
        case 'agent':
            return {
                activePath: 'Agent Profile',
                paths: ['Users', 'Agents'],
                pathurls: ['users/agents'],
                updateButtonPath: status === 'not_started'
                    ? '/users/agents/register-agent/kyc-registration/'
                    : '/users/agents/register-agent/kyc-update/'
            };
        case 'merchant':
            return {
                activePath: 'Merchant Profile',
                paths: ['Users', 'Merchants'],
                pathurls: ['users/merchants'],
                updateButtonPath: status === 'not_started'
                    ? '/users/merchants/register-merchant/kyc-registration/'
                    : '/users/merchants/register-merchant/kyc-update/'

            };
        case 'customer':
            return {
                activePath: 'Customer Profile',
                paths: ['Users', 'Customers'],
                pathurls: ['users/customers'],
                updateButtonPath: status === 'not_started'
                    ? '/users/customers/register-customer/kyc-registration/'
                    : '/users/customers/register-customer/kyc-update/'

            };
        default:
            break;
        }
        break;
    case 'kyc':
        switch (role) {
        case 'agent':
            return {
                activePath: 'Agent Profile',
                paths: ['Verify', 'KYC Registration'],
                pathurls: ['verify/kyc-registration']

            };
        case 'merchant':
            return {
                activePath: 'Merchant Profile',
                paths: ['Verify', 'KYC Registration'],
                pathurls: ['verify/kyc-registration']

            };
        case 'customer':
            return {
                activePath: 'Customer Profile',
                paths: ['Verify', 'KYC Registration'],
                pathurls: ['verify/kyc-registration']

            };
        }
        break;
    case 'DeleteAccount':
        switch (role) {
        case 'customer':
            return {
                activePath: 'Customer Profile',
                paths: ['Verify', 'Delete Account'],
                pathurls: ['verify/delete-account-requests', '?type=customers']
            };
        case 'agent':
            return {
                activePath: 'Agent Profile',
                paths: ['Verify', 'Delete Account'],
                pathurls: ['verify/delete-account-requests', '?type=agents']
            };
        case 'merchant':
            return {
                activePath: 'Agent Profile',
                paths: ['Verify', 'Delete Account'],
                pathurls: ['verify/delete-account-requests', '?type=agents']
            };
        }
        break;
    case 'Reported_merchants':
        return {
            activePath: 'Reported Merchant Details',
            paths: ['Users', 'Merchants', 'Reported Merchants'], // Added dynamically
            pathurls: ['users', 'merchants', ''] // Updated path URLs accordingly
        };
    case 'All_merchants':
        return {
            activePath: 'Merchant Profile',
            paths: ['Users', 'Merchants', 'All Merchants'], // Added dynamically
            pathurls: ['users', 'merchants', ''] // Updated path URLs accordingly
        };

    default:
        break;
    }
};

export const getStatusColor = (status) => {
    switch (status) {
    case 'completed':
        return {
            color: 'bg-[#ECFDF5] text-accent-positive',
            text: 'Completed'
        };
    case 'in_progress':
        return {
            color: 'bg-[#D9E8FE] text-[#0066F6]',
            text: 'In-progress'
        };
    case 'not_started':
        return {
            color: 'bg-[#E5E9EB] text-[#4F5962]',
            text: 'Not Started'
        };
    case 'info_required':
        return {
            color: 'bg-[#FFE8E8] text-[#FF6363]',
            text: 'Further Information Required'
        };
    case 'pending':
        return {
            color: 'bg-[#F0ECFF] text-[#67389A]',
            text: 'Pending'
        };
    case 'rejected':
        return {
            color: 'bg-[#FFE8E8] text-[#FF6363]',
            text: 'Rejected'
        };
    case 'approved':
        return {
            color: 'bg-[#ECFDF5] text-[#13B681]',
            text: 'Approved'
        };

    default:
        break;
    }
};

export const getApiurl = (id, viewType, role) => {
    switch (viewType) {
    case 'specific':
        switch (role) {
        case 'agent':
            return `view-specific-agent?paymaart_id=${id}`;
        case 'merchant':
            return `view-specific-merchant?paymaart_id=${id}`;
        case 'customer':
            return `view-specific-customer?paymaart_id=${id}`;
        default:
            break;
        }
        break;
    case 'All_merchants':
        switch (role) {
        case 'merchant':
            return `view-specific-merchant?paymaart_id=${id}`;
        default:
            break;
        }
        break;
    case 'kyc':
        switch (role) {
        case 'agent':
            return `view-specific-agent-kyc?paymaart_id=${id}`;
        case 'merchant':
            return `view-specific-merchant-kyc?paymaart_id=${id}`;
        case 'customer':
            return `view-specific-customer-kyc?paymaart_id=${id}`;
        default:
            break;
        }
        break;
    case 'DeleteAccount':
        switch (role) {
        case 'agent':
            return `specific-requests?user_id=${id}`;
        case 'customer':
            return `specific-requests?user_id=${id}`;
        case 'merchant':
            return `specific-requests?user_id=${id}`;
        }
        break;
    case 'Reported_merchants':
        return `reported-merchants/${id}`;
    default:
        break;
    }
};
