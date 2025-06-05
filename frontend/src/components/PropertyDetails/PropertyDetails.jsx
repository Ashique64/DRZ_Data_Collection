import React from "react";
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
} from "react-icons/lu";

const PropertyDetails = () => {
  return (
    <div className="tab-panel">
      <div className="row property-details-row">
        <div className="title-section">
          <h3>Property Information / Business Information</h3>
        </div>

        <div className="form-section">
          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Property / Business Name</label>
                <div className="input_items">
                  <span>
                    <LuBuilding2 />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Property Address</label>
                <div className="input_items">
                  <span>
                    <LuMapPin />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Property City</label>
                <div className="input_items">
                  <span>
                    <LuLandPlot />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Property State / Province</label>
                <div className="input_items">
                  <span>
                    <LuLandmark />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-6 col-lg-3 item">
              <div className="input_wrapper">
                <label htmlFor="">Zip/Pin/Postal Code</label>
                <div className="input_items">
                  <span>
                    <LuMail />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 item">
              <div className="input_wrapper">
                <label htmlFor="">Property Country</label>
                <div className="input_items">
                  <span>
                    <LuGlobe />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 item">
              <div className="input_wrapper">
                <label htmlFor="">Bill To Company / Organization</label>
                <div className="input_items">
                  <span>
                    <LuBriefcase />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 item">
              <div className="input_wrapper">
                <label htmlFor="">GST Number</label>
                <div className="input_items">
                  <span>
                    <LuFileText />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Property Phone Number</label>
                <div className="input_items">
                  <span>
                    <LuPhone />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Reservation Phone Number</label>
                <div className="input_items">
                  <span>
                    <LuPhoneCall />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Property Email</label>
                <div className="input_items">
                  <span>
                    <LuMailOpen />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Property Website URL</label>
                <div className="input_items">
                  <span>
                    <LuGlobeLock />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="save-btn">
            <button className="btn">save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
