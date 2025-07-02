import React from "react";

const Shopping = ({ facilitiesData, onFacilityChange }) => {
  const facilities = [
    { name: "BookShop", label: "Book Shop" },
    { name: "Grocery", label: "Grocery" },
    { name: "Shops", label: "Shops" },
    { name: "SouvenirShop", label: "Souvenir Shop" },
    { name: "JewelleryShop", label: "Jewellery Shop" },
  ];

  const handleCheckboxChange = (facilityName, checked) => {
    onFacilityChange("shopping", facilityName, checked);
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
                    checked={facilitiesData?.shopping?.[item.name] || false}
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

export default Shopping;
