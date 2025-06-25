import React, { useEffect, useRef, useState } from "react";
import "./Form.scss";
import {
  LuFolder,
  LuContact,
  LuImage,
  LuGlobe,
  LuClipboardList,
  LuBed,
} from "react-icons/lu";

import { useParams } from "react-router-dom";
import PropertyDetails from "../../components/PropertyDetails/PropertyDetails";
import ContactDetails from "../../components/ContactDetails/ContactDetails";
import GalleryDetails from "../../components/GalleryDetails/GalleryDetails";
import WebsiteDetails from "../../components/WebsiteDetails/WebsiteDetails";
import Overview from "../../components/Overview/Overview";
import BaseURL from "../../API/BaseURLS";
import AccessDenied from "../AccessDenied/AccessDenied";
import FormLoading from "../../components/FormLoading/FormLoading";
import RoomDetails from "../../components/RoomDetails/RoomDetails";

const Form = () => {
  const { token } = useParams();
  const [activeTab, setActiveTab] = useState("property-details");
  const tabsHeaderRef = useRef(null);
  const [isValidToken, setIsValidToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [propertyData, setPropertyData] = useState({});
  const [contactData, setContactData] = useState({});
  const [roomData, setRoomData] = useState({});
  const [galleryData, setGalleryData] = useState({});
  const [websitDetails, setWebsitDetails] = useState({});

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
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [token]);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const response = await fetch(
          `${BaseURL}/api/data/initialize/${token}/`,
          {
            method: "POST",
          }
        );
        const data = await response.json();

        if (data.success) {
          setSessionId(data.session_id);
        } else {
          console.error("Session initialization failed:", data.message);
        }
      } catch (error) {
        console.error("Session init error:", error);
      }
    };

    if (isValidToken) {
      initializeSession();
    }
  }, [isValidToken, token]);

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

  if (loading) {
    return <FormLoading />;
  }

  if (!isValidToken) {
    return <AccessDenied />;
  }

  return (
    <div id="form">
      <div className="container form-container">
        <div className="row form-row">
          <div className="col-md-12 form-col">
            <div className="outline-tabs">
              <div className="tabs-header" ref={tabsHeaderRef}>
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
                    activeTab === "room-details" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("room-details")}
                >
                  <LuBed className="tab-icon" />
                  Room Type
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
                {activeTab === "property-details" && (
                  <PropertyDetails
                    token={token}
                    sessionId={sessionId}
                    onNext={() => {
                      setPropertyData(propertyData);
                      setActiveTab("contact-details");
                    }}
                    initialData={propertyData}
                  />
                )}
                {activeTab === "contact-details" && (
                  <ContactDetails
                    token={token}
                    sessionId={sessionId}
                    onNext={() => {
                      setContactData(contactData);
                      setActiveTab("room-details");
                    }}
                    initialData={contactData}
                  />
                )}
                {activeTab === "room-details" && (
                  <RoomDetails
                    token={token}
                    sessionId={sessionId}
                    onNext={() => {
                      setRoomData(roomData);
                      setActiveTab("gallery");
                    }}
                    initialData={roomData}
                  />
                )}
                {activeTab === "gallery" && (
                  <GalleryDetails
                    token={token}
                    sessionId={sessionId}
                    onNext={() => {
                      setGalleryData(galleryData);
                      setActiveTab("website-details");
                    }}
                    initialData={galleryData}
                  />
                )}
                {activeTab === "website-details" && (
                  <WebsiteDetails
                    token={token}
                    sessionId={sessionId}
                    onNext={() => {
                      setWebsitDetails(websitDetails);
                      setActiveTab("overview");
                    }}
                    initialData={websitDetails}
                  />
                )}
                {activeTab === "overview" && (
                  <Overview token={token} sessionId={sessionId} />
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
