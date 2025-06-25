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
} from "react-icons/lu";

const ContactDetails = ({ sessionId, onNext, onSave, initialData }) => {
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
      newErrors.billing_contact_name = "Billing contact person name is required";
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
          <h3>Contact Informations</h3>
        </div>

        {message && (
          <div className="alert alert-success mb-4" role="alert">
            {message}
          </div>
        )}

        <div className="form-section">
          <div className="row first_row">
            <h4 className="mb-5">Operational / Support Related Matters</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="op_contact_name">Contact Person Name</label>
                <div className="input_items">
                  <span>
                    <LuUser />
                  </span>
                  <input
                    type="text"
                    name="op_contact_name"
                    value={formData.op_contact_name}
                    onChange={handleInputChange}
                    className={errors.op_contact_name ? "is-invalid" : ""}
                  />
                </div>
                {errors.op_contact_name && (
                  <div className="invalid-feedback d-block">
                    {errors.op_contact_name}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="op_designation">Designation</label>
                <div className="input_items">
                  <span>
                    <LuBadgeInfo />
                  </span>
                  <input
                    type="text"
                    name="op_designation"
                    value={formData.op_designation}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.op_contact_name && (
                  <div className="invalid-feedback d-block">
                    {errors.op_contact_name}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="op_email">Email Address</label>
                <div className="input_items">
                  <span>
                    <LuMail />
                  </span>
                  <input
                    type="text"
                    name="op_email"
                    value={formData.op_email}
                    onChange={handleInputChange}
                    className={errors.op_email ? "is-invalid" : ""}
                  />
                </div>
                {errors.op_email && (
                  <div className="invalid-feedback d-block">
                    {errors.op_email}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="op_mobile">Mobile Number</label>
                <div className="input_items">
                  <span>
                    <LuPhoneCall />
                  </span>
                  <input
                    type="text"
                    name="op_mobile"
                    value={formData.op_mobile}
                    onChange={handleInputChange}
                    className={errors.op_mobile ? "is-invalid" : ""}
                  />
                </div>
                {errors.op_mobile && (
                  <div className="invalid-feedback d-block">
                    {errors.op_mobile}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <h4 className="my-5">Property Owner / Manager</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="owner_contact_name">Contact Person Name</label>
                <div className="input_items">
                  <span>
                    <LuUser />
                  </span>
                  <input
                    type="text"
                    name="owner_contact_name"
                    value={formData.owner_contact_name}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.owner_contact_name && (
                  <div className="invalid-feedback d-block">
                    {errors.owner_contact_name}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="owner_designation">Designation</label>
                <div className="input_items">
                  <span>
                    <LuBadgeInfo />
                  </span>
                  <input
                    type="text"
                    name="owner_designation"
                    value={formData.owner_designation}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.owner_designation && (
                  <div className="invalid-feedback d-block">
                    {errors.owner_designation}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="owner_email">Email Address</label>
                <div className="input_items">
                  <span>
                    <LuMail />
                  </span>
                  <input
                    type="text"
                    name="owner_email"
                    value={formData.owner_email}
                    onChange={handleInputChange}
                    className={errors.owner_email ? "is-invalid" : ""}
                  />
                </div>
                {errors.owner_email && (
                  <div className="invalid-feedback d-block">
                    {errors.owner_email}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="owner_mobile">Mobile Number</label>
                <div className="input_items">
                  <span>
                    <LuPhoneCall />
                  </span>
                  <input
                    type="text"
                    name="owner_mobile"
                    value={formData.owner_mobile}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.owner_mobile && (
                  <div className="invalid-feedback d-block">
                    {errors.owner_mobile}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <h4 className="my-5">Billing / Invoice Related Matters</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="billing_contact_name">
                  Contact Person Name
                </label>
                <div className="input_items">
                  <span>
                    <LuUser />
                  </span>
                  <input
                    type="text"
                    name="billing_contact_name"
                    value={formData.billing_contact_name}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.billing_contact_name && (
                  <div className="invalid-feedback d-block">
                    {errors.billing_contact_name}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="billing_designation">Designation</label>
                <div className="input_items">
                  <span>
                    <LuBadgeInfo />
                  </span>
                  <input
                    type="text"
                    name="billing_designation"
                    value={formData.billing_designation}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.billing_designation && (
                  <div className="invalid-feedback d-block">
                    {errors.billing_designation}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="billing_email">Email Address</label>
                <div className="input_items">
                  <span>
                    <LuMail />
                  </span>
                  <input
                    type="text"
                    name="billing_email"
                    value={formData.billing_email}
                    onChange={handleInputChange}
                    className={errors.billing_email ? "is-invalid" : ""}
                  />
                </div>
                {errors.billing_email && (
                  <div className="invalid-feedback d-block">
                    {errors.billing_email}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="billing_mobile">Mobile Number</label>
                <div className="input_items">
                  <span>
                    <LuPhoneCall />
                  </span>
                  <input
                    type="text"
                    name="billing_mobile"
                    value={formData.billing_mobile}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.billing_mobile && (
                  <div className="invalid-feedback d-block">
                    {errors.billing_mobile}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row first_row">
            <div className="col-md-12 item">
              <div className="input_wrapper">
                <label htmlFor="additional_info">
                  If you want to provide additional information...
                </label>
                <div className="input_items">
                  <span>
                    <LuInfo />
                  </span>
                  <textarea
                    name="additional_info"
                    id="additional_info"
                    value={formData.additional_info}
                    onChange={handleInputChange}
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

export default ContactDetails;
