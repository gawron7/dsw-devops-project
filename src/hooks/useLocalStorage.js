import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTemperatureUnits, setFavorites, loadWeatherData } from '../slices/weatherSlice';

export function useLocalStorage() {
    const dispatch = useDispatch();
    const { temperatureUnits, favorites, cities } = useSelector(state => state.weather);

    useEffect(() => {
        const savedTemperatureUnits = localStorage.getItem('weather-app-temperature-units');
        const savedFavorites = localStorage.getItem('weather-app-favorites');

        if (savedTemperatureUnits) {
            dispatch(setTemperatureUnits(savedTemperatureUnits));
        }

        if (savedFavorites) {
            try {
                const parsedFavorites = JSON.parse(savedFavorites);
                dispatch(setFavorites(parsedFavorites));
            } catch (error) {
                console.error('Error parsing favorites from localStorage:', error);
            }
        }

        if (cities.length === 0) {
            dispatch(loadWeatherData());
        }
    }, [dispatch, cities.length]);

    useEffect(() => {
        localStorage.setItem('weather-app-temperature-units', temperatureUnits);
    }, [temperatureUnits]);

    useEffect(() => {
        localStorage.setItem('weather-app-favorites', JSON.stringify(favorites));
    }, [favorites]);
}
