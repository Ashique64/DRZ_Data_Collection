import React, { useEffect, useState } from "react";
import {
  LuArrowRight,
  LuChevronDown,
  LuChevronUp,
  LuImage,
  LuInfo,
  LuLink,
  LuLoader,
} from "react-icons/lu";
import BaseURL from "../../API/BaseURLS";
import "./PropertyFacilities.scss";
import BasicFacilities from "../Facilities/BasicFacilities/BasicFacilities";
import GeneralServices from "../Facilities/GeneralServices/GeneralServices";
import OutdoorActivities from "../Facilities/OutdoorActivities/OutdoorActivities";
import CommonArea from "../Facilities/CommonArea/CommonArea";
import FoodDrink from "../Facilities/Food&Drink/Food&Drink";
import HealthWellness from "../Facilities/Health&Wellness/Health&Wellness";
import BusinessCenter from "../Facilities/BusinessCenter/BusinessCenter";
import BeautySpa from "../Facilities/Beauty&Spa/Beauty&Spa";
import Security from "../Facilities/Security/Security";
import Transfers from "../Facilities/Transfers/Transfers";
import PaymentServices from "../Facilities/PaymentServices/PaymentServices";
import MediaTechnology from "../Facilities/Media&Technology/Media&Technology";
import IndoorActivites from "../Facilities/IndoorActivites/IndoorActivites";
import FamilyKids from "../Facilities/Family&Kids/Family&Kids";
import SaftyHygiene from "../Facilities/Safty&Hygiene/Safty&Hygiene";
import PetEssentials from "../Facilities/PetEssentials/PetEssentials";
import Entertainment from "../Facilities/Entertainment/Entertainment";
import Shopping from "../Facilities/Shopping/Shopping";

const PropertyFacilities = () => {
  const [activeTab, setActiveTab] = useState("BasicFacilities");
  const [expandedMobile, setExpandedMobile] = useState(null);

  const tabs = [
    { id: "BasicFacilities", label: "Basic Facilities" },
    { id: "GeneralServices", label: "General Services" },
    { id: "OutdoorActivities", label: "Outdoor Activities & Sports" },
    { id: "CommonArea", label: "Common Area" },
    { id: "Food&Drink", label: "Food & Drink" },
    { id: "Health&Wellness", label: "Health & Wellness" },
    { id: "BusinessCenter", label: "Business Center & Conference" },
    { id: "Beauty&Spa", label: "Beauty & Spa" },
    { id: "Security", label: "Security" },
    { id: "Transfers", label: "Transfers" },
    { id: "PaymentServices", label: "Payment Services" },
    { id: "Media&Technology", label: "Media & Technology" },
    { id: "IndoorActivites", label: "Indoor Activities & Sports" },
    { id: "Family&Kids", label: "Family & Kids" },
    { id: "Safty&Hygiene", label: "Safety & Hygiene" },
    { id: "PetEssentials", label: "Pet Essentials" },
    { id: "Entertainment", label: "Entertainment" },
    { id: "Shopping", label: "Shopping" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleMobileToggle = (tabId) => {
    setExpandedMobile(expandedMobile === tabId ? null : tabId);
  };

  const renderTabContent = (tabId) => {
    switch (tabId) {
      case "BasicFacilities":
        return <BasicFacilities />;
      case "GeneralServices":
        return <GeneralServices />;
      case "OutdoorActivities":
        return <OutdoorActivities />;
      case "CommonArea":
        return <CommonArea />;
      case "Food&Drink":
        return <FoodDrink />;
      case "Health&Wellness":
        return <HealthWellness />;
      case "BusinessCenter":
        return <BusinessCenter />;
      case "Beauty&Spa":
        return <BeautySpa />;
      case "Security":
        return <Security />;
      case "Transfers":
        return <Transfers />;
      case "PaymentServices":
        return <PaymentServices />;
      case "Media&Technology":
        return <MediaTechnology />;
      case "IndoorActivites":
        return <IndoorActivites />;
      case "Family&Kids":
        return <FamilyKids />;
      case "Safty&Hygiene":
        return <SaftyHygiene />;
      case "PetEssentials":
        return <PetEssentials />;
      case "Entertainment":
        return <Entertainment />;
      case "Shopping":
        return <Shopping />;
      default:
        return (
          <div className="tab-content-wrapper">
            <p>Content for {tabs.find((tab) => tab.id === tabId)?.label}</p>
          </div>
        );
    }
  };
  return (
    <div className="tab-panel">
      <div className="row details-row">
        <div className="title-section">
          <h3>Property Facilities Information</h3>
          {/* <div className="selected_fecility">
            <select name="" id="">
              <option value="restaurant">Restaurant</option>
            </select>
          </div> */}
        </div>

        <div className="form-section">
          <div className="row first_row d-none d-md-flex">
            <div className="tab_items_col col-md-3">
              <div
                className="nav flex-column nav-pills"
                role="tablist"
                aria-orientation="vertical"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`nav-link ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="tab_content_col col-md-9">
              <div className="tab-content">
                <div className="tab-pane fade show active">
                  {renderTabContent(activeTab)}
                </div>
              </div>
            </div>
          </div>
          <div className="row first_row d-none d-lg-block">
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
                    // value={formData.additional_info}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-accordion d-md-none">
            {tabs.map((tab) => (
              <div key={tab.id} className="accordion-item">
                <button
                  className={`accordion-header ${
                    expandedMobile === tab.id ? "active" : ""
                  }`}
                  onClick={() => handleMobileToggle(tab.id)}
                >
                  <span>{tab.label}</span>
                  {expandedMobile === tab.id ? (
                    <LuChevronUp className="chevron-icon" />
                  ) : (
                    <LuChevronDown className="chevron-icon" />
                  )}
                </button>

                {expandedMobile === tab.id && (
                  <div className="accordion-content">
                    {renderTabContent(tab.id)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="save-btn">
            <button className="btn btn-transperant d-inline-flex justify-content-center align-items-center px-4 py-2 disabled:opacity-50">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFacilities;
