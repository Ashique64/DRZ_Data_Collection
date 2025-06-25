import React, { useState, useEffect } from "react";
import axios from "axios";
import BaseURL from "../../API/BaseURLS";
import {
  LuMail,
  LuPhoneCall,
  LuUser,
  LuBadgeInfo,
  LuArrowRight,
  LuLoader,
  LuInfo,
  LuHouse,
  LuUsers,
  LuCoins,
  LuNotebook,
  LuNotepadText,
  LuLink,
} from "react-icons/lu";

const RoomDetails = ({ sessionId, onNext, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const [formData, setFormData] = useState({
    op_contact_name: "",
    op_designation: "",
    op_email: "",
    op_mobile: "",
    owner_contact_name: "",
    owner_designation: "",
    owner_email: "",
    owner_mobile: "",
    billing_contact_name: "",
    billing_designation: "",
    billing_email: "",
    billing_mobile: "",
    additional_info: "",
  });

  const roomTypes = [
    "Standard",
    "Deluxe",
    "Superior",
    "Presidential",
    "Family",
    "Suite",
    "Single",
    "Double",
    "Twin",
    "Twin/Double",
    "Triple",
    "Quadruple",
    "Studio",
    "Apartment",
    "Dormitory room",
    "Bed in Dormitory",
    "Mixed Dorm",
    "Female Dorm",
  ];

  const loadExistingData = async () => {
    if (!sessionId) return;

    // setLoading(true);
    try {
      const response = await axios.get(
        `${BaseURL}/api/contact/contact-details/${sessionId}/`
      );

      if (response.data.success && response.data.data) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error("Error loading existing contact data:", error);
    } finally {
      setLoading(false);
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prevData) => ({
        ...prevData,
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

    // Required fields validation for operational contacts
    if (!formData.op_contact_name.trim()) {
      newErrors.op_contact_name = "Contact name is required";
    }

    if (!formData.op_email.trim()) {
      newErrors.op_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.op_email)) {
      newErrors.op_email = "Please enter a valid email";
    }

    if (!formData.op_mobile.trim()) {
      newErrors.op_mobile = "Mobile number is required";
    }
    if (!formData.op_designation.trim()) {
      newErrors.op_designation = "Designation is required";
    }

    // Validate owner contacts if provided
    if (!formData.owner_contact_name.trim()) {
      newErrors.owner_contact_name = "Owner name is required";
    }

    if (!formData.owner_email.trim()) {
      newErrors.owner_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.owner_email)) {
      newErrors.owner_email = "Please enter a valid email";
    }

    if (!formData.owner_mobile.trim()) {
      newErrors.owner_mobile = "Mobile number is required";
    }
    if (!formData.owner_designation.trim()) {
      newErrors.owner_designation = "Designation is required";
    }

    // Validate billing contacts if provided
    if (!formData.billing_contact_name.trim()) {
      newErrors.billing_contact_name =
        "Billing contact person name is required";
    }

    if (!formData.billing_email.trim()) {
      newErrors.billing_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.billing_email)) {
      newErrors.billing_email = "Please enter a valid email";
    }

    if (!formData.billing_mobile.trim()) {
      newErrors.billing_mobile = "Mobile number is required";
    }
    if (!formData.billing_designation.trim()) {
      newErrors.billing_designation = "Designation is required";
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
        `${BaseURL}/api/contact/contact-details/${sessionId}/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      if (result.success) {
        if (showMessage) {
          setMessage("Contact Information saved successfully!");
          setTimeout(() => setMessage(""), 3000);
        }

        if (onSave) {
          onSave("contact", formData);
        }

        return true;
      } else {
        setMessage(result.error || "Failed to save contact details");
        return false;
      }
    } catch (error) {
      setMessage("Error saving data. Please try again.");
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
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "2rem", height: "2rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3 text-muted">Loading contact details...</span>
      </div>
    );
  }
  return (
    <div className="tab-panel">
      <div className="row details-row">
        <div className="title-section">
          <h3>Rooms Details</h3>
        </div>

        {message && (
          <div className="alert alert-success mb-4" role="alert">
            {message}
          </div>
        )}

        <div className="form-section">
          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="room_type">Room Type Name</label>
                <div className="input_items">
                  <span>
                    <LuHouse />
                  </span>
                  <select
                    name="room_type"
                    id="room_type"
                    value={formData.room_type}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Select Room Type
                    </option>
                    {roomTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.room_type && (
                  <div className="invalid-feedback d-block">
                    {errors.room_type}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="occupancy">Max Occupancy</label>
                <div className="input_items">
                  <span>
                    <LuUsers />
                  </span>
                  <input
                    type="text"
                    name="occupancy"
                    value={formData.occupancy}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.occupancy && (
                  <div className="invalid-feedback d-block">
                    {errors.occupancy}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="room_price">Room Price</label>
                <div className="input_items">
                  <span>
                    <LuCoins />
                  </span>
                  <input
                    type="text"
                    name="room_price"
                    value={formData.room_price}
                    onChange={handleInputChange}
                    className={errors.room_price ? "is-invalid" : ""}
                  />
                </div>
                {errors.room_price && (
                  <div className="invalid-feedback d-block">
                    {errors.room_price}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="room_image">Room Image Link</label>
                <div className="input_items">
                  <span>
                    <LuLink />
                  </span>
                  <input
                    type="text"
                    name="room_image"
                    value={formData.room_image}
                    onChange={handleInputChange}
                    placeholder="Share Your Drive Link"
                  />
                </div>
                {errors.room_image && (
                  <div className="invalid-feedback d-block">
                    {errors.room_image}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="description">Room Description</label>
                <div className="input_items">
                  <span>
                    <LuNotepadText />
                  </span>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={errors.description ? "is-invalid" : ""}
                  />
                </div>
                {errors.description && (
                  <div className="invalid-feedback d-block">
                    {errors.description}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="additional_info">If you want to provide additional information...</label>
                <div className="input_items">
                  <span>
                    <LuNotepadText />
                  </span>
                  <textarea
                    name="additional_info"
                    value={formData.additional_info}
                    onChange={handleInputChange}
                    className={errors.additional_info ? "is-invalid" : ""}
                  />
                </div>
                {errors.additional_info && (
                  <div className="invalid-feedback d-block">
                    {errors.additional_info}
                  </div>
                )}
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

export default RoomDetails;
