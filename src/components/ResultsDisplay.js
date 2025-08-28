import React from 'react';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results }) => {
  if (!results || !results.detailedResults || results.detailedResults.length === 0) {
    return (
      <div className="results-container">
        <h2 className="results-title">Evaluation Results</h2>
        <p className="no-results">No answer was evaluated.</p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h2 className="results-title">Evaluation Results</h2>

      <div className="results-summary">
        <div className="score-card">
          <div className="score-number">{results.score || 0}</div>
          <div className="score-label">Total Score</div>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">{results.correctAnswers || 0}</div>
            <div className="stat-label">Correct</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{results.incorrectAnswers || 0}</div>
            <div className="stat-label">Incorrect</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{results.totalQuestions || 0}</div>
            <div className="stat-label">Total</div>
          </div>
        </div>
      </div>

      {results.detailedResults && (
        <div className="detailed-results">
          <h3>Question-wise Results</h3>
          {results.detailedResults.map((result, index) => (
            <div key={index} className={`result-item ${result.correct ? 'correct' : 'incorrect'}`}>
              <div className="result-header">
                <span className="question-number">Q{index + 1}</span>
                <span className={`status ${result.correct ? 'correct' : 'incorrect'}`}>
                  {result.correct ? '✓ Correct' : '✗ Incorrect'}
                </span>
                <span className="marks-gained">
                  Marks Gained: {result.marksGained !== undefined ? result.marksGained : 0}
                </span>
              </div>

              <div className="result-content">
                <p><strong>Original Answer:</strong> {result.correctAnswer || 'Not provided'}</p>
                <p><strong>Written Answer:</strong> {result.studentAnswer || 'Not provided'}</p>
                {result.feedback && <p><strong>Feedback:</strong> {result.feedback}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
