import React, { useState, useRef } from 'react';
import './FileUpload.css';

const FileUpload = ({ onFileSelect, onTextSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [inputMode, setInputMode] = useState('file');
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setFilePreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    } else {
      alert('Please upload an image or PDF file.');
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleUpload = () => {
    if (inputMode === 'file' && selectedFile) {
      onFileSelect(selectedFile);
      alert('File submitted successfully!');
    } else if (inputMode === 'text' && typedAnswer.trim() !== '') {
      onTextSubmit(typedAnswer);
      alert('Text submitted successfully!');
    } else {
      alert('Please provide a file or type an answer first.');
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setTypedAnswer('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="file-upload-container">
      <div className="header">
        <h2 className="animated-title">Upload Written Answer</h2>
        <p className="subtitle">Submit your answers via file or text input</p>
      </div>

      <div className="input-mode-buttons">
        <button
          className={`mode-btn ${inputMode === 'file' ? 'active' : ''}`}
          onClick={() => setInputMode('file')}
        >
          <span className="material-icons"></span>
          Upload File
        </button>
        <button
          className={`mode-btn ${inputMode === 'text' ? 'active' : ''}`}
          onClick={() => setInputMode('text')}
        >
          <span className="material-icons"></span>
          Type Text
        </button>
      </div>

      {inputMode === 'file' && (
        <div
          className={`drop-zone ${isDragOver ? 'drag-over' : ''} ${selectedFile ? 'has-file' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*,application/pdf"
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />
          {!selectedFile ? (
            <div className="drop-zone-content animated-drop">
              <span className="material-icons upload-icon">cloud_upload</span>
              <p className="drop-text">
                <strong>Click to upload</strong> or drag and drop
              </p>
              <p className="file-types">PNG, JPG, PDF (max 5MB)</p>
            </div>
          ) : (
            <div className="file-preview animated-preview">
              {filePreview && <img src={filePreview} alt="Preview" className="preview-image" />}
              <div className="file-info">
                <p className="file-name">{selectedFile.name}</p>
                <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          )}
        </div>
      )}

      {inputMode === 'text' && (
        <textarea
          placeholder="Type your answer here..."
          value={typedAnswer}
          onChange={(e) => setTypedAnswer(e.target.value)}
          className="input-field animated-textarea"
        />
      )}

      <div className="action-buttons">
        <button className="action-btn confirm-btn" onClick={handleUpload}>
          <span className="material-icons"></span>
          Confirm
        </button>
        <button className="action-btn clear-btn" onClick={handleClear}>
          <span className="material-icons"></span>
          Clear
        </button>
      </div>
    </div>
  );
};

export default FileUpload;