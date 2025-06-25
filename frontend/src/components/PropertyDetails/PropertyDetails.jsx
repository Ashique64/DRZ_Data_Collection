import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseURL from "../../API/BaseURLS";
import {
  LuGlobe,
  LuMapPin,
  LuBuilding2,
  LuLandPlot,
  LuLandmark,
  LuMail,
  LuBriefcase,
  LuFileText,
  LuGlobeLock,
  LuMailOpen,
  LuPhoneCall,
  LuPhone,
  LuLoader,
  LuArrowRight,
  LuHandCoins,
  LuBed,
  LuStar,
  LuTags,
  LuListTree,
  LuCompass,
  LuInfo,
} from "react-icons/lu";

const PropertyDetails = ({ sessionId, onNext, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const currencyOptions = [
    "AED",
    "AUD",
    "BDT",
    "CAD",
    "CHF",
    "CNY",
    "DKK",
    "EUR",
    "GBP",
    "HKD",
    "INR",
    "JPY",
    "KRW",
    "MYR",
    "NOK",
    "NZD",
    "PKR",
    "RUB",
    "SAR",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "TWD",
    "USD",
    "ZAR",
  ];
  const propertyType = ["Hotel", "Restaurant", "Both"];
  const propertyCategory = [
    "Business apartments",
    "Business hotels",
    "Chalets",
    "Country houses",
    "Cruises",
    "Economy hotels",
    "Farm stays",
    "Gites",
    "Guest houses",
    "Holiday homes",
    "Holiday parks",
    "Homestays",
    "Hostels",
    "Hotels",
    "Lodges",
    "Love hotels",
    "Luxury tents",
    "Motelss",
    "Resorts",
    "Riads",
    "Ryokans",
    "Student accommodation",
    "Villas",
  ];
  const starCategory = [
    "1 star",
    "2 stars",
    "3 stars",
    "4 stars",
    "5 stars & above",
  ];

  const [formData, setFormData] = useState({
    property_name: "",
    property_address: "",
    property_city: "",
    property_state: "",
    zip_code: "",
    property_country: "",
    bill_to_company: "",
    gst_number: "",
    property_phone: "",
    reservation_phone: "",
    property_email: "",
    property_website: "",
    base_currency: "",
    no_of_rooms: "",
    property_type: "",
    property_category: "",
    star_category: "",
    latitude: "",
    longitude: "",
    additional_info: "",
  });

  const loadExistingData = async () => {
    if (!sessionId) return;

    // setLoading(true);
    try {
      const response = await axios.get(
        `${BaseURL}/api/property/property-details/${sessionId}/`
      );

      if (response.data.success && response.data.data) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error("Error loading existing data:", error);
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

    // Required fields validation
    if (!formData.property_name.trim()) {
      newErrors.property_name = "Property name is required";
    }

    if (!formData.property_address.trim()) {
      newErrors.property_address = "Property address is required";
    }

    if (!formData.property_city.trim()) {
      newErrors.property_city = "Property city is required";
    }
    if (!formData.property_state.trim()) {
      newErrors.property_state = "Property State is required";
    }
    if (!formData.zip_code.trim()) {
      newErrors.zip_code = "Pin Code is required";
    }
    if (!formData.property_country.trim()) {
      newErrors.property_country = "Property Country is required";
    }
    if (!formData.bill_to_company.trim()) {
      newErrors.bill_to_company = "Required";
    }
    if (!formData.gst_number.trim()) {
      newErrors.gst_number = "Required";
    }

    if (!formData.property_phone.trim()) {
      newErrors.property_phone = "Property phone is required";
    }
    if (!formData.reservation_phone.trim()) {
      newErrors.reservation_phone = "Reservation phone is required";
    }
    if (!formData.property_email.trim()) {
      newErrors.property_email = "Email is required";
    }
    if (!formData.property_website.trim()) {
      newErrors.property_website = "URL is required";
    }
    if (!formData.base_currency.trim()) {
      newErrors.base_currency = "Required";
    }
    if (!formData.no_of_rooms.trim()) {
      newErrors.no_of_rooms = "Required";
    }
    if (!formData.property_type.trim()) {
      newErrors.property_type = "Property Type Required";
    }
    if (!formData.property_category.trim()) {
      newErrors.property_category = "Property Category Required";
    }
    if (!formData.star_category.trim()) {
      newErrors.star_category = "Required";
    }
    if (!formData.latitude.trim()) {
      newErrors.latitude = "Latitude Required";
    }
    if (!formData.longitude.trim()) {
      newErrors.longitude = "Longittude Required";
    }

    if (
      formData.property_email &&
      !/\S+@\S+\.\S+/.test(formData.property_email)
    ) {
      newErrors.property_email = "Please enter a valid email";
    }

    if (
      formData.property_website &&
      !formData.property_website.startsWith("http")
    ) {
      newErrors.property_website =
        "Website URL should start with http:// or https://";
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
        `${BaseURL}/api/property/property-details/${sessionId}/`,
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
          setMessage("Property Information saved successfully!");
          console.log("Data saved successfully:", formData);
          setTimeout(() => setMessage(""), 3000);
        }

        if (onSave) {
          onSave("property", formData);
        }

        return true;
      } else {
        setMessage(result.error || "Failed to save property details");
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
        <span className="ms-3 text-muted">Loading property details...</span>
      </div>
    );
  }

  return (
    <div className="tab-panel">
      <div className="row details-row">
        <div className="title-section">
          <h3>Property Information / Business Information</h3>
        </div>

        {message && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {message}
          </div>
        )}

        <div className="form-section">
          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="property_name">Property / Business Name</label>
                <div className="input_items">
                  <span>
                    <LuBuilding2 />
                  </span>
                  <input
                    type="text"
                    name="property_name"
                    id="property_name"
                    value={formData.property_name}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.property_name && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.property_name}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="property_address">Property Address</label>
                <div className="input_items">
                  <span>
                    <LuMapPin />
                  </span>
                  <input
                    type="text"
                    name="property_address"
                    id="property_address"
                    value={formData.property_address}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.property_address && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.property_address}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="property_city">Property City</label>
                <div className="input_items">
                  <span>
                    <LuLandPlot />
                  </span>
                  <input
                    type="text"
                    name="property_city"
                    id="property_city"
                    value={formData.property_city}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.property_city && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.property_city}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="property_state">
                  Property State / Province
                </label>
                <div className="input_items">
                  <span>
                    <LuLandmark />
                  </span>
                  <input
                    type="text"
                    name="property_state"
                    id="property_state"
                    value={formData.property_state}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.property_state && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.property_state}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-6 col-lg-3 item">
              <div className="input_wrapper">
                <label htmlFor="zip_code">Zip/Pin/Postal Code</label>
                <div className="input_items">
                  <span>
                    <LuMail />
                  </span>
                  <input
                    type="text"
                    name="zip_code"
                    id="zip_code"
                    value={formData.zip_code}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.zip_code && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.zip_code}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-lg-3 item">
              <div className="input_wrapper">
                <label htmlFor="property_country">Property Country</label>
                <div className="input_items">
                  <span>
                    <LuGlobe />
                  </span>
                  <input
                    type="text"
                    name="property_country"
                    id="property_country"
                    value={formData.property_country}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.property_country && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.property_country}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-lg-3 item">
              <div className="input_wrapper">
                <label htmlFor="bill_to_company">
                  Bill To Company / Organization
                </label>
                <div className="input_items">
                  <span>
                    <LuBriefcase />
                  </span>
                  <input
                    type="text"
                    name="bill_to_company"
                    id="bill_to_company"
                    value={formData.bill_to_company}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.bill_to_company && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.bill_to_company}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-lg-3 item">
              <div className="input_wrapper">
                <label htmlFor="gst_number">GST Number</label>
                <div className="input_items">
                  <span>
                    <LuFileText />
                  </span>
                  <input
                    type="text"
                    name="gst_number"
                    id="gst_number"
                    value={formData.gst_number}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.gst_number && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.gst_number}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="property_phone">Property Phone Number</label>
                <div className="input_items">
                  <span>
                    <LuPhone />
                  </span>
                  <input
                    type="text"
                    name="property_phone"
                    id="property_phone"
                    value={formData.property_phone}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.property_phone && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.property_phone}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="reservation_phone">
                  Reservation Phone Number
                </label>
                <div className="input_items">
                  <span>
                    <LuPhoneCall />
                  </span>
                  <input
                    type="text"
                    name="reservation_phone"
                    id="reservation_phone"
                    value={formData.reservation_phone}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.reservation_phone && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.reservation_phone}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="property_email">Property Email</label>
                <div className="input_items">
                  <span>
                    <LuMailOpen />
                  </span>
                  <input
                    type="text"
                    name="property_email"
                    id="property_email"
                    value={formData.property_email}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.property_email && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.property_email}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="property_website">Property Website URL</label>
                <div className="input_items">
                  <span>
                    <LuGlobeLock />
                  </span>
                  <input
                    type="text"
                    name="property_website"
                    id="property_website"
                    value={formData.property_website}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.property_website && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.property_website}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="base_currency">Base Currency</label>
                <div className="input_items">
                  <span>
                    <LuHandCoins />
                  </span>
                  <select
                    name="base_currency"
                    id="base_currency"
                    value={formData.base_currency}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Select Currency
                    </option>
                    {currencyOptions.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.base_currency && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.base_currency}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="no_of_rooms">
                  Total number of rooms in property
                </label>
                <div className="input_items">
                  <span>
                    <LuBed />
                  </span>
                  <input
                    type="text"
                    name="no_of_rooms"
                    id="no_of_rooms"
                    value={formData.no_of_rooms}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.no_of_rooms && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.no_of_rooms}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-4 item">
              <div className="input_wrapper">
                <label htmlFor="property_type">Property Type</label>
                <div className="input_items">
                  <span>
                    <LuListTree />
                  </span>
                  <select
                    name="property_type"
                    id="property_type"
                    value={formData.property_type}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Select Property Type
                    </option>
                    {propertyType.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.property_type && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.property_type}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-4 item">
              <div className="input_wrapper">
                <label htmlFor="property_category">Property Category</label>
                <div className="input_items">
                  <span>
                    <LuTags />
                  </span>
                  <select
                    name="property_category"
                    id="property_category"
                    value={formData.property_category}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Select Property Category
                    </option>
                    {propertyCategory.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.property_category && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.property_category}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-4 item">
              <div className="input_wrapper">
                <label htmlFor="star_category">Star Category</label>
                <div className="input_items">
                  <span>
                    <LuStar />
                  </span>
                  <select
                    name="star_category"
                    id="star_category"
                    value={formData.star_category}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Select Star Category
                    </option>
                    {starCategory.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.star_category && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.star_category}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="latitude">Latitude</label>
                <div className="input_items">
                  <span>
                    <LuCompass />
                  </span>
                  <input
                    type="text"
                    name="latitude"
                    id="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.latitude && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.latitude}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="longitude">Longitude</label>
                <div className="input_items">
                  <span>
                    <LuMapPin />
                  </span>
                  <input
                    type="text"
                    name="longitude"
                    id="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.longitude && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.longitude}
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
                {errors.additional_info && (
                  <div className="invalid-feedback d-block ms-4">
                    {errors.additional_info}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* --------------------------- */}
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

export default PropertyDetails;
