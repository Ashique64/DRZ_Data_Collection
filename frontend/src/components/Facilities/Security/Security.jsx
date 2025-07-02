import React from "react";

const Security = ({ facilitiesData, onFacilityChange }) => {
  const facilities = [
    { name: "Bodyguards", label: "Bodyguards" },
    { name: "ElectronicKeycard", label: "Electronic Keycard" },
    { name: "EmergencyExitMap", label: "Emergency Exit Map" },
    { name: "Safe", label: "Safe" },
    { name: "Security", label: "Security" },
    { name: "CCTV", label: "CCTV" },
    { name: "FireExtinguishers", label: "Fire Extinguishers" },
    { name: "SafetySecurity", label: "Safety and Security" },
    { name: "SecurityAlarms", label: "Security Alarms" },
    { name: "SmokeAlarms", label: "Smoke Alarms" },
  ];

  const handleCheckboxChange = (facilityName, checked) => {
    onFacilityChange("security", facilityName, checked);
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
                    checked={facilitiesData?.security?.[item.name] || false}
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

export default Security;
