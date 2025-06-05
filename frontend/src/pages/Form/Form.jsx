import React, { useEffect, useRef, useState } from "react";
import "./Form.scss";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";

const Form = () => {
  const [activeTab, setActiveTab] = useState("property-details");
  const tabsHeaderRef = useRef(null);

  useEffect(() => {
  if (tabsHeaderRef.current) {
    const activeButton = tabsHeaderRef.current.querySelector(".tab-button.active");
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
                <button
                  className={`tab-button ${
                    activeTab === "guidelines" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("guidelines")}
                >
                  <LuUser className="tab-icon" />
                  Guidelines
                </button>
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
                  <LuSquareCheck className="tab-icon" />
                  Contact Details
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "gallery" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("gallery")}
                >
                  <LuSquareCheck className="tab-icon" />
                  Gallery
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "website-details" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("website-details")}
                >
                  <LuSquareCheck className="tab-icon" />
                  Website Details
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "overview" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <LuSquareCheck className="tab-icon" />
                  Overview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

{
  /* <div className="outline-tabs">
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <LuUser className="tab-icon" />
          Members
        </button>
        <button
          className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <LuFolder className="tab-icon" />
          Projects
        </button>
        <button
          className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          <LuSquareCheck className="tab-icon" />
          Settings
        </button>
      </div>
      
      <div className="tabs-content">
        {activeTab === 'members' && (
          <div className="tab-panel">Manage your team members</div>
        )}
        {activeTab === 'projects' && (
          <div className="tab-panel">Manage your projects</div>
        )}
        {activeTab === 'tasks' && (
          <div className="tab-panel">Manage your tasks for freelancers</div>
        )}
      </div>
    </div> */
}
