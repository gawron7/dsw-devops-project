import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { convertTemperature, getTemperatureSymbol } from '../functions/temperatureUtils';
import { addToFavorites, removeFromFavorites } from '../slices/weatherSlice';
import './CityCard.css';

export function CityCard({ city }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const temperatureUnits = useSelector(state => state.weather.temperatureUnits);
    const favorites = useSelector(state => state.weather.favorites);

    const isFavorite = useMemo(() => {
        return favorites.includes(city.id);
    }, [favorites, city.id]);

    const convertedTemp = useMemo(() => {
        return convertTemperature(city.current.temperature, temperatureUnits);
    }, [city.current.temperature, temperatureUnits]);

    const tempSymbol = useMemo(() => {
        return getTemperatureSymbol(temperatureUnits);
    }, [temperatureUnits]);

    const handleClick = () => {
        navigate(`/details?city=${city.id}`);
    };

    const handleFavoriteClick = useCallback((e) => {
        e.stopPropagation();
        if (isFavorite) {
            dispatch(removeFromFavorites(city.id));
        } else {
            dispatch(addToFavorites(city.id));
        }
    }, [dispatch, city.id, isFavorite]);

    return (
        <div className="city-card" onClick={handleClick}>
            <div className="city-header">
                <h3 className="city-name">{city.name}</h3>
                <div className="header-actions">
                    <button
                        className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
                        onClick={handleFavoriteClick}
                        aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                    >
                        {isFavorite ? '⭐' : '☆'}
                    </button>
                    <span className="country">{city.country}</span>
                </div>
            </div>

            <div className="current-weather">
                <div className="weather-icon">
                    <span className="icon">{city.current.icon}</span>
                </div>
                <div className="temperature">
                    <span className="temp-value">{convertedTemp}</span>
                    <span className="temp-unit">{tempSymbol}</span>
                </div>
                <div className="condition">
                    {city.current.condition}
                </div>
            </div>

            <div className="weather-details">
                <div className="detail-item">
                    <span className="label">Opady:</span>
                    <span className="value">{city.current.precipitation.probability}%</span>
                </div>
                <div className="detail-item">
                    <span className="label">Wiatr:</span>
                    <span className="value">{city.current.wind.speed} km/h {city.current.wind.direction}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Zachmurzenie:</span>
                    <span className="value">{city.current.cloudCover}%</span>
                </div>
            </div>
        </div>
    );
}
