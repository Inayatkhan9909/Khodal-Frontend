
function timeAgo(timestamp) {
    const currentTime = new Date();
    const postTime = new Date(timestamp);
    const elapsedMilliseconds = currentTime - postTime;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);
    const elapsedWeeks = Math.floor(elapsedDays / 7);
    const elapsedMonths = Math.floor(elapsedDays / 30);

    if (elapsedSeconds < 60) {
        return 'just now';
    } else if (elapsedMinutes < 60) {
        return `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''} ago`;
    } else if (elapsedHours < 24) {
        return `${elapsedHours} hour${elapsedHours > 1 ? 's' : ''} ago`;
    } else if (elapsedDays === 1) {
        return 'yesterday';
    } else if (elapsedDays < 7) {
        return `${elapsedDays} day${elapsedDays > 1 ? 's' : ''} ago`;
    } else if (elapsedWeeks === 1) {
        return '1 week ago';
    } else if (elapsedWeeks < 4) {
        return `${elapsedWeeks} weeks ago`;
    } else if (elapsedMonths === 1) {
        return '1 month ago';
    } else if (elapsedMonths < 12) {
        return `${elapsedMonths} months ago`;
    } else {
        return postTime.toLocaleD
    }
}

export default timeAgo