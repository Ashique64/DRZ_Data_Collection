import React from "react";

const Entertainment = ({ facilitiesData, onFacilityChange }) => {
  const facilities = [
    { name: "Events", label: "Events" },
    { name: "PUB", label: "PUB" },
    { name: "PhotoSession", label: "Photo Session" },
    { name: "NightClub", label: "Night Club" },
    { name: "BeachClub", label: "Beach Club" },
    { name: "Radio", label: "Radio" },
  ];
  const handleCheckboxChange = (facilityName, checked) => {
    onFacilityChange("entertainment", facilityName, checked);
  };
  return (
    <div className="facility">
      <div className="row facility_row">
        <div className="facility_col col-md-12">
          <div className="row my-md-none my-lg-2">
            {facilities.map((item, index) => (
              <div className="col-md-4" key={index}>
                <label>
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    name={item.name}
                    checked={facilitiesData?.entertainment?.[item.name] || false}
                    onChange={(e) =>
                      handleCheckboxChange(item.name, e.target.checked)
                    }
                  />
                  <span>{item.label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entertainment;
