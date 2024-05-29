export function formatTimeAgo (timestamp) {
    const now = Date.now();
    const diffInMillis = now - timestamp * 1000; // Convert to milliseconds

    const minutes = Math.floor(diffInMillis / 60000);
    const hours = Math.floor(diffInMillis / 3600000);
    const days = Math.floor(diffInMillis / 86400000);

    if (days >= 1) {
        // More than 24 hours ago, display date
        const date = new Date(timestamp * 1000);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
    } else if (hours >= 1) {
        // Less than 24 hours but more than 1 hour ago
        return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
    } else {
        // Less than 1 hour ago
        return `${minutes} ${minutes > 1 ? 'min' : 'min'} ago`;
    }
}
