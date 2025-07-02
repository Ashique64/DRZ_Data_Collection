import React from "react";

const Transfers = ({ facilitiesData, onFacilityChange }) => {
  const facilities = [
    { name: "AirportTransfers", label: "Airport Transfers" },
    { name: "RailwayStationTransfers", label: "Railway Station Transfers" },
    { name: "BusStationTransfers", label: "Bus Station Transfers" },
    { name: "PublicTransitTickets", label: "Public Transit Tickets" },
    { name: "ShuttleService", label: "Shuttle Service" },
    { name: "Transportation", label: "Transportation" },
    { name: "AmazingViews", label: "Amazing Views" },
    { name: "CityTours", label: "City Tours" },
  ];

  const handleCheckboxChange = (facilityName, checked) => {
    onFacilityChange("transfers", facilityName, checked);
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
                    checked={facilitiesData?.transfers?.[item.name] || false}
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

export default Transfers;
