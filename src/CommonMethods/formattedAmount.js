export const formattedAmount = (amount) => {
    if (!amount) {
        return null;
    }
    return new Intl.NumberFormat('en-US', {
        // style: 'currency',
        // currency: 'MWK',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};
