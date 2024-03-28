export default function isTimestampFiveMinutesAgo (timestamp) {
    const fiveMinutesInMilliseconds = 5 * 60 * 1000; // 5 minutes in milliseconds
    const currentTimestamp = Date.now();
    return currentTimestamp - timestamp >= fiveMinutesInMilliseconds;
}
