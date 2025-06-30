import React from "react";

const Security = () => {
  const facilities = [
    { name: "ChildcareService", label: "Childcare Service" },
    { name: "Play Area", label: "Children's Play Area" },
    { name: "KidsClub", label: "Kid's Club" },
    { name: "Strollers", label: "Strollers" },
    { name: "Playground", label: "Playground" },
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

export default Security;
