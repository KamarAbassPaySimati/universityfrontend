export const getStatusStyles = (status) => {
    switch (status) {
    case 'pending':
        return 'bg-[#F0ECFF] text-[#67389A]';
    case 'approved':
        return 'bg-accent-positive-secondary text-accent-positive';
    case 'rejected':
        return 'bg-accent-negative-secondary text-primary-negative';
    default:
        return ''; // Default styles when status doesn't match any condition
    }
};

export const getStatusText = (status) => {
    switch (status) {
    case 'pending':
        return 'Pending';
    case 'rejected':
        return 'Rejected';
    case 'approved':
        return 'Approved';
    default:
        return '-'; // Default text when status doesn't match any condition
    }
};

export const getValueType = (transactionType) => {
    if (!transactionType) {
        return 'Txn';
    }
    if (transactionType === 'pay_in') {
        return 'Pay-in';
    }
    if (transactionType === 'cash_in' || transactionType === 'unregistered_cash_in') {
        return 'Cash-in';
    }
    if (transactionType === 'payout') {
        return 'Pay-out';
    }
    if (transactionType.includes('cashout')) {
        return 'Cash-out';
    }
    if (transactionType === 'interest') {
        return 'Interest';
    }
    if (transactionType === 'refund') {
        return 'Refund';
    }
    return 'Txn';
};
