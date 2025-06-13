import React, { useEffect, useRef, useState } from "react";
import "./Form.scss";
import {
  LuFolder,
  LuContact,
  LuImage,
  LuGlobe,
  LuClipboardList,
} from "react-icons/lu";

import { useParams } from "react-router-dom";
import PropertyDetails from "../../components/PropertyDetails/PropertyDetails";
import ContactDetails from "../../components/ContactDetails/ContactDetails";
import GalleryDetails from "../../components/GalleryDetails/GalleryDetails";
import WebsiteDetails from "../../components/WebsiteDetails/WebsiteDetails";
import Overview from "../../components/Overview/Overview";
import BaseURL from "../../API/BaseURLS";
import AccessDenied from "../AccessDenied/AccessDenied";

const Form = () => {
  const { token } = useParams();
  const [activeTab, setActiveTab] = useState("property-details");
  const tabsHeaderRef = useRef(null);
  const [isValidToken, setIsValidToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const response = await fetch(
        `${BaseURL}/api/email/verify-token/${token}/`
      );
      const data = await response.json();

      if (data.valid) {
        setIsValidToken(true);
      } else {
        setIsValidToken(false);
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      setIsValidToken(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [token]);

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

  // Loading state
  if (loading) {
    return (
      <div id="form">
        <div className="container form-container">
          <div className="row form-row">
            <div className="col-md-12 form-col">
              <div
                className="loading-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "400px",
                  flexDirection: "column",
                }}
              >
                <div
                  className="spinner"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "4px solid #f3f3f3",
                    borderTop: "4px solid #3498db",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    marginBottom: "20px",
                  }}
                ></div>
                <div style={{ fontSize: "18px", color: "#666" }}>
                  Verifying access...
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Invalid token state
  if (!isValidToken) {
    return (
      <AccessDenied/>
    );
  }

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
                {activeTab === "property-details" && <PropertyDetails token={token} />}
                {activeTab === "contact-details" && <ContactDetails token={token} />}
                {activeTab === "gallery" && <GalleryDetails token={token} />}
                {activeTab === "website-details" && <WebsiteDetails token={token} />}
                {activeTab === "overview" && <Overview token={token} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
