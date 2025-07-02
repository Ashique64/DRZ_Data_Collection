import React from "react";

const GeneralServices = ({ facilitiesData, onFacilityChange }) => {
  const facilities = [
    { name: "BellboyService", label: "Bellboy Service" },
    { name: "Caretaker", label: "Caretaker" },
    { name: "Concierge", label: "Concierge" },
    { name: "LuggageAssistance", label: "Luggage Assistance" },
    { name: "LuggageStorage", label: "Luggage Storage" },
    { name: "MailServices", label: "Mail Services" },
    { name: "WakeUpService", label: "Wake-up Call / Service" },
    { name: "Wheelchair", label: "Wheelchair" },
    { name: "ElectricalSockets", label: "Electrical Sockets" },
    { name: "DoctorOnCall", label: "Doctor On Call" },
    { name: "MedicalCentre", label: "Medical Centre" },
    { name: "TourAssistance", label: "Ticket/ Tour Assistance" },
    { name: "PoolTowels", label: "Pool/ Beach Towels" },
    { name: "WelcomeKit", label: "Welcome Kit" },
    { name: "WelcomeDrinks", label: "Welcome Drinks" },
    { name: "Shower", label: "Shower" },
  ];

  const handleCheckboxChange = (facilityName, checked) => {
    onFacilityChange("generalServices", facilityName, checked);
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
                    checked={facilitiesData?.generalServices?.[item.name] || false}
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

export default GeneralServices;
