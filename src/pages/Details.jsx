import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { WeatherDetails } from '../components/WeatherDetails';
import { TemperatureSelector } from '../components/TemperatureSelector';
import './Details.css';

export function Details() {
    const [searchParams] = useSearchParams();
    const cityId = parseInt(searchParams.get('city'));
    const { cities, loading } = useSelector(state => state.weather);

    const city = useMemo(() => {
        return cities.find(c => c.id === cityId);
    }, [cityId, cities]);

    if (loading) {
        return (
            <div className="details">
                <div className="details-header">
                    <h1>Szczegóły Pogody</h1>
                    <TemperatureSelector />
                </div>
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Ładowanie danych pogodowych...</p>
                </div>
            </div>
        );
    }

    if (!city) {
        return (
            <div className="details">
                <div className="details-header">
                    <h1>Weather Details</h1>
                    <TemperatureSelector />
                </div>
                <div className="error-message">
                    <h2>Miasto nie znalezione</h2>
                    <p>Żądane miasto nie zostało znalezione.</p>
                    <Link to="/" className="back-link">← Powrót do strony głównej</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="details">
            <div className="details-header">
                <Link to="/" className="back-link">← Powrót do strony głównej</Link>
                <h1>Szczegóły Pogody</h1>
                <TemperatureSelector />
            </div>

            <WeatherDetails city={city} />
        </div>
    );
}
