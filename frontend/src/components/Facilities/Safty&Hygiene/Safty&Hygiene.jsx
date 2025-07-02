import React from "react";

const SaftyHygiene = () => {
  const facilities = [
    { name: "Disinfection", label: "Disinfection" },
    { name: "ShoeCovers", label: "Shoe Covers" },
    { name: "HairNets", label: "Hair Nets" },
    { name: "PPE", label: "PPE (Personal Protective Equipment) Kits" },
    { name: "Hospital", label: "Hospital in the Vicinity" },
    { name: "Certificate", label: "Safety Authorization Certificate" },
    { name: "DisposableServeware", label: "Disposable Serveware" },
    { name: "ExitPoints", label: "Thermal Screening at Entry and Exit Points" },
    { name: "Dispensors", label: "Dispensors for Disinfectants" },
    { name: "SanitizersInstalled", label: "Sanitizers Installed" },
    { name: "Masks", label: "Masks" },
    { name: "DisinfectantWipes", label: "Disinfectant Wipes" },
    { name: "Gloves", label: "Gloves" },
    { name: "ContactlessCheck-in", label: "Contactless Check-in" },
    { name: "SafetyKit", label: "Safety Kit" },
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

export default SaftyHygiene;
