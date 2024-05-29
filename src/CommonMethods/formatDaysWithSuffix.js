export function getOrdinalSuffix (number) {
    // Determine the appropriate suffix for the number
    let suffix = 'th';
    if (number % 100 !== 11 && number % 10 === 1) {
        suffix = 'st';
    } else if (number % 100 !== 12 && number % 10 === 2) {
        suffix = 'nd';
    } else if (number % 100 !== 13 && number % 10 === 3) {
        suffix = 'rd';
    }
    return suffix;
}

export function formatDaysWithSuffix (days) {
    const suffix = getOrdinalSuffix(days);
    return `${days}${suffix}`;
}
