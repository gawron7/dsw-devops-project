import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTemperatureUnits } from '../slices/weatherSlice';
import { TEMPERATURE_UNITS } from '../constants/temperatureUnits';
import './TemperatureSelector.css';

export function TemperatureSelector() {
    const dispatch = useDispatch();
    const currentUnits = useSelector(state => state.weather.temperatureUnits);

    const handleUnitChange = useCallback((unit) => {
        dispatch(setTemperatureUnits(unit));
    }, [dispatch]);

    return (
        <div className="temperature-selector">
            <label className="selector-label">Jednostki temperatury:</label>
            <div className="unit-buttons">
                {Object.values(TEMPERATURE_UNITS).filter(unit => typeof unit === 'string').map(unit => (
                    <button
                        key={unit}
                        className={`unit-button ${currentUnits === unit ? 'active' : ''}`}
                        onClick={() => handleUnitChange(unit)}
                    >
                        °{unit}
                    </button>
                ))}
            </div>
        </div>
    );
}
