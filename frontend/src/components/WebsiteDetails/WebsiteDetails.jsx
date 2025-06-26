import React, { useState, useEffect } from "react";
import axios from "axios";
import BaseURL from "../../API/BaseURLS";
import {
  LuFileText,
  LuGlobe,
  LuLink,
  LuList,
  LuLock,
  LuType,
  LuUser,
  LuArrowRight,
  LuLoader,
  LuMapPinCheckInside,
} from "react-icons/lu";
import { FaWhatsapp, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const WebsiteDetails = ({ sessionId, onNext, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const [formData, setFormData] = useState({
    website_name: "",
    about_us_content: "",
    additional_content: "",
    near_by: "",
    domain_url: "",
    domain_password: "",
    domain_username: "",
    existing_website_link: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    twitter: "",
    property_logo: null,
  });

  const loadExistingData = async () => {
    if (!sessionId) return;
    try {
      const response = await axios.get(
        `${BaseURL}/api/website/website-details/${sessionId}/`
      );

      if (response.data.success && response.data.data) {
        const data = response.data.data;
        setFormData({
          website_name: data.website_name || "",
          about_us_content: data.about_us_content || "",
          additional_content: data.additional_content || "",
          near_by: data.near_by || "",
          domain_url: data.domain_url || "",
          domain_password: data.domain_password || "",
          domain_username: data.domain_username || "",
          existing_website_link: data.existing_website_link || "",
          whatsapp: data.whatsapp || "",
          facebook: data.facebook || "",
          instagram: data.instagram || "",
          twitter: data.twitter || "",
          property_logo: data.property_logo || null,
        });

        if (data.property_logo) {
          setLogoPreview(data.property_logo);
        }
      }
    } catch (error) {
      console.error("Error loading website details:", error);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
      ];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          property_logo: "Only PNG, JPEG, JPG, SVG files are allowed",
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          property_logo: "File size must be less than 5MB",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        property_logo: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);

      setErrors((prev) => ({
        ...prev,
        property_logo: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.property_logo) {
      newErrors.property_logo = "Property logo is required";
    }
    if (!formData.website_name.trim()) {
      newErrors.website_name = "Website name is required";
    }
    if (!formData.about_us_content.trim()) {
      newErrors.about_us_content = "About content is required";
    }
    if (!formData.domain_url.trim()) {
      newErrors.domain_url = "This field Required";
    }

    if (
      formData.domain_url &&
      !formData.domain_url.trim().toLowerCase().includes("na")
    ) {
      if (!formData.domain_url.startsWith("http")) {
        newErrors.domain_url = "Please include http:// or https://";
      }
    }

    if (!formData.domain_password.trim()) {
      newErrors.domain_password = "This field Required";
    }
    if (!formData.domain_username.trim()) {
      newErrors.domain_username = "This field Required";
    }
    if (!formData.existing_website_link.trim()) {
      newErrors.existing_website_link = "This field Required";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Whatsapp number is Required";
    }
    
    if (formData.whatsapp && !/^(\+)?[0-9]+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Please enter a valid WhatsApp number";
    }
    
    if (!formData.facebook.trim()) {
      newErrors.facebook = "Facebook URL is Required";
    }
    if (!formData.instagram.trim()) {
      newErrors.instagram = "Instagram URL is Required";
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
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "property_logo" && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        `${BaseURL}/api/website/website-details/${sessionId}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        if (showMessage) {
          setMessage("Website details saved successfully!");
          setTimeout(() => setMessage(""), 3000);
        }

        if (onSave) {
          onSave("website", formData);
        }

        return true;
      } else {
        setMessage(response.data.error || "Failed to save website details");
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
      }, 100);
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
          <h3>Website Information</h3>
          {message && (
            <div className="alert alert-success mt-3" role="alert">
              {message}
            </div>
          )}
        </div>

        <div className="form-section">
          <div className="row first_row">
            <h4 className="mb-5">Web Page Information</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="choose_file_wrapper">
                <label>Property Logo</label>
                <div className="choose_file_items">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                  />
                  {logoPreview && (
                    <div className="logo-preview mt-2">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </div>
                  )}
                  {errors.property_logo && (
                    <div className="text-danger small mt-1">
                      {errors.property_logo}
                    </div>
                  )}
                  <p className="mt-2">
                    Upload high quality logo image. (supported file format -
                    png, jpeg, jpg, svg)
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Name of the Website</label>
                <div className="input_items">
                  <span>
                    <LuType />
                  </span>
                  <input
                    type="text"
                    name="website_name"
                    value={formData.website_name}
                    onChange={handleInputChange}
                    className={errors.website_name ? "is-invalid" : ""}
                  />
                </div>
                {errors.website_name && (
                  <div className="invalid-feedback d-block">
                    {errors.website_name}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Content for "About us" Page</label>
                <div className="input_items">
                  <span>
                    <LuFileText />
                  </span>
                  <textarea
                    name="about_us_content"
                    value={formData.about_us_content}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.about_us_content && (
                  <div className="invalid-feedback d-block">
                    {errors.about_us_content}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Additional Content</label>
                <div className="input_items">
                  <span>
                    <LuList />
                  </span>
                  <textarea
                    name="additional_content"
                    value={formData.additional_content}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Near by Attractions and Localities</label>
                <div className="input_items">
                  <span>
                    <LuMapPinCheckInside />
                  </span>
                  <textarea
                    name="near_by"
                    value={formData.near_by}
                    onChange={handleInputChange}
                    placeholder="Mention any neighbourhood places or attractions around your property"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <h4 className="my-5">Domain Related Information</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Enter URL of your Domain Panel</label>
                <div className="input_items">
                  <span>
                    <LuGlobe />
                  </span>
                  <input
                    type="text"
                    name="domain_url"
                    value={formData.domain_url}
                    onChange={handleInputChange}
                    placeholder="Not purchased any domain yet, please write NA"
                    className={errors.domain_url ? "is-invalid" : ""}
                  />
                </div>
                {errors.domain_url && (
                  <div className="invalid-feedback d-block">
                    {errors.domain_url}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Password of the Domain</label>
                <div className="input_items">
                  <span>
                    <LuUser />
                  </span>
                  <input
                    type="password"
                    name="domain_password"
                    value={formData.domain_password}
                    onChange={handleInputChange}
                    placeholder="Not purchased any domain yet, please write NA"

                  />
                </div>
                {errors.domain_password && (
                  <div className="invalid-feedback d-block">
                    {errors.domain_password}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Username of the Domain</label>
                <div className="input_items">
                  <span>
                    <LuLock />
                  </span>
                  <input
                    type="text"
                    name="domain_username"
                    value={formData.domain_username}
                    onChange={handleInputChange}
                    placeholder="Not purchased any domain yet, please write NA"
                  />
                </div>
                {errors.domain_username && (
                  <div className="invalid-feedback d-block">
                    {errors.domain_username}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Existing Website Link</label>
                <div className="input_items">
                  <span>
                    <LuLink />
                  </span>
                  <input
                    type="text"
                    name="existing_website_link"
                    value={formData.existing_website_link}
                    onChange={handleInputChange}
                    placeholder="Don't have a website, please write NA"
                  />
                </div>
                {errors.existing_website_link && (
                  <div className="invalid-feedback d-block">
                    {errors.existing_website_link}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <h4 className="my-5">Social Media Information</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>WhatsApp</label>
                <div className="input_items">
                  <span>
                    <FaWhatsapp />
                  </span>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="Enter your WhatsApp Number with Country Code"
                    className={errors.whatsapp ? "is-invalid" : ""}
                  />
                </div>
                {errors.whatsapp && (
                  <div className="invalid-feedback d-block">
                    {errors.whatsapp}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Facebook</label>
                <div className="input_items">
                  <span>
                    <FaFacebook />
                  </span>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    placeholder="Enter your Facebook URL"
                    className={errors.facebook ? "is-invalid" : ""}
                  />
                </div>
                {errors.facebook && (
                  <div className="invalid-feedback d-block">
                    {errors.facebook}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Instagram</label>
                <div className="input_items">
                  <span>
                    <FaInstagram />
                  </span>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="Enter your Instagram URL"
                    className={errors.instagram ? "is-invalid" : ""}
                  />
                </div>
                {errors.instagram && (
                  <div className="invalid-feedback d-block">
                    {errors.instagram}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label>Twitter</label>
                <div className="input_items">
                  <span>
                    <FaTwitter />
                  </span>
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="Enter your Twitter URL"
                    className={errors.twitter ? "is-invalid" : ""}
                  />
                </div>
                {errors.twitter && (
                  <div className="invalid-feedback d-block">
                    {errors.twitter}
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

export default WebsiteDetails;
