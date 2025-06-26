import React, { useEffect, useState } from "react";
import { LuArrowRight, LuImage, LuLink, LuLoader } from "react-icons/lu";
import axios from "axios";
import BaseURL from "../../API/BaseURLS";

const GalleryDetails = ({ sessionId, onNext, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [formData, setFormData] = useState({
    accommodation_links: "",
    ambience_links: "",
    amenities_links: "",
    other_links: "",
  });

  const loadExistingData = async () => {
    if (!sessionId) return;

    try {
      const response = await axios.get(
        `${BaseURL}/api/gallery/gallery-details/${sessionId}/`
      );

      if (response.data.success && response.data.data) {
        setFormData(response.data.data);
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
  }, [sessionId]);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0 && !dataLoaded) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.accommodation_links.trim()) {
      newErrors.accommodation_links = "Link is required";
    }
    if (!formData.ambience_links.trim()) {
      newErrors.ambience_links = "Link is required";
    }
    if (!formData.amenities_links.trim()) {
      newErrors.amenities_links = "Link is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveData = async (showMessage = true) => {
    if (!validateForm()) {
      return false;
    }

    setSaving(true);
    try {
      const response = await axios.post(
        `${BaseURL}/api/gallery/gallery-details/${sessionId}/`,
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
      } else {
        setMessage(response.data.error || "Failed to save gallery details");
        return false;
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
    if (saved && onNext) {
      setTimeout(() => {
        onNext();
      }, 1000);
    }
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
      <div className="row details-row">
        <div className="title-section">
          <h3>Share Photos & Videos</h3>
          {message && <div className="alert alert-success mt-3">{message}</div>}
        </div>

        <div className="form-section">
          <div className="row first_row">
            <h4 className="mb-3">Share The Relevent Images/Video Link</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Accommodation/Hotel</label>
                <div className="input_items">
                  <span>
                    <LuLink />
                  </span>
                  <input
                    type="text"
                    name="accommodation_links"
                    value={formData.accommodation_links}
                    onChange={handleInputChange}
                    placeholder="eg :- Drive Link, Youtube Link, etc ..."
                  />
                </div>
                {errors.accommodation_links && (
                  <div className="invalid-feedback d-block">
                    {errors.accommodation_links}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Location & Ambience</label>
                <div className="input_items">
                  <span>
                    <LuLink />
                  </span>
                  <input
                    type="text"
                    name="ambience_links"
                    value={formData.ambience_links}
                    onChange={handleInputChange}
                    placeholder="eg :- Drive Link, Youtube Link, etc ..."
                  />
                </div>
                {errors.ambience_links && (
                  <div className="invalid-feedback d-block">
                    {errors.ambience_links}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Amenities</label>
                <div className="input_items">
                  <span>
                    <LuLink />
                  </span>
                  <input
                    type="text"
                    name="amenities_links"
                    value={formData.amenities_links}
                    onChange={handleInputChange}
                    placeholder="eg :- Drive Link, Youtube Link, etc ..."
                  />
                </div>
                {errors.amenities_links && (
                  <div className="invalid-feedback d-block">
                    {errors.amenities_links}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Any other suitable pictures</label>
                <div className="input_items">
                  <span>
                    <LuLink />
                  </span>
                  <input
                    type="text"
                    name="other_links"
                    value={formData.other_links}
                    onChange={handleInputChange}
                    placeholder="eg :- Drive Link, Youtube Link, etc ..."
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
