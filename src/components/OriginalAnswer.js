import React, { useState, useRef } from "react";
import "./OriginalAnswer.css";

const OriginalAnswer = ({ onAnswersChange }) => {
  const [step, setStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [marks, setMarks] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [aiGeneratedAnswer, setAiGeneratedAnswer] = useState("");

  const fileInputRef = useRef(null);
  const answerFileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFile(file);
    setCurrentQuestion(file.name);
  };

  const handleConfirmQuestion = () => {
    if (!currentQuestion) {
      alert("Please type a question or upload a file.");
      return;
    }
    setStep(2);
  };

  const handleConfirmMarks = () => {
    const parsedMarks = parseInt(marks, 10);
    if (isNaN(parsedMarks) || parsedMarks < 0) {
      alert("Enter a valid marks value.");
      return;
    }
    setStep(3);
  };

  const handleAnswerFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAnswer(ev.target.result);
    };
    reader.readAsText(file);
  };

  const handleAiGenerateAnswer = () => {
    setAiGeneratedAnswer(`AI-generated answer for: "${currentQuestion}"`);
    setAnswer(`AI-generated answer for: "${currentQuestion}"`);
  };

  const handleFinalize = () => {
    if (!answer) {
      alert("Please provide or generate the answer.");
      return;
    }
    const newQuestion = {
      id: questions.length + 1,
      question: currentQuestion,
      marks: parseInt(marks, 10),
      answer: answer,
    };
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    onAnswersChange(updatedQuestions);
    setCurrentQuestion("");
    setUploadedFile(null);
    setMarks("");
    setAnswer("");
    setAiGeneratedAnswer("");
    setStep(1);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (answerFileInputRef.current) answerFileInputRef.current.value = "";
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear all questions?")) {
      setQuestions([]);
      onAnswersChange([]);
    }
  };

  return (
    <div className="original-answer-container">
      <div className="header">
        <h2 className="animated-title">Add Questions to AI Evaluator</h2>
        <p className="subtitle">Create and manage questions with ease</p>
      </div>

      <div className="step-container">
        <div className="step-indicator">
          <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="step-line"></div>
          <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className="step-line"></div>
          <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>
        <div className="step-labels">
          <span>Question</span>
          <span>Marks</span>
          <span>Answer</span>
        </div>

        {step === 1 && (
          <div className="step step-question animated-step">
            <p className="step-prompt">Upload or type your question:</p>
            <div className="input-group">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: "none" }}
                accept=".txt,.pdf,.docx"
              />
              <button
                className="action-btn upload-btn"
                onClick={() => fileInputRef.current.click()}
              >
                <span className="material-icons"></span>
                Upload Question File
              </button>
              <p className="or-divider">OR</p>
              <textarea
                placeholder="Type your question here..."
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                rows={5}
                className="input-field"
              />
              <button className="action-btn confirm-btn" onClick={handleConfirmQuestion}>
                Confirm Question
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step step-marks animated-step">
            <p className="step-prompt">Allocate marks for this question:</p>
            <div className="input-group">
              <input
                type="number"
                min="0"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                placeholder="Enter marks"
                className="input-field"
              />
              <button className="action-btn confirm-btn" onClick={handleConfirmMarks}>
                Confirm Marks
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step step-answer animated-step">
            <p className="step-prompt">Provide the correct answer:</p>
            <div className="input-group">
              <input
                type="file"
                ref={answerFileInputRef}
                onChange={handleAnswerFileUpload}
                style={{ display: "none" }}
                accept=".txt,.json,.csv"
              />
              <button
                className="action-btn upload-btn"
                onClick={() => answerFileInputRef.current.click()}
              >
                <span className="material-icons">cloud_upload</span>
                Upload Answer File
              </button>
              <p className="or-divider">OR</p>
              <button className="action-btn ai-btn" onClick={handleAiGenerateAnswer}>
                <span className="material-icons">auto_awesome</span>
                Generate Answer with AI
              </button>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Answer will appear here..."
                rows={5}
                className="input-field"
              />
              <button className="action-btn confirm-btn" onClick={handleFinalize}>
                Add Question
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="questions-list">
        <h3 className="section-title">Added Questions</h3>
        {questions.length === 0 && <p className="empty-state">No questions added yet.</p>}
        <div className="questions-grid">
          {questions.map((q) => (
            <div key={q.id} className="question-card animated-card">
              <div className="question-header">
                <span className="question-number">Q{q.id}</span>
                <span className="marks-badge">{q.marks} Marks</span>
              </div>
              <p className="question-text">{q.question}</p>
              <p className="question-answer">Answer: {q.answer}</p>
            </div>
          ))}
        </div>
        {questions.length > 0 && (
          <button className="action-btn clear-btn" onClick={clearAll}>
            <span className="material-icons">delete</span>
            Clear All Questions
          </button>
        )}
      </div>
    </div>
  );
};

export default OriginalAnswer;