import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { convertTemperature, getTemperatureSymbol } from '../functions/temperatureUtils';
import './WeatherDetails.css';

export function WeatherDetails({ city }) {
    const temperatureUnits = useSelector(state => state.weather.temperatureUnits);

    const convertedCurrentTemp = useMemo(() => {
        return convertTemperature(city.current.temperature, temperatureUnits);
    }, [city.current.temperature, temperatureUnits]);

    const convertedForecastTemps = useMemo(() => {
        return city.forecast.map(day => ({
            ...day,
            temperature: convertTemperature(day.temperature, temperatureUnits)
        }));
    }, [city.forecast, temperatureUnits]);

    const tempSymbol = useMemo(() => {
        return getTemperatureSymbol(temperatureUnits);
    }, [temperatureUnits]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="weather-details">
            <div className="current-section">
                <div className="city-info">
                    <h2>{city.name}, {city.country}</h2>
                    <div className="current-temp">
                        <span className="temp">{convertedCurrentTemp}{tempSymbol}</span>
                        <span className="condition">{city.current.condition}</span>
                    </div>
                </div>

                <div className="weather-icon-large">
                    <span className="icon">{city.current.icon}</span>
                </div>
            </div>

            <div className="details-grid">
                <div className="detail-card">
                    <h3>Opady</h3>
                    <div className="detail-value">{city.current.precipitation.probability}%</div>
                    <div className="detail-sub">
                        {city.current.precipitation.type !== 'none' ?
                            `${city.current.precipitation.amount} mm` :
                            'Brak opadów'
                        }
                    </div>
                </div>

                <div className="detail-card">
                    <h3>Wiatr</h3>
                    <div className="detail-value">{city.current.wind.speed} km/h</div>
                    <div className="detail-sub">{city.current.wind.direction}</div>
                </div>

                <div className="detail-card">
                    <h3>Zachmurzenie</h3>
                    <div className="detail-value">{city.current.cloudCover}%</div>
                    <div className="detail-sub">Pokrycie</div>
                </div>
            </div>

            <div className="forecast-section">
                <h3>Prognoza 5-dniowa</h3>
                <div className="forecast-grid">
                    {convertedForecastTemps.map((day, index) => (
                        <div key={index} className="forecast-day">
                            <div className="day-name">{formatDate(day.date)}</div>
                            <div className="day-icon">{day.icon}</div>
                            <div className="day-temp">{day.temperature}{tempSymbol}</div>
                            <div className="day-condition">{day.condition}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
