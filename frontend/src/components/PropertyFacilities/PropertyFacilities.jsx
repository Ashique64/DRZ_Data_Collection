import React, { useEffect, useState } from "react";
import { LuArrowRight, LuImage, LuLink, LuLoader } from "react-icons/lu";
import BaseURL from "../../API/BaseURLS";
import "./PropertyFacilities.scss";
import BasicFacilities from "../BasicFacilities/BasicFacilities";

const PropertyFacilities = () => {
  const [activeTab, setActiveTab] = useState("BasicFacilities");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
          <div className="row first_row">
            <div className="tab_items_col col-md-3">
              <div
                className="nav flex-column nav-pills"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className={`nav-link ${
                    activeTab === "BasicFacilities" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("BasicFacilities")}
                >
                  Basic Facilities	
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "GeneralServices" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("GeneralServices")}
                >
                  General Services	
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "OutdoorActivities" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("OutdoorActivities")}
                >
                  Outdoor Activities & Sports
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "CommonArea" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("CommonArea")}
                >
                  Common Area
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "Food&Drink" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Food&Drink")}
                >
                  Food & Drink
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "Health&Wellness" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Health&Wellness")}
                >
                  Health & Wellness
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "BusinessCenter" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("BusinessCenter")}
                >
                  Business Center & Conference	
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "Beauty&Spa" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Beauty&Spa")}
                >
                  Beauty & Spa
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "Security" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Security")}
                >
                  Security
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "Transfers" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Transfers")}
                >
                  Transfers
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "PaymentServices" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("PaymentServices")}
                >
                  Payment Services
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "Media&Technology" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Media&Technology")}
                >
                  Media & Technology
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "IndoorActivites" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("IndoorActivites")}
                >
                  Indoor Activities & Sports
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "Family&Kids" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Family&Kids")}
                >
                  Family & Kids
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "Safty&Hygiene" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Safty&Hygiene")}
                >
                  Safty & Hygiene
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "PetEssentials" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("PetEssentials")}
                >
                  Pet Essentials
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "Entertainment" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Entertainment")}
                >
                  Entertainment
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "Shopping" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Shopping")}
                >
                  Shopping
                </button>
              </div>
            </div>
            <div className="tab_content_col col-md-9">
              <div className="tab-content">
                <div
                  className={`tab-pane fade ${
                    activeTab === "BasicFacilities" ? "show active" : ""
                  }`}
                >
                  <BasicFacilities/>
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === "GeneralServices" ? "show active" : ""
                  }`}
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est,
                  excepturi illo neque eaque error corrupti laborum alias veniam
                  natus molestias in cupiditate magnam ratione voluptatem!
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === "OutdoorActivities" ? "show active" : ""
                  }`}
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Aspernatur, illum.
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === "CommonArea" ? "show active" : ""
                  }`}
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Sequi quasi dicta qui porro eligendi nam doloribus vel minus
                  ullam quam!
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === "Food&Drink" ? "show active" : ""
                  }`}
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Sequi quasi dicta qui porro eligendi nam doloribus vel minus
                  ullam quam!
                </div>
              </div>
            </div>
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
