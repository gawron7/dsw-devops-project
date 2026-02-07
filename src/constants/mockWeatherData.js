export const MOCK_WEATHER_DATA = [
    {
        id: 1,
        name: 'Warszawa',
        country: 'Polska',
        current: {
            temperature: 15,
            condition: 'Częściowo pochmurno',
            icon: '⛅',
            precipitation: {
                probability: 20,
                type: 'rain',
                amount: 0.5
            },
            wind: {
                speed: 12,
                direction: 'NW'
            },
            cloudCover: 45
        },
        forecast: [
            { date: '2024-01-11', temperature: 16, condition: 'Słonecznie', icon: '☀️' },
            { date: '2024-01-12', temperature: 14, condition: 'Pochmurno', icon: '☁️' },
            { date: '2024-01-13', temperature: 13, condition: 'Deszczowo', icon: '🌧️' },
            { date: '2024-01-14', temperature: 17, condition: 'Częściowo pochmurno', icon: '⛅' },
            { date: '2024-01-15', temperature: 18, condition: 'Słonecznie', icon: '☀️' }
        ]
    },
    {
        id: 2,
        name: 'Kraków',
        country: 'Polska',
        current: {
            temperature: 18,
            condition: 'Słonecznie',
            icon: '☀️',
            precipitation: {
                probability: 0,
                type: 'none',
                amount: 0
            },
            wind: {
                speed: 8,
                direction: 'SW'
            },
            cloudCover: 15
        },
        forecast: [
            { date: '2024-01-11', temperature: 19, condition: 'Słonecznie', icon: '☀️' },
            { date: '2024-01-12', temperature: 17, condition: 'Częściowo pochmurno', icon: '⛅' },
            { date: '2024-01-13', temperature: 16, condition: 'Pochmurno', icon: '☁️' },
            { date: '2024-01-14', temperature: 20, condition: 'Słonecznie', icon: '☀️' },
            { date: '2024-01-15', temperature: 21, condition: 'Słonecznie', icon: '☀️' }
        ]
    },
    {
        id: 3,
        name: 'Gdańsk',
        country: 'Polska',
        current: {
            temperature: 12,
            condition: 'Deszczowo',
            icon: '🌧️',
            precipitation: {
                probability: 85,
                type: 'rain',
                amount: 4.2
            },
            wind: {
                speed: 25,
                direction: 'W'
            },
            cloudCover: 90
        },
        forecast: [
            { date: '2024-01-11', temperature: 11, condition: 'Deszczowo', icon: '🌧️' },
            { date: '2024-01-12', temperature: 13, condition: 'Pochmurno', icon: '☁️' },
            { date: '2024-01-13', temperature: 14, condition: 'Częściowo pochmurno', icon: '⛅' },
            { date: '2024-01-14', temperature: 12, condition: 'Deszczowo', icon: '🌧️' },
            { date: '2024-01-15', temperature: 15, condition: 'Słonecznie', icon: '☀️' }
        ]
    },
    {
        id: 4,
        name: 'Wrocław',
        country: 'Polska',
        current: {
            temperature: 14,
            condition: 'Pochmurno',
            icon: '☁️',
            precipitation: {
                probability: 30,
                type: 'rain',
                amount: 1.0
            },
            wind: {
                speed: 15,
                direction: 'NE'
            },
            cloudCover: 75
        },
        forecast: [
            { date: '2024-01-11', temperature: 15, condition: 'Pochmurno', icon: '☁️' },
            { date: '2024-01-12', temperature: 16, condition: 'Częściowo pochmurno', icon: '⛅' },
            { date: '2024-01-13', temperature: 14, condition: 'Deszczowo', icon: '🌧️' },
            { date: '2024-01-14', temperature: 17, condition: 'Słonecznie', icon: '☀️' },
            { date: '2024-01-15', temperature: 18, condition: 'Słonecznie', icon: '☀️' }
        ]
    },
    {
        id: 5,
        name: 'Poznań',
        country: 'Polska',
        current: {
            temperature: 16,
            condition: 'Częściowo pochmurno',
            icon: '⛅',
            precipitation: {
                probability: 10,
                type: 'rain',
                amount: 0.2
            },
            wind: {
                speed: 10,
                direction: 'SE'
            },
            cloudCover: 35
        },
        forecast: [
            { date: '2024-01-11', temperature: 17, condition: 'Słonecznie', icon: '☀️' },
            { date: '2024-01-12', temperature: 15, condition: 'Pochmurno', icon: '☁️' },
            { date: '2024-01-13', temperature: 16, condition: 'Częściowo pochmurno', icon: '⛅' },
            { date: '2024-01-14', temperature: 18, condition: 'Słonecznie', icon: '☀️' },
            { date: '2024-01-15', temperature: 19, condition: 'Słonecznie', icon: '☀️' }
        ]
    },
    {
        id: 6,
        name: 'Łódź',
        country: 'Polska',
        current: {
            temperature: 13,
            condition: 'Śnieżnie',
            icon: '❄️',
            precipitation: {
                probability: 70,
                type: 'snow',
                amount: 2.5
            },
            wind: {
                speed: 18,
                direction: 'N'
            },
            cloudCover: 85
        },
        forecast: [
            { date: '2024-01-11', temperature: 12, condition: 'Śnieżnie', icon: '❄️' },
            { date: '2024-01-12', temperature: 11, condition: 'Pochmurno', icon: '☁️' },
            { date: '2024-01-13', temperature: 14, condition: 'Deszczowo', icon: '🌧️' },
            { date: '2024-01-14', temperature: 15, condition: 'Częściowo pochmurno', icon: '⛅' },
            { date: '2024-01-15', temperature: 16, condition: 'Słonecznie', icon: '☀️' }
        ]
    }
];
