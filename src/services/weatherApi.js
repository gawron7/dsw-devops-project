import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

const WEATHER_ICONS = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️',
};

const WEATHER_CONDITIONS_PL = {
    'clear sky': 'bezchmurnie',
    'few clouds': 'lekkie zachmurzenie',
    'scattered clouds': 'rozproszone chmury',
    'broken clouds': 'zachmurzenie umiarkowane',
    'overcast clouds': 'zachmurzenie duże',
    'shower rain': 'przelotny deszcz',
    'rain': 'deszcz',
    'thunderstorm': 'burza',
    'snow': 'śnieg',
    'mist': 'mgiełka',
    'light rain': 'lekki deszcz',
    'moderate rain': 'umiarkowany deszcz',
    'heavy rain': 'intensywny deszcz',
    'light snow': 'lekkie opady śniegu',
    'heavy snow': 'intensywne opady śniegu',
    'fog': 'mgła',
    'haze': 'zamglenie'
};

const translateWeatherCondition = (englishCondition) => {
    const lowerCondition = englishCondition.toLowerCase();
    return WEATHER_CONDITIONS_PL[lowerCondition] ||
           englishCondition.charAt(0).toUpperCase() + englishCondition.slice(1);
};

const getWindDirection = (degrees) => {
    const directions = ['Płn', 'Płn-PłnW', 'PłnW', 'PW-PłnW', 'PW', 'PW-PłdW', 'PłdW', 'Płd-PłdW', 'Płd', 'Płd-PłdW', 'PłdW', 'PW-PłdW', 'PW', 'PW-PłnW', 'PłnW', 'Płn-PłnW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
};

const transformCurrentWeather = (apiData) => {
    return {
        temperature: Math.round(apiData.main.temp - 273.15),
        condition: translateWeatherCondition(apiData.weather[0].description),
        icon: WEATHER_ICONS[apiData.weather[0].icon] || '☁️',
        precipitation: {
            probability: Math.round((apiData.clouds.all / 100) * 60),
            type: apiData.weather[0].main.toLowerCase(),
            amount: apiData.rain ? apiData.rain['1h'] || 0 : 0
        },
        wind: {
            speed: Math.round(apiData.wind.speed * 3.6),
            direction: getWindDirection(apiData.wind.deg)
        },
        cloudCover: apiData.clouds.all
    };
};

const transformForecast = (apiData) => {
    const dailyForecasts = {};
    apiData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toISOString().split('T')[0];
        const hour = new Date(item.dt * 1000).getHours();

        if (!dailyForecasts[date] || Math.abs(hour - 12) < Math.abs(dailyForecasts[date].hour - 12)) {
            dailyForecasts[date] = {
                date,
                temperature: Math.round(item.main.temp - 273.15),
                condition: translateWeatherCondition(item.weather[0].description),
                icon: WEATHER_ICONS[item.weather[0].icon] || '☁️',
                hour
            };
        }
    });

    return Object.values(dailyForecasts).slice(0, 5);
};

export const fetchCurrentWeather = async (cityName, countryCode = 'PL') => {
    try {
        const response = await api.get('/weather', {
            params: {
                q: `${cityName},${countryCode}`,
                appid: API_KEY,
                lang: 'en'
            }
        });

        return transformCurrentWeather(response.data);
    } catch (error) {
        console.error(`Error fetching current weather for ${cityName}:`, error);
        throw error;
    }
};

export const fetchWeatherForecast = async (cityName, countryCode = 'PL') => {
    try {
        const response = await api.get('/forecast', {
            params: {
                q: `${cityName},${countryCode}`,
                appid: API_KEY,
                lang: 'en'
            }
        });

        return transformForecast(response.data);
    } catch (error) {
        console.error(`Error fetching forecast for ${cityName}:`, error);
        throw error;
    }
};

export const fetchCitiesWeather = async (cities) => {
    const promises = cities.map(async (city) => {
        try {
            const [currentWeather, forecast] = await Promise.all([
                fetchCurrentWeather(city.name, city.country),
                fetchWeatherForecast(city.name, city.country)
            ]);

            return {
                ...city,
                current: currentWeather,
                forecast: forecast
            };
        } catch (error) {
            console.error(`Failed to fetch data for ${city.name}:`, error);
            return city;
        }
    });

    return Promise.all(promises);
};

export const searchCities = async (query) => {
    try {
        const response = await axios.get(`${GEO_URL}/direct`, {
            params: {
                q: query,
                limit: 5,
                appid: API_KEY
            }
        });

        return response.data.map(city => ({
            name: city.name,
            country: city.country,
            lat: city.lat,
            lon: city.lon
        }));
    } catch (error) {
        console.error('Error searching cities:', error);
        throw error;
    }
};
