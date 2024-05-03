export const getPaths = (viewType, role) => {
    switch (viewType) {
    case 'specific':
        switch (role) {
        case 'agent':
            return {
                activePath: 'Agent Profile',
                paths: ['Users', 'Agents'],
                pathurls: ['users/agents']

            };
        case 'merchant':
            return {
                activePath: 'Merchant Profile',
                paths: ['Users', 'Merchants'],
                pathurls: ['users/merchants']

            };
        case 'customer':
            return {
                activePath: 'Customer Profile',
                paths: ['Users', 'Customers'],
                pathurls: ['users/customers']

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
        }
        break;

    default:
        break;
    }
};

export const getStatusColor = (status) => {
    switch (status) {
    case 'completed':
        return {
            color: 'bg-[#ECFDF5] text-accent-positive',
            text: 'In-progress'
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

    default:
        break;
    }
};
