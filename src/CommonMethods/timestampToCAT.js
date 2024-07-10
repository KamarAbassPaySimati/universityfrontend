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
