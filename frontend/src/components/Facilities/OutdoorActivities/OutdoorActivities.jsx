import React from "react";

const OutdoorActivities = () => {
  const facilities = [
    { name: "Beach", label: "Beach" },
    { name: "Kayakas", label: "Kayakas" },
    { name: "Golf", label: "Golf" },
    { name: "BoatRide", label: "Boat Ride" },
    { name: "OutdoorSports", label: "Outdoor Sports" },
    { name: "SeaPlane", label: "Sea Plane" },
    { name: "Snorkelling", label: "Snorkelling" },
    { name: "Telescope", label: "Telescope" },
    { name: "WaterSports", label: "Water Sports" },
    { name: "VehicleRentals", label: "Vehicle Rentals" },
    { name: "Skiing", label: "Skiing" },
    { name: "JungleSafari", label: "Jungle Safari" },
    { name: "Cycling", label: "Cycling" },
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

export default OutdoorActivities;
