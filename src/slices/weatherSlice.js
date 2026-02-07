import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {TEMPERATURE_UNITS} from '../constants/temperatureUnits';
import { getWeatherData } from '../services/weatherDataService';

const initialState = {
    temperatureUnits: TEMPERATURE_UNITS.CELSIUS,
    favorites: [],
    cities: [],
    loading: false,
    error: null,
};

export const loadWeatherData = createAsyncThunk(
    'weather/loadWeatherData',
    async () => {
        const data = await getWeatherData();
        return data;
    }
);

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setTemperatureUnits(state, action) {
            state.temperatureUnits = action.payload;
        },
        addToFavorites(state, action) {
            if (!state.favorites.includes(action.payload)) {
                state.favorites.push(action.payload);
            }
        },
        removeFromFavorites(state, action) {
            state.favorites = state.favorites.filter(id => id !== action.payload);
        },
        setFavorites(state, action) {
            state.favorites = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadWeatherData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadWeatherData.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;
            })
            .addCase(loadWeatherData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                if (state.cities.length === 0) {
                    import('../constants/mockWeatherData').then(({ MOCK_WEATHER_DATA }) => {
                        state.cities = MOCK_WEATHER_DATA;
                    });
                }
            });
    },
});

export const {setTemperatureUnits, addToFavorites, removeFromFavorites, setFavorites} = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;
