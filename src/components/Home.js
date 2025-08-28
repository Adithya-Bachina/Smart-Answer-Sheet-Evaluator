import React from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import OriginalAnswer from './OriginalAnswer';
import FileUpload from './FileUpload';
import ResultsDisplay from './ResultsDisplay';
import './Home.css';

const Home = ({
  originalAnswers,
  setOriginalAnswers,
  onFileSelect,
  results,
  loading,
  error,
}) => (
  <div className="page home-page">
    <div className="hero-section">
      <h1 className="animated-title">AI Answer Sheet Evaluation</h1>
      <p className="subtitle">Streamlined, intelligent grading for your assessments</p>
    </div>

    <nav className="sub-nav">
      <NavLink
        to="/home/key"
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <span className="nav-text">Answer Key</span>
      </NavLink>
      <NavLink
        to="/home/written"
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <span className="nav-text">Written Answer</span>
      </NavLink>
      <NavLink
        to="/home/results"
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <span className="nav-text">Results</span>
      </NavLink>
    </nav>

    <div className="sub-content animated-subcontent">
      <Routes>
        <Route index element={<Navigate replace to="/home/key" />} />
        <Route
          path="key"
          element={<OriginalAnswer onAnswersChange={setOriginalAnswers} />}
        />
        <Route
          path="written"
          element={<FileUpload onFileSelect={onFileSelect} />}
        />
        <Route
          path="results"
          element={
            loading ? (
              <div className="status-message loading">
                <div className="spinner">
                  <div className="double-bounce1"></div>
                  <div className="double-bounce2"></div>
                </div>
                <p>Processing your file, please wait...</p>
              </div>
            ) : error ? (
              <div className="status-message error">
                <p>Error: {error}</p>
              </div>
            ) : (
              <ResultsDisplay results={results} />
            )
          }
        />
      </Routes>
    </div>
  </div>
);

export default Home;