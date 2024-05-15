function calculate() {
    const type = input.get('find').raw();

    switch (type) {
        case 'distance':
            calculateDistance();
            break;
        case 'speed':
            calculateSpeed();
            break;
        default:
            calculateTime();
    }

}

function calculateDistance() {
    const time = getTime();
    const speed = getSpeed();

    const distanceKm = roundTo(time * speed, 2);
    const distanceMi = roundTo(distanceKm / 1.61, 2);

    _('result').innerHTML = distanceKm + 'km or ' + distanceMi + 'mi';
}

function calculateSpeed() {
    const time = getTime();
    const distance = getDistance();

    const speedKmH = roundTo(distance / time);

    _('result').innerHTML = speedKmH + 'km/h';
}

function calculateTime() {
    const speed = getSpeed();
    const distance = getDistance();

    const timeH = roundTo(distance / speed);

    _('result').innerHTML = convertHoursToReadable(timeH);
}

//We will calculate everything in km/h, km, hour, so we will convert each value to this system

function getTime() {
    const timeUnit = input.get('time_dropdown').raw();

    const time = (timeUnit !== 'hh:mm:ss') ?
        input.get('time').positive().val() :
        input.get('time').time().raw();

    if (!input.valid()) return;

    switch (timeUnit) {
        case 'yr':
            return roundTo(time * 8760);
            break;
        case 'd':
            return roundTo(time * 24);
            break;
        case 'min':
            return roundTo(time / 60);
            break;
        case 's':
            return roundTo(time / 60 * 60);
            break;
        case 'hh:mm:ss':
            return roundTo(time.getHours() + (time.getMinutes() / 60) + (time.getSeconds() / 60 / 60));
            break;
    }

    return time;
}

function getSpeed() {
    const speedUnit = input.get('speed_dropdown').raw();
    const speed = input.get('speed').positive().val();

    if (!input.valid()) return;

    const speedUnits = {
        'in/s': 10.936,
        'in/min': 656.2,
        'in/hr': 39370,
        'ft/s': 1.097,
        'ft/min': 54.681,
        'ft/hr': 3281,
        'yd/s': 3.292,
        'yd/min': 18.227,
        'yd/hr': 1094,
        'cm/s': 27.778,
        'cm/min': 1667,
        'm/s': 3.6,
        'm/min': 16.667,
        'm/hr': 1000,
        'mi/s': 5794,
        'mi/min': 96.561,
        'mi/h (mph)': 1.609,
        'km/s': 3600,
        'km/min': 60,
        'km/h (kph)': 1,
        'knots': 1.852
    };

    return roundTo(speed / speedUnits[speedUnit], 4);
}

function getDistance() {
    const distanceUnit = input.get('distance_dropdown').raw();
    const distance = input.get('distance').positive().val();

    if (!input.valid()) return;

    const distanceUnits = {
        in: distance / 39370,
        ft: distance / 3281,
        yd: distance / 1094,
        mi: distance * 1.609,
        cm: distance / 100000,
        m: distance / 1000,
        km: distance,
        nmi: distance * 1.852
    }

    return roundTo(distanceUnits[distanceUnit], 4);
}

function convertHoursToReadable(hours) {
    const secondsPerMinute = 60;
    const minutesPerHour = 60;
    const hoursPerDay = 24;
    const daysPerYear = 365;

    const totalSeconds = Math.floor(hours * minutesPerHour * secondsPerMinute);
    const years = Math.floor(totalSeconds / (secondsPerMinute * minutesPerHour * hoursPerDay * daysPerYear));
    const days = Math.floor(totalSeconds / (secondsPerMinute * minutesPerHour * hoursPerDay)) % daysPerYear;
    const hoursRemaining = Math.floor(totalSeconds / (secondsPerMinute * minutesPerHour)) % hoursPerDay;
    const minutes = Math.floor(totalSeconds / secondsPerMinute) % minutesPerHour;
    const seconds = totalSeconds % secondsPerMinute;

    let result = [];
    if (years) result.push(plural(years, 'years:year:years:years:years:years'));
    if (days) result.push(plural(days, 'days:day:days:days:days:days'));
    if (hoursRemaining) result.push(plural(hoursRemaining, 'hours:hour:hours:hours:hours:hours'));
    if (minutes) result.push(plural(minutes, 'minutes:minute:minutes:minutes:minutes:minutes'));
    if (seconds) result.push(plural(seconds, 'seconds:second:seconds:seconds:seconds:seconds'));

    return result.join(', ');
}