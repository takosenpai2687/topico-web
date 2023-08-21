export const getTimeDiff = (dateFrom: Date, dateTo: Date): string => {
    // Calculate the time difference in milliseconds
    const timeDifference = dateTo.valueOf() - dateFrom.valueOf();

    // Convert milliseconds to minutes, hours, and days
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Determine the appropriate format based on the time difference
    let formattedTimeDifference: string;

    if (minutes < 60) {
        formattedTimeDifference = `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else if (hours < 24) {
        formattedTimeDifference = `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
        formattedTimeDifference = `${days} day${days > 1 ? "s" : ""}`;
    }
    return formattedTimeDifference;
};
