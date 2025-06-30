import React from "react";

const HealthWellness = () => {
  const facilities = [
    { name: "FitnessCentre", label: "Gym/ Fitness Centre" },
    { name: "Reflexology", label: "Reflexology" },
    { name: "ActivityCentre", label: "Activity Centre" },
    { name: "Yoga", label: "Yoga" },
    { name: "MeditationRoom", label: "Meditation Room" },
    { name: "Aerobics", label: "Aerobics" },
    { name: "First-aidServices", label: "First-aid Services" },
    { name: "Solarium", label: "Solarium" },
    { name: "HotSpringBath", label: "Hot Spring Bath" },
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

export default HealthWellness;
