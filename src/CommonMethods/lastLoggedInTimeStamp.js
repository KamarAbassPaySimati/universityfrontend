export default function isTimestampFiveMinutesAgo (timestamp) {
    const fiveMinutesInMilliseconds = 5 * 60; // 5 minutes in milliseconds
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // console.log(currentTimestamp, "currentTimestamp");
    //  console.log(timestamp, "Timestamp");
    //  console.log(fiveMinutesInMilliseconds, 'mili')
    //  console.log(currentTimestamp - timestamp)
    return currentTimestamp - timestamp >= fiveMinutesInMilliseconds;
};
