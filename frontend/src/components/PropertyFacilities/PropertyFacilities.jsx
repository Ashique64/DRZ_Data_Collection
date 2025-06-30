import React, { useEffect, useState } from "react";
import { LuArrowRight, LuChevronDown, LuChevronUp, LuImage, LuLink, LuLoader } from "react-icons/lu";
import BaseURL from "../../API/BaseURLS";
import "./PropertyFacilities.scss";
import BasicFacilities from "../Facilities/BasicFacilities/BasicFacilities";

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
        return (
          <div className="tab-content-wrapper">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est,
            excepturi illo neque eaque error corrupti laborum alias veniam natus
            molestias in cupiditate magnam ratione voluptatem!
          </div>
        );
      case "OutdoorActivities":
        return (
          <div className="tab-content-wrapper">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Aspernatur, illum.
          </div>
        );
      case "CommonArea":
        return (
          <div className="tab-content-wrapper">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
            quasi dicta qui porro eligendi nam doloribus vel minus ullam quam!
          </div>
        );
      case "Food&Drink":
        return (
          <div className="tab-content-wrapper">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
            quasi dicta qui porro eligendi nam doloribus vel minus ullam quam!
          </div>
        );
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
