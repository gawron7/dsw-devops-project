import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Home} from './pages/Home';
import {Details} from './pages/Details';
import {Favorites} from './pages/Favorites';
import {Provider} from 'react-redux';
import {store} from './store';
import { useLocalStorage } from './hooks';

import './App.css';

const AppContent = () => {
    useLocalStorage();

    return (
                <div className="App">
                    <header>
                        <h1>Aplikacja Pogodowa</h1>
                    </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/details" element={<Details />} />
            </Routes>
        </div>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <AppContent />
            </Router>
        </Provider>
    );
};

export default App;
