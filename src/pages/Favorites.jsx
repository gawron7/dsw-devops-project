import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CityCard } from '../components/CityCard';
import { TemperatureSelector } from '../components/TemperatureSelector';
import './Favorites.css';

export function Favorites() {
    const { favorites, cities, loading } = useSelector(state => state.weather);

    const favoriteCities = useMemo(() => {
        return cities.filter(city => favorites.includes(city.id));
    }, [favorites, cities]);

    return (
        <div className="favorites">
            <div className="favorites-header">
                <Link to="/" className="back-link">← Powrót do strony głównej</Link>
                <h1>Ulubione Miasta</h1>
                <TemperatureSelector />
            </div>

            <div className="favorites-content">
                {loading ? (
                    <div className="loading">
                        <div className="loading-spinner"></div>
                        <p>Ładowanie danych pogodowych...</p>
                    </div>
                ) : favoriteCities.length === 0 ? (
                    <div className="no-favorites">
                        <h2>Brak ulubionych miast</h2>
                        <p>Wróć do strony głównej i kliknij ikonę gwiazdki przy miastach, aby dodać je do ulubionych.</p>
                        <Link to="/" className="home-link">Przeglądaj Miasta</Link>
                    </div>
                ) : (
                    <>
                        <p className="favorites-count">
                            Masz {favoriteCities.length} ulubion{favoriteCities.length === 1 ? 'e miasto' : favoriteCities.length < 5 ? 'e miasta' : 'ych miast'}
                        </p>
                        <div className="cities-grid">
                            {favoriteCities.map(city => (
                                <CityCard key={city.id} city={city} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
