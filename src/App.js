import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Counter from './components/Counter';
import TodoApp from './components/TodoApp';
import WeatherApp from './components/WeatherApp';
import MovieSearchApp from './components/MovieSearchApp';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/counter">Counter</Link></li>
            <li><Link to="/todo">Todo</Link></li>
            <li><Link to="/weather">Weather</Link></li>
            <li><Link to="/movies">Movies</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/counter" element={<Counter />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/weather" element={<WeatherApp />} />
          <Route path="/movies" element={<MovieSearchApp />} />
          <Route path="/" element={<h1>Welcome to My App</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
