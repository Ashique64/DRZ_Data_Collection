import React from "react";

const CommonArea = ({ facilitiesData, onFacilityChange }) => {
  const facilities = [
    { name: "Aquarium", label: "Aquarium" },
    { name: "Balcony", label: "Balcony/ Terrace" },
    { name: "Fireplace", label: "Fireplace" },
    { name: "Library", label: "Library" },
    { name: "Reception", label: "Reception" },
    { name: "SeatingArea", label: "Seating Area" },
    { name: "SunDeck", label: "Sun Deck" },
    { name: "Temple", label: "Temple/ Chapel" },
    { name: "PrayerRoom", label: "Prayer Room" },
    { name: "LivingRoom", label: "Living Room" },
    { name: "OutdoorFurniture", label: "Outdoor Furniture" },
    { name: "PicnicArea", label: "Picnic Area" },
    { name: "GameRoom", label: "Game Room" },
  ];

  const handleCheckboxChange = (facilityName, checked) => {
    onFacilityChange("commonArea", facilityName, checked);
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
                    checked={facilitiesData?.commonArea?.[item.name] || false}
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

export default CommonArea;
