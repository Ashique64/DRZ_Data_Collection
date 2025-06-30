import React from "react";

const IndoorActivites = () => {
  const facilities = [
    { name: "Indoor Games", label: "Indoor Games" },
    { name: "Casino", label: "Casino" },
    { name: "Ludo", label: "Ludo" },
    { name: "Carrom", label: "Carrom" },
    { name: "Chess", label: "Chess" },
  ];
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

export default IndoorActivites;
