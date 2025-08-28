import React from 'react';
import './About.css';
import { FaUpload, FaFileAlt, FaChartBar, FaRobot } from 'react-icons/fa';

const About = () => (
  <div className="page about-page">
    <div className="header">
      <h1 className="animated-title">AI Answer Evaluator</h1>
      <p className="subtitle">Revolutionize grading with intelligent automation</p>
    </div>

    <section className="intro-section animated-section">
      <p className="intro">
        Streamline your grading process with our AI-powered evaluator. Instantly assess student answer sheets against the original key, saving time and ensuring accuracy without human error.
      </p>
    </section>

    <section className="how-it-works animated-section">
      <h2>How It Works</h2>
      <ol className="steps">
        <li className="step-item">
          <span className="material-icons">upload_file</span>
          Upload the <strong>Answer Key</strong> in JSON, CSV, or TXT format.
        </li>
        <li className="step-item">
          <span className="material-icons">description</span>
          Submit student answer sheets for evaluation.
        </li>
        <li className="step-item">
          <span className="material-icons">compare_arrows</span>
          AI compares answers and allocates marks automatically.
        </li>
        <li className="step-item">
          <span className="material-icons">bar_chart</span>
          View detailed results and summaries instantly.
        </li>
      </ol>
    </section>

    <section className="features-section animated-section">
      <h2>Key Features</h2>
      <div className="features">
        <div className="feature-card">
          <FaUpload className="feature-icon" />
          <h3>Easy Upload</h3>
          <p>Supports JSON, CSV, and TXT formats for seamless answer key imports.</p>
        </div>
        <div className="feature-card">
          <FaFileAlt className="feature-icon" />
          <h3>Automated Grading</h3>
          <p>Instantly compares student answers with the key for accurate scoring.</p>
        </div>
        <div className="feature-card">
          <FaChartBar className="feature-icon" />
          <h3>Detailed Analytics</h3>
          <p>Provides clear score summaries and insights for each student.</p>
        </div>
        <div className="feature-card">
          <FaRobot className="feature-icon" />
          <h3>AI-Powered</h3>
          <p>Uses advanced AI algorithms for precise and fair evaluations.</p>
        </div>
      </div>
    </section>

    <section className="tech-section animated-section">
      <h2>Technologies Used</h2>
      <p className="tech">
        Powered by <strong>React</strong> for a dynamic frontend, <strong>REST API</strong> for robust backend integration, and <strong>AI algorithms</strong> for intelligent evaluation.
      </p>
    </section>
  </div>
);

export default About;