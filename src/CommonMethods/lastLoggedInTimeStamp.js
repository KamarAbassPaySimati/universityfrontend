export default function isTimestampFiveMinutesAgo (timestamp) {
    const fiveMinutesInMilliseconds = 5 * 60; // 5 minutes in milliseconds
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp - timestamp >= fiveMinutesInMilliseconds;
};
