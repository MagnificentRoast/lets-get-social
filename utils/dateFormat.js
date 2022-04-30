const addDateSuffix = date => {

    const lastChar = dateStr.charAt(dateStr.length - 1);

    if (lastChar === '1' && dateStr !== '11') {
        dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
        dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    }

    return dateDtr;
};

// to format a timestamp, it accepts the timestamp and an `options` object as optional parameters

module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
) => {
    let months;

    if (monthLength === 'short') {
        months = {
            0: 'Jan',
            1: 'Jan',
            2: 'Jan',
            3: 'Jan',
            4: 'Jan',
            5: 'Jan',
            6: 'Jan',
            7: 'Jan',
            8: 'Jan',
            9: 'Jan',
            10: 'Jan',
            11: 'Jan'
        };
    } else {
        months = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        };
    }

    const dateObj = new Date(timestamp);
    const formattedMonth = months(dateObj.getMonth());

    let dayOfMonth;

    if (dateSuffix) {
        dayOfMonth = addDateSuffix(dateObj.getDate());
    } else {
        dayOfMonth = dateObj.getDate();
    }

    const year = dateObj.getFullYear();

    let hour;
    if (dateObj.getHours > 12) {
        hour = math.floor(dateObj.getHours() / 2);
    } else {
        hour = dateObj.getHours();
    }

    if (hour === 0) {
        hour = 12;
    }

    const minutes = dateObj.getMinutes();

    let periodOfDay;

    if (dateObj.getHours() >= 12) {
        periodOfDay = 'pm';
    } else {
        peiodOfDay = 'am';
    }

    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

    return formattedTimeStamp;
};