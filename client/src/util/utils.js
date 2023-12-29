export const calculateTimeDifference = (endDate = "", onlyValidate = false) => {
    if (endDate === "") return null;

    const currentDate = new Date();
    const [year, month, day, hours, minutes, seconds] = endDate.split('-').map(Number);
    const targetDate = new Date(year, month - 1, day, hours, minutes, seconds);
    const timeDifferenceMillis = targetDate - currentDate;

    if (timeDifferenceMillis > 0) {
        if (onlyValidate) return true;

        const secondsDiff = Math.floor(timeDifferenceMillis / 1000) % 60;
        const minutesDiff = Math.floor(timeDifferenceMillis / (1000 * 60)) % 60;
        const hoursDiff = Math.floor(timeDifferenceMillis / (1000 * 60 * 60)) % 24;
        const daysDiff = Math.floor(timeDifferenceMillis / (1000 * 60 * 60 * 24));

        return {
            days: daysDiff,
            hours: hoursDiff,
            minutes: minutesDiff,
            seconds: secondsDiff,
        };
    } else {
        if (onlyValidate) return false;
        return null;
    }
};

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateUniqueRandomNumbers = (count, min, max) => {
    const uniqueNumbers = new Set();

    while (uniqueNumbers.size < count) {
        const randomNumber = generateRandomNumber(min, max);
        uniqueNumbers.add(randomNumber);
    }

    return Array.from(uniqueNumbers);
}