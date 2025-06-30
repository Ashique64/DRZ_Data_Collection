import React from "react";

const BusinessCenter = () => {
  const facilities = [
    { name: "Banquet", label: "Banquet" },
    { name: "BusinessCenter", label: "Business Center" },
    { name: "BusinessServices", label: "Business Services" },
    { name: "Conference Room", label: "Conference Room" },
    { name: "Photocopying", label: "Photocopying" },
    { name: "FaxService", label: "Fax Service" },
    { name: "Printer", label: "Printer" },
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

export default BusinessCenter;
