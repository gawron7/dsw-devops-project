import { fetchCitiesWeather, searchCities } from './weatherApi';
import { MOCK_WEATHER_DATA } from '../constants/mockWeatherData';

const USE_REAL_API = import.meta.env.VITE_OPENWEATHER_API_KEY && import.meta.env.VITE_OPENWEATHER_API_KEY !== 'demo_key';

export const getWeatherData = async () => {
    if (USE_REAL_API) {
        try {
            console.log('Fetching real weather data from OpenWeatherMap API...');
            const realData = await fetchCitiesWeather(MOCK_WEATHER_DATA);
            console.log('Successfully loaded real weather data');
            return realData;
        } catch (error) {
            console.warn('Failed to fetch real weather data, falling back to mock data:', error);
            return MOCK_WEATHER_DATA;
        }
    } else {
        console.log('Using mock weather data (no API key configured)');
        return MOCK_WEATHER_DATA;
    }
};

export const searchCitiesData = async (query) => {
    if (USE_REAL_API) {
        try {
            const apiResults = await searchCities(query);
            return apiResults.filter(city => city.country === 'PL');
        } catch (error) {
            console.warn('City search failed, using mock data filter:', error);
        }
    }

    return MOCK_WEATHER_DATA.filter(city =>
        city.name.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase())
    );
};

export const getCityWeather = async (cityId) => {
    const allCities = await getWeatherData();
    return allCities.find(city => city.id === cityId);
};
