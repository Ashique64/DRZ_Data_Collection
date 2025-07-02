import React from "react";

const FoodDrink = ({ facilitiesData, onFacilityChange }) => {
  const facilities = [
    { name: "Bar", label: "Bar" },
    { name: "Minibar", label: "Minibar" },
    { name: "Barbeque", label: "Barbeque" },
    { name: "Cafe", label: "Cafe" },
    { name: "CoffeeShop", label: "Coffee Shop" },
    { name: "CoffeeMachine", label: "Coffee Machine" },
    { name: "DiningArea", label: "Dining Area" },
    { name: "KidsMeals", label: "Kids Meals" },
    { name: "Restaurant", label: "Restaurant" },
    { name: "SpecialDietMeals", label: "Special Diet Meals" },
    { name: "CookingClass", label: "Cooking Class" },
    { name: "Bakery", label: "Bakery" },
  ];

  const handleCheckboxChange = (facilityName, checked) => {
    onFacilityChange("foodDrink", facilityName, checked);
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
                    checked={facilitiesData?.foodDrink?.[item.name] || false}
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

export default FoodDrink;
