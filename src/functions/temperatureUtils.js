export const convertTemperature = (celsius, targetUnit) => {
    switch (targetUnit) {
        case 'F':
            return Math.round((celsius * 9/5) + 32);
        case 'K':
            return Math.round(celsius + 273.15);
        case 'C':
        default:
            return celsius;
    }
};

export const getTemperatureSymbol = (unit) => {
    switch (unit) {
        case 'F':
            return '°F';
        case 'K':
            return 'K';
        case 'C':
        default:
            return '°C';
    }
};
