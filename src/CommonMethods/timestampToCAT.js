import { DateTime } from 'luxon';

export default function convertTimestampToCAT (timestamp) {
    if (!timestamp && isNaN(Number(timestamp))) {
        return null;
    }
    // Create a DateTime object from the timestamp assuming the timestamp is in seconds
    const utcDateTime = DateTime.fromSeconds(Number(timestamp), { zone: 'utc' });
    const catDateTime = utcDateTime.setZone('Africa/Blantyre');

    // Format the DateTime object in the desired format
    const formattedTime = catDateTime.toFormat("dd MMM yyyy, HH:mm 'hours'");

    return formattedTime;
};

export function convertTimestampToDateYear (timestamp) {
    if (!timestamp && isNaN(Number(timestamp))) {
        return null;
    }
    // Create a DateTime object from the timestamp assuming the timestamp is in seconds
    const utcDateTime = DateTime.fromSeconds(Number(timestamp), { zone: 'utc' });
    const catDateTime = utcDateTime.setZone('Africa/Blantyre');

    // Format the DateTime object in the desired format
    const formattedTime = catDateTime.toFormat('dd LLL yy');

    return formattedTime;
};

export function getQuarterEndDate (timestamp) {
    if (!timestamp && isNaN(Number(timestamp))) {
        return null;
    }

    // Convert the timestamp to a DateTime object
    const date = DateTime.fromSeconds(+timestamp);

    // Determine the quarter and corresponding end date
    const quarter = Math.ceil(date.month / 3);
    const year = date.year;

    let quarterEndDate;
    switch (quarter) {
    case 1:
        quarterEndDate = `Q1 - 31 Mar ${year}`;
        break;
    case 2:
        quarterEndDate = `Q2 - 30 Jun ${year}`;
        break;
    case 3:
        quarterEndDate = `Q3 - 30 Sep ${year}`;
        break;
    case 4:
        quarterEndDate = `Q4 - 31 Dec ${year}`;
        break;
    default:
        throw new Error('Invalid quarter');
    }

    return quarterEndDate;
}
