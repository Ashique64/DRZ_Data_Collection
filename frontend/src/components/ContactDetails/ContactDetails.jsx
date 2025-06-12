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
  LuUser,
  LuBadgeInfo,
} from "react-icons/lu";

const ContactDetails = () => {
  return (
    <div className="tab-panel">
      <div className="row details-row">
        <div className="title-section">
          <h3>Contact Informations</h3>
        </div>

        <div className="form-section">
          <div className="row first_row">
            <h4 className="mb-5">Operational / Support Related Matters</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Contact Person Name</label>
                <div className="input_items">
                  <span>
                    <LuUser />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Designation</label>
                <div className="input_items">
                  <span>
                    <LuBadgeInfo />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Email Address</label>
                <div className="input_items">
                  <span>
                    <LuMail />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Mobile Number</label>
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
            <h4 className="my-5">Property Owner / Manager</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Contact Person Name</label>
                <div className="input_items">
                  <span>
                    <LuUser />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Designation</label>
                <div className="input_items">
                  <span>
                    <LuBadgeInfo />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Email Address</label>
                <div className="input_items">
                  <span>
                    <LuMail />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Mobile Number</label>
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
            <h4 className="my-5">Billing / Invoice Related Matters</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Contact Person Name</label>
                <div className="input_items">
                  <span>
                    <LuUser />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Designation</label>
                <div className="input_items">
                  <span>
                    <LuBadgeInfo />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Email Address</label>
                <div className="input_items">
                  <span>
                    <LuMail />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Mobile Number</label>
                <div className="input_items">
                  <span>
                    <LuPhoneCall />
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

export default ContactDetails;
