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

export const deepClone = (input) => {
    if (input === null || typeof input !== "object") return input;
    const initialValue = Array.isArray(input) ? [] : {};
    return Object.keys(input).reduce((acc, key) => {
        acc[key] = deepClone(input[key]);
        return acc;
    }, initialValue);
};

// export const generateCalendarData = (year = 0, month = 0) => {
//     const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
//     const monthName = new Date(year, month - 1, 1).toLocaleString('en-us', { month: 'long' });
//
//     const calendarData = {
//         year: year,
//         month: monthName.toLowerCase(),
//         day: []
//     };
//
//     // Loop through each day of the week
//     for (const day of weekdays) {
//         const dayData = {};
//         const daysInMonth = new Date(year, month, 0).getDate(); // Get the total number of days in the month
//         // Get the dates for the specific day of the week
//         const dates = [];
//         for (let i = 1; i <= daysInMonth; i++) {
//             const currentDate = new Date(year, month - 1, i);
//             if (currentDate.getDay() === weekdays.indexOf(day)) {
//                 dates.push(i);
//             }
//         }
//         // Add the day and corresponding dates to the calendar data
//         dayData[day] = dates;
//         calendarData.day.push(dayData);
//     }
//     return calendarData;
// }