import React from "react";

const MediaTechnology = ({ facilitiesData, onFacilityChange }) => {
  const facilities = [
    {
      name: "ElectricalAdaptersAvailable",
      label: "Electrical Adapters Available",
    },
    { name: "ElectricalChargers", label: "Electrical Chargers" },
    { name: "Laptops", label: "Laptops" },
    { name: "TV", label: "TV" },
  ];

  const handleCheckboxChange = (facilityName, checked) => {
    onFacilityChange("mediaTechnology", facilityName, checked);
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
                    checked={facilitiesData?.mediaTechnology?.[item.name] || false}
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

export default MediaTechnology;
