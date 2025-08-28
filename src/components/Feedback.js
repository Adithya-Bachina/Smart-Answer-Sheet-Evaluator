import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatus({ type: 'error', text: 'Please enter your feedback.' });
      return;
    }
    try {
      // Placeholder for actual API call:
      // await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message })
      // });
      setStatus({ type: 'success', text: '🎉 Thank you for your feedback!' });
      setMessage('');
    } catch {
      setStatus({ type: 'error', text: '❌ Error submitting feedback.' });
    }
  };

  const handleClear = () => {
    setMessage('');
    setStatus(null);
  };

  return (
    <div className="feedback-page">
      <div className="feedback-card">
        <div className="header">
          <h2 className="animated-title">We Value Your Feedback!</h2>
          <p className="subtitle">Share your thoughts, suggestions, or report issues to help us improve.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="message" className="input-label">Your Feedback</label>
            <textarea
              id="message"
              rows="6"
              placeholder="Type your feedback here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-field"
              maxLength={500}
            />
            <div className="char-count">{message.length} / 500</div>
          </div>
          <div className="feedback-actions">
            <button type="submit" className="action-btn submit-btn">
              <span className="material-icons"></span>
              Submit Feedback
            </button>
            <button type="button" className="action-btn clear-btn" onClick={handleClear}>
              <span className="material-icons"></span>
              Clear
            </button>
          </div>
        </form>
        {status && (
          <div className={`feedback-status ${status.type} animated-status`}>
            {status.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;