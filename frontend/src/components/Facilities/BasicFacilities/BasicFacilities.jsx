import React from "react";

const BasicFacilities = ({ facilitiesData, onFacilityChange }) => {
  const facilities = [
    { name: "AirConditioning", label: "Air Conditioning" },
    { name: "Bathroom", label: "Bathroom" },
    { name: "DryCleaningServices", label: "Dry Cleaning Services" },
    { name: "DailyHousekeeping", label: "Daily Housekeeping" },
    { name: "Intercom", label: "Intercom" },
    { name: "IroningServices", label: "Ironing Services" },
    { name: "LAN", label: "LAN" },
    { name: "Laundry", label: "Laundry" },
    { name: "Newspaper", label: "Newspaper" },
    { name: "PowerBackup", label: "Power Backup" },
    { name: "Parking", label: "Parking" },
    { name: "Refrigerator", label: "Refrigerator" },
    { name: "Microwave", label: "Microwave" },
    { name: "RoomService", label: "Room Service" },
    { name: "SmokeDetector", label: "Smoke Detector" },
    { name: "SmokingRooms", label: "Smoking Rooms" },
    { name: "SwimmingPool", label: "Swimming Pool" },
    { name: "Telephone", label: "Telephone" },
    { name: "Torch", label: "Torch" },
    { name: "Umbrellas", label: "Umbrellas" },
    { name: "CableTV", label: "Cable TV" },
    { name: "KingSizedBeds", label: "King Sized Beds" },
    { name: "Wardrobe", label: "Wardrobe" },
    { name: "Oven", label: "Oven" },
    { name: "HDTV", label: "HD TV" },
    { name: "Sanitizers", label: "Sanitizers" },
    { name: "PrivateEntrance", label: "Private Entrance" },
    { name: "VendingMachine", label: "Vending Machine" },
    { name: "Laundromat", label: "Laundromat" },
    { name: "PublicRestrooms", label: "Public Restrooms" },
    { name: "Wifi", label: "Wifi" },
    { name: "ComfortableBeds", label: "Comfortable Beds" },
    { name: "WashingMachine", label: "Washing Machine" },
  ];

  const handleCheckboxChange = (facilityName, checked) => {
    onFacilityChange("basicFacilities", facilityName, checked);
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
                    checked={facilitiesData?.basicFacilities?.[item.name] || false}
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

export default BasicFacilities;
