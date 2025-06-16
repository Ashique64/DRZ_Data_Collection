import React, { useEffect, useState } from "react";
import UploadModal from "../UploadModal/UploadModal";
import {
  LuArrowRight,
  LuImage,
  LuLink,
  LuLoader,
  LuTrash2,
  LuVideo,
} from "react-icons/lu";
import axios from "axios";
import BaseURL from "../../API/BaseURLS";

const GalleryDetails = ({ sessionId, onNext, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [currentSection, setCurrentSection] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    video_links: "",
    primary_images: [],
    secondary_images: [],
    primary_videos: [],
    secondary_videos: [],
    deleted_files: [],
  });

  const loadExistingData = async () => {
    if (!sessionId) return;

    try {
      const response = await axios.get(
        `${BaseURL}/api/data/gallery-details/${sessionId}/`
      );

      if (response.data.success && response.data.data) {
        const { video_links, media_files } = response.data.data;
        setFormData({
          video_links: video_links || "",
          primary_images: media_files?.primary_images || [],
          secondary_images: media_files?.secondary_images || [],
          primary_videos: media_files?.primary_videos || [],
          secondary_videos: media_files?.secondary_videos || [],
          deleted_files: [],
        });
      }
    } catch (error) {
      console.error("Error loading gallery data:", error);
    } finally {
      setLoading(false);
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
      setDataLoaded(true);
    } else if (sessionId && !dataLoaded) {
      loadExistingData();
    }
  }, [sessionId, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = (type, section) => {
    setUploadType(type);
    setCurrentSection(section);
    setShowModal(true);
  };

  const handleUpload = async (files, type, section) => {
    const fieldName = `${section}_${type === "images" ? "images" : "videos"}`;
    const formData = new FormData();

    files.forEach((file) => {
      formData.append(fieldName, file);
    });

    try {
      const response = await axios.post(
        `${BaseURL}/api/data/gallery-details/${sessionId}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        await loadExistingData();
        setMessage("Files uploaded successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setMessage("Error uploading files");
      console.error("Upload error:", error);
    }
    setShowModal(false);
  };

  const saveData = async (showMessage = true) => {
    setSaving(true);
    try {
      const response = await axios.post(
        `${BaseURL}/api/data/gallery-details/${sessionId}/`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        if (showMessage) {
          setMessage("Gallery saved successfully!");
          setTimeout(() => setMessage(""), 3000);
        }
        if (onSave) onSave("gallery", formData);
        return true;
      }
    } catch (error) {
      setMessage("Error saving gallery");
      console.error("Save error:", error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    const saved = await saveData(false);
    if (saved && onNext) onNext();
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "16rem" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-panel">
      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          onUpload={(files) => handleUpload(files, uploadType, currentSection)}
          maxFiles={uploadType === "images" ? 10 : 3}
          maxSizeMB={uploadType === "images" ? 5 : 30}
          type={uploadType}
          section={currentSection}
        />
      )}

      <div className="row details-row">
        <div className="title-section">
          <h3>Photos & Videos</h3>
          {message && <div className="alert alert-success mt-3">{message}</div>}
        </div>

        <div className="form-section">
          <div className="row first_row">
            <h4 className="mb-3">Upload Images</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="upload_wrapper">
                <label>Primary Images</label>
                <div className="upload_button">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleOpenModal("images", "primary")}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="upload_wrapper">
                <label>Secondary Images</label>
                <div className="upload_button">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleOpenModal("images", "secondary")}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <h4 className="mb-3 mt-5">Upload Videos</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="upload_wrapper">
                <label>Primary Videos</label>
                <div className="upload_button">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleOpenModal("videos", "primary")}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="upload_wrapper">
                <label>Secondary Videos</label>
                <div className="upload_button">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleOpenModal("videos", "secondary")}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <h4 className="mb-3 mt-5">
              Share Video Links <br />
            </h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Video Links (one per line)</label>
                <div className="input_items">
                  <span>
                    <LuLink />
                  </span>
                  <textarea
                    name="video_links"
                    value={formData.video_links}
                    onChange={handleInputChange}
                    placeholder="eg :- YouTube or other video links"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="save-btn">
            <button
              onClick={handleNext}
              disabled={saving}
              className="btn btn-transperant d-inline-flex justify-content-center align-items-center px-4 py-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <LuLoader className="me-2 spinner-border spinner-border-sm" />
                  Saving...
                </>
              ) : (
                <>
                  Save & Next
                  <LuArrowRight className="ms-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryDetails;
