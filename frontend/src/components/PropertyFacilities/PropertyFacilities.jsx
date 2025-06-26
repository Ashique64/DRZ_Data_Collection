import React, { useEffect, useState } from "react";
import { LuArrowRight, LuImage, LuLink, LuLoader } from "react-icons/lu";
import BaseURL from "../../API/BaseURLS";
import './PropertyFacilities.scss'

const PropertyFacilities = () => {
  return (
    <div className="tab-panel">
      <div className="row details-row">
        <div className="title-section">
          <h3>Property Facilities Information</h3>
          <div className="selected_fecility">
            <select name="" id="">
              <option value="restaurant">Restaurant</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <div className="row first_row"></div>

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
