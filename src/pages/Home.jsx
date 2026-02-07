import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CityCard } from '../components/CityCard';
import { TemperatureSelector } from '../components/TemperatureSelector';
import './Home.css';

export function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const { favorites, cities, loading, error } = useSelector(state => state.weather);

    const filteredCities = useMemo(() => {
        if (!cities.length) return [];

        if (!searchQuery.trim()) {
            return cities;
        }

        return cities.filter(city =>
            city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            city.country.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, cities]);

    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    return (
        <div className="home">
            <div className="home-header">
                <h1>Prognoza Pogody</h1>
                <div className="header-actions">
                    <Link to="/favorites" className="favorites-link">
                        ⭐ Ulubione ({favorites.length})
                    </Link>
                    <TemperatureSelector />
                </div>
            </div>

            <div className="search-section">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Szukaj miasta..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <div className="search-icon">🔍</div>
                </div>
            </div>

            <div className="cities-section">
                <h2>Miasta</h2>
                {loading ? (
                    <div className="loading">
                        <div className="loading-spinner"></div>
                        <p>Ładowanie danych pogodowych...</p>
                    </div>
                ) : error ? (
                    <div className="error-message">
                        <p>Błąd ładowania danych pogodowych: {error}</p>
                        <p>Używanie danych z pamięci podręcznej jeśli dostępne.</p>
                    </div>
                ) : filteredCities.length === 0 ? (
                    <div className="no-results">
                        {searchQuery ? `Nie znaleziono miast pasujących do "${searchQuery}"` : 'Brak dostępnych miast'}
                    </div>
                ) : (
                    <div className="cities-grid">
                        {filteredCities.map(city => (
                            <CityCard key={city.id} city={city} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
