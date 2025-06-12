import React, { useEffect, useRef, useState } from "react";
import "./Form.scss";
import {
  LuFolder,
  LuContact,
  LuImage,
  LuGlobe,
  LuClipboardList,
} from "react-icons/lu";
import PropertyDetails from "../../components/PropertyDetails/PropertyDetails";
import ContactDetails from "../../components/ContactDetails/ContactDetails";
import GalleryDetails from "../../components/GalleryDetails/GalleryDetails";

const Form = () => {
  const [activeTab, setActiveTab] = useState("property-details");
  const tabsHeaderRef = useRef(null);

  useEffect(() => {
    if (tabsHeaderRef.current) {
      const activeButton =
        tabsHeaderRef.current.querySelector(".tab-button.active");
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [activeTab]);

  return (
    <div id="form">
      <div className="container form-container">
        <div className="row form-row">
          <div className="col-md-12 form-col">
            <div className="outline-tabs">
              <div className="tabs-header" ref={tabsHeaderRef}>
                {/* <button
                  className={`tab-button ${
                    activeTab === "guidelines" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("guidelines")}
                >
                  <LuUser className="tab-icon" />
                  Guidelines
                </button> */}
                <button
                  className={`tab-button ${
                    activeTab === "property-details" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("property-details")}
                >
                  <LuFolder className="tab-icon" />
                  Property Details
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "contact-details" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("contact-details")}
                >
                  <LuContact className="tab-icon" />
                  Contact Details
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "gallery" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("gallery")}
                >
                  <LuImage className="tab-icon" />
                  Gallery
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "website-details" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("website-details")}
                >
                  <LuGlobe className="tab-icon" />
                  Website Details
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "overview" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <LuClipboardList className="tab-icon" />
                  Overview
                </button>
              </div>
              <div className="tabs-content">
                {/* {activeTab === "guidelines" && (
                  <div className="tab-panel">
                    <div className="row guideline-row">
                      <div className="title-section">
                        <h3>Read the Guidelines</h3>
                      </div>

                      <div className="col-md-12 guideline-col"></div>
                    </div>
                  </div>
                )} */}
                {activeTab === "property-details" && <PropertyDetails />}
                {activeTab === "contact-details" && <ContactDetails />}
                {activeTab === "gallery" && <GalleryDetails />}
                {activeTab === "website-details" && (
                  <div className="tab-panel">
                    Website Details
                  </div>
                )}
                {activeTab === "overview" && (
                  <div className="tab-panel">
                    Overview
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
