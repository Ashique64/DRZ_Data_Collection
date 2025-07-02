import React from "react";

const BeautySpa = ({ facilitiesData, onFacilityChange }) => {
  const facilities = [
    { name: "FacialTreatments", label: "Facial Treatments" },
    { name: "HairTreatment", label: "Hair Treatment" },
    { name: "Massage", label: "Massage" },
    { name: "Saloon", label: "Spa & Saloon" },
    { name: "SteamSauna", label: "Steam and Sauna" },
    { name: "HouseSpa", label: "In-house Spa" },
    { name: "OpenAirBath", label: "Open Air Bath" },
    { name: "PublicBath", label: "Public Bath" },
    { name: "Hammam", label: "Hammam" },
  ];
  const handleCheckboxChange = (facilityName, checked) => {
    onFacilityChange("beautySpa", facilityName, checked);
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
                    checked={facilitiesData?.beautySpa?.[item.name] || false}
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

export default BeautySpa;
