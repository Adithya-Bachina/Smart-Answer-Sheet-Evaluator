import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Feedback from './components/Feedback';
import './App.css';

function App() {
  const [originalAnswers, setOriginalAnswers] = React.useState([]);
  const [results, setResults] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleOriginalAnswersChange = (answers) => {
    setOriginalAnswers(answers);
    setResults(null);
    setError(null);
  };

  const handleFileSelect = async (file) => {
    if (originalAnswers.length === 0) {
      alert('Please add original answers first before evaluating.');
      return;
    }
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const formData = new FormData();
      formData.append('answerSheet', file);
      formData.append('originalAnswers', JSON.stringify(originalAnswers));
      const response = await fetch('http://localhost:5000/api/evaluate', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">

      {/* 🎨 Moving Animated Background Objects */}
      <div className="background-objects">
        <span className="object">📘</span>
        <span className="object">📕</span>
        <span className="object">📖</span>
        <span className="object">🖊️</span>
        <span className="object">📄</span>
        <span className="object">📗</span>
        <span className="object">✏️</span>
      </div>

      {/* 🌐 Navbar */}
      <nav className="navbar">
        <div className="nav-logo glow">AI Eval</div>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/home/key"
              className={({ isActive }) => (isActive ? 'active ripple' : 'ripple')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'active ripple' : 'ripple')}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feedback"
              className={({ isActive }) => (isActive ? 'active ripple' : 'ripple')}
            >
              Feedback
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* 📄 Page Content */}
      <main className="app-main animate-page">
        {loading && (
          <div className="book-loader">
            <span>📖</span>
            <p>Evaluating your answers...</p>
          </div>
        )}
        {!loading && (
          <Routes>
            <Route
              path="/home/*"
              element={
                <Home
                  originalAnswers={originalAnswers}
                  setOriginalAnswers={handleOriginalAnswersChange}
                  onFileSelect={handleFileSelect}
                  results={results}
                  loading={loading}
                  error={error}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="*" element={<Navigate to="/home/key" replace />} />
          </Routes>
        )}
      </main>

      {/* 📌 Footer */}
      <footer className="app-footer wave-text">
        <p>&copy; 2025 AI Answer Sheet Evaluation System</p>
      </footer>
    </div>
  );
}

export default App;
