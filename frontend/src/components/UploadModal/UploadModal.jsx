import React, { useState } from "react";
import "./UploadModal.scss";

const UploadModal = ({
  onClose,
  onUpload,
  maxFiles,
  maxSizeMB,
  type,
  section,
}) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    processFiles(selected);
  };

  const processFiles = (selectedFiles) => {
    const validFiles = selectedFiles.filter(
      (file) => file.size <= maxSizeMB * 1024 * 1024
    );

    const oversizedFiles = selectedFiles.filter(
      (file) => file.size > maxSizeMB * 1024 * 1024
    );

    if (oversizedFiles.length > 0) {
      alert(
        `Some files are too large. Maximum size is ${maxSizeMB}MB per file.`
      );
    }

    if (validFiles.length + files.length > maxFiles) {
      alert(`You can upload up to ${maxFiles} ${type}.`);
      return;
    }

    setFiles([...files, ...validFiles]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      processFiles(droppedFiles);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleUpload = () => {
    if (files.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }
    setUploading(true);
    onUpload(files);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="upload-modal-overlay">
      <div className="upload-modal">
        <div className="modal-header">
          <h3>Upload {type === "images" ? "Images" : "Videos"}</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="upload-info">
            <p>
              Maximum {maxFiles} {type === "images" ? "Images" : "Videos"} of
              below {maxSizeMB}MB each
            </p>
            <p className="section-info">
              Section: {section} {type}
            </p>
          </div>

          <div
            className={`upload-area ${dragActive ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="upload-content">
              <div className="upload-icon">📁</div>
              <p>Drag and drop files here or</p>
              <label htmlFor="file-input" className="choose-file-btn">
                Choose Files
              </label>
              <input
                id="file-input"
                type="file"
                accept={type === "images" ? "image/*" : "video/*"}
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

          {files.length > 0 && (
            <div className="selected-files">
              <h4>
                Selected Files ({files.length}/{maxFiles})
              </h4>
              <div className="files-list">
                {files.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-info">
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    <button
                      className="remove-file-btn"
                      onClick={() => removeFile(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            className="btn btn-primary"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
