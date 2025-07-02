import React from "react";

const PetEssentials = ({ facilitiesData, onFacilityChange }) => {
  const facilities = [
    { name: "PetBowls", label: "Pet Bowls" },
    { name: "PetBaskets", label: "Pet Baskets" },
  ];

  const handleCheckboxChange = (facilityName, checked) => {
    onFacilityChange("petEssentials", facilityName, checked);
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
                    checked={facilitiesData?.petEssentials?.[item.name] || false}
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

export default PetEssentials;
