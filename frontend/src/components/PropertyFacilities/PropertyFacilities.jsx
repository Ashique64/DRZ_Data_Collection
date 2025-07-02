import React, { useEffect, useState } from "react";
import {
  LuArrowRight,
  LuChevronDown,
  LuChevronUp,
  LuImage,
  LuInfo,
  LuLink,
  LuLoader,
} from "react-icons/lu";
import BaseURL from "../../API/BaseURLS";
import axios from "axios";
import "./PropertyFacilities.scss";
import BasicFacilities from "../Facilities/BasicFacilities/BasicFacilities";
import GeneralServices from "../Facilities/GeneralServices/GeneralServices";
import OutdoorActivities from "../Facilities/OutdoorActivities/OutdoorActivities";
import CommonArea from "../Facilities/CommonArea/CommonArea";
import FoodDrink from "../Facilities/Food&Drink/Food&Drink";
import HealthWellness from "../Facilities/Health&Wellness/Health&Wellness";
import BusinessCenter from "../Facilities/BusinessCenter/BusinessCenter";
import BeautySpa from "../Facilities/Beauty&Spa/Beauty&Spa";
import Security from "../Facilities/Security/Security";
import Transfers from "../Facilities/Transfers/Transfers";
import PaymentServices from "../Facilities/PaymentServices/PaymentServices";
import MediaTechnology from "../Facilities/Media&Technology/Media&Technology";
import IndoorActivites from "../Facilities/IndoorActivites/IndoorActivites";
import FamilyKids from "../Facilities/Family&Kids/Family&Kids";
import SaftyHygiene from "../Facilities/Safty&Hygiene/Safty&Hygiene";
import PetEssentials from "../Facilities/PetEssentials/PetEssentials";
import Entertainment from "../Facilities/Entertainment/Entertainment";
import Shopping from "../Facilities/Shopping/Shopping";

const PropertyFacilities = ({ sessionId, onNext, onSave, initialData }) => {
  const [activeTab, setActiveTab] = useState("BasicFacilities");
  const [expandedMobile, setExpandedMobile] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const [facilitiesData, setFacilitiesData] = useState({
    //Basic Facilities
    basicFacilities: {
      AirConditioning: false,
      Bathroom: false,
      DryCleaningServices: false,
      DailyHousekeeping: false,
      Intercom: false,
      IroningServices: false,
      LAN: false,
      Laundry: false,
      Newspaper: false,
      PowerBackup: false,
      Parking: false,
      Refrigerator: false,
      Microwave: false,
      RoomService: false,
      SmokeDetector: false,
      SmokingRooms: false,
      SwimmingPool: false,
      Telephone: false,
      Torch: false,
      Umbrellas: false,
      CableTV: false,
      KingSizedBeds: false,
      Wardrobe: false,
      Oven: false,
      HDTV: false,
      Sanitizers: false,
      PrivateEntrance: false,
      VendingMachine: false,
      Laundromat: false,
      PublicRestrooms: false,
      Wifi: false,
      ComfortableBeds: false,
      WashingMachine: false,
    },
    // General Services
    generalServices: {
      BellboyService: false,
      Caretaker: false,
      Concierge: false,
      LuggageAssistance: false,
      LuggageStorage: false,
      MailServices: false,
      WakeUpService: false,
      Wheelchair: false,
      ElectricalSockets: false,
      DoctorOnCall: false,
      MedicalCentre: false,
      TourAssistance: false,
      PoolTowels: false,
      WelcomeKit: false,
      WelcomeDrinks: false,
      Shower: false,
    },
    // Outdoor Activities
    outdoorActivities: {
      Beach: false,
      Kayakas: false,
      Golf: false,
      BoatRide: false,
      OutdoorSports: false,
      SeaPlane: false,
      Snorkelling: false,
      Telescope: false,
      WaterSports: false,
      VehicleRentals: false,
      Skiing: false,
      JungleSafari: false,
      Cycling: false,
    },
    // Common Area
    commonArea: {
      Aquarium: false,
      Balcony: false,
      Fireplace: false,
      Library: false,
      Reception: false,
      SeatingArea: false,
      SunDeck: false,
      Temple: false,
      PrayerRoom: false,
      LivingRoom: false,
      OutdoorFurniture: false,
      PicnicArea: false,
      GameRoom: false,
    },
    // Food Drink
    foodDrink: {
      Bar: false,
      Minibar: false,
      Barbeque: false,
      Cafe: false,
      CoffeeShop: false,
      CoffeeMachine: false,
      DiningArea: false,
      KidsMeals: false,
      Restaurant: false,
      SpecialDietMeals: false,
      CookingClass: false,
      Bakery: false,
    },
    //Health Wellness
    healthWellness: {
      FitnessCentre: false,
      Reflexology: false,
      ActivityCentre: false,
      Yoga: false,
      MeditationRoom: false,
      Aerobics: false,
      FirstAidServices: false,
      Solarium: false,
      HotSpringBath: false,
    },
    //Business Center
    businessCenter: {
      Banquet: false,
      BusinessCenter: false,
      BusinessServices: false,
      ConferenceRoom: false,
      Photocopying: false,
      FaxService: false,
      Printer: false,
    },
    //Beauty Spa
    beautySpa: {
      FacialTreatments: false,
      HairTreatment: false,
      Massage: false,
      Saloon: false,
      SteamSauna: false,
      HouseSpa: false,
      OpenAirBath: false,
      PublicBath: false,
      Hammam: false,
    },
    //Security
    security: {
      Bodyguards: false,
      ElectronicKeycard: false,
      EmergencyExitMap: false,
      Safe: false,
      Security: false,
      CCTV: false,
      FireExtinguishers: false,
      SafetySecurity: false,
      SecurityAlarms: false,
      SmokeAlarms: false,
    },
    transfers: {
      AirportTransfers: false,
      RailwayStationTransfers: false,
      BusStationTransfers: false,
      PublicTransitTickets: false,
      ShuttleService: false,
      Transportation: false,
      AmazingViews: false,
      CityTours: false,
    },
    paymentServices: {
      CurrencyExchange: false,
      ATM: false,
    },
    mediaTechnology: {
      ElectricalAdaptersAvailable: false,
      ElectricalChargers: false,
      Laptops: false,
      TV: false,
    },
    indoorActivities: {
      IndoorGames: false,
      Casino: false,
      Ludo: false,
      Carrom: false,
      Chess: false,
    },
    familyKids: {
      ChildcareService: false,
      PlayArea: false,
      KidsClub: false,
      Strollers: false,
      Playground: false,
    },
    safetyHygiene: {
      Disinfection: false,
      ShoeCovers: false,
      HairNets: false,
      PPE: false,
      Hospital: false,
      Certificate: false,
      DisposableServeware: false,
      ExitPoints: false,
      Dispensors: false,
      SanitizersInstalled: false,
      Masks: false,
      DisinfectantWipes: false,
      Gloves: false,
      ContactlessCheckIn: false,
      SafetyKit: false,
    },
    petEssentials: {
      PetBowls: false,
      PetBaskets: false,
    },
    entertainment: {
      Events: false,
      PUB: false,
      PhotoSession: false,
      NightClub: false,
      BeachClub: false,
      Radio: false,
    },
    shopping: {
      BookShop: false,
      Grocery: false,
      Shops: false,
      SouvenirShop: false,
      JewelleryShop: false,
    },
    additional_info: "",
  });

  const tabs = [
    { id: "BasicFacilities", label: "Basic Facilities" },
    { id: "GeneralServices", label: "General Services" },
    { id: "OutdoorActivities", label: "Outdoor Activities & Sports" },
    { id: "CommonArea", label: "Common Area" },
    { id: "Food&Drink", label: "Food & Drink" },
    { id: "Health&Wellness", label: "Health & Wellness" },
    { id: "BusinessCenter", label: "Business Center & Conference" },
    { id: "Beauty&Spa", label: "Beauty & Spa" },
    { id: "Security", label: "Security" },
    { id: "Transfers", label: "Transfers" },
    { id: "PaymentServices", label: "Payment Services" },
    { id: "Media&Technology", label: "Media & Technology" },
    { id: "IndoorActivites", label: "Indoor Activities & Sports" },
    { id: "Family&Kids", label: "Family & Kids" },
    { id: "Safty&Hygiene", label: "Safety & Hygiene" },
    { id: "PetEssentials", label: "Pet Essentials" },
    { id: "Entertainment", label: "Entertainment" },
    { id: "Shopping", label: "Shopping" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleMobileToggle = (tabId) => {
    setExpandedMobile(expandedMobile === tabId ? null : tabId);
  };

  const loadExistingData = async () => {
    if (!sessionId) return;

    // setLoading(true);
    try {
      const response = await axios.get(
        `${BaseURL}/api/facilities/property-facilities/${sessionId}/`
      );

      if (response.data.success && response.data.data) {
        setFacilitiesData((prevData) => ({
          ...prevData,
          ...response.data.data,
        }));
      }
    } catch (error) {
      console.error("Error loading existing facilities data:", error);
    } finally {
      // setLoading(false);
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFacilitiesData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
      setDataLoaded(true);
    } else if (sessionId && !dataLoaded) {
      loadExistingData();
    }
  }, [sessionId]);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0 && !dataLoaded) {
      setFacilitiesData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleFacilityChange = (category, facilityName, value) => {
    setFacilitiesData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [facilityName]: value,
      },
    }));

    if (errors[category]) {
      setErrors((prev) => ({
        ...prev,
        [category]: "",
      }));
    }
  };

  const handleAdditionalInfoChange = (e) => {
    const { value } = e.target;
    setFacilitiesData((prev) => ({
      ...prev,
      additional_info: value,
    }));
  };

  const saveData = async (showMessage = true) => {
    setSaving(true);
    try {
      const response = await axios.post(
        `${BaseURL}/api/facilities/property-facilities/${sessionId}/`,
        facilitiesData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      if (result.success) {
        if (showMessage) {
          setMessage("Property Facilities saved successfully!");
          setTimeout(() => setMessage(""), 3000);
        }

        if (onSave) {
          onSave("facilities", facilitiesData);
        }

        return true;
      } else {
        setMessage(result.error || "Failed to save property facilities");
        return false;
      }
    } catch (error) {
      setMessage("Error saving data. Please try again.");
      console.error("Save error:", error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    const saved = await saveData(false);
    if (saved && onNext) {
      setTimeout(() => {
        onNext();
      }, 1000);
    }
  };

  const renderTabContent = (tabId) => {
    const commonProps = {
      facilitiesData,
      onFacilityChange: handleFacilityChange,
    };

    switch (tabId) {
      case "BasicFacilities":
        return <BasicFacilities {...commonProps} />;
      case "GeneralServices":
        return <GeneralServices {...commonProps} />;
      case "OutdoorActivities":
        return <OutdoorActivities {...commonProps} />;
      case "CommonArea":
        return <CommonArea {...commonProps} />;
      case "Food&Drink":
        return <FoodDrink {...commonProps} />;
      case "Health&Wellness":
        return <HealthWellness {...commonProps} />;
      case "BusinessCenter":
        return <BusinessCenter {...commonProps} />;
      case "Beauty&Spa":
        return <BeautySpa {...commonProps} />;
      case "Security":
        return <Security {...commonProps} />;
      case "Transfers":
        return <Transfers {...commonProps} />;
      case "PaymentServices":
        return <PaymentServices {...commonProps} />;
      case "Media&Technology":
        return <MediaTechnology {...commonProps} />;
      case "IndoorActivites":
        return <IndoorActivites {...commonProps} />;
      case "Family&Kids":
        return <FamilyKids {...commonProps} />;
      case "Safty&Hygiene":
        return <SaftyHygiene {...commonProps} />;
      case "PetEssentials":
        return <PetEssentials {...commonProps} />;
      case "Entertainment":
        return <Entertainment {...commonProps} />;
      case "Shopping":
        return <Shopping {...commonProps} />;
      default:
        return (
          <div className="tab-content-wrapper">
            <p>Content for {tabs.find((tab) => tab.id === tabId)?.label}</p>
          </div>
        );
    }
  };
  return (
    <div className="tab-panel">
      {message && (
        <div
          className={`alert ${
            message.includes("successfully") ? "alert-success" : "alert-error"
          }`}
        >
          {message}
        </div>
      )}
      <div className="row details-row">
        <div className="title-section">
          <h3>Property Facilities Information</h3>
          {/* <div className="selected_fecility">
            <select name="" id="">
              <option value="restaurant">Restaurant</option>
            </select>
          </div> */}
        </div>

        <div className="form-section">
          <div className="row first_row d-none d-md-flex">
            <div className="tab_items_col col-md-3">
              <div
                className="nav flex-column nav-pills"
                role="tablist"
                aria-orientation="vertical"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`nav-link ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="tab_content_col col-md-9">
              <div className="tab-content">
                <div className="tab-pane fade show active">
                  {renderTabContent(activeTab)}
                </div>
              </div>
            </div>
          </div>
          <div className="row first_row d-none d-lg-block">
            <div className="col-md-12 item">
              <div className="input_wrapper">
                <label htmlFor="additional_info">
                  If you want to provide additional information...
                </label>
                <div className="input_items">
                  <span>
                    <LuInfo />
                  </span>
                  <textarea
                    name="additional_info"
                    id="additional_info"
                    value={facilitiesData.additional_info}
                    onChange={handleAdditionalInfoChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-accordion d-md-none">
            {tabs.map((tab) => (
              <div key={tab.id} className="accordion-item">
                <button
                  className={`accordion-header ${
                    expandedMobile === tab.id ? "active" : ""
                  }`}
                  onClick={() => handleMobileToggle(tab.id)}
                >
                  <span>{tab.label}</span>
                  {expandedMobile === tab.id ? (
                    <LuChevronUp className="chevron-icon" />
                  ) : (
                    <LuChevronDown className="chevron-icon" />
                  )}
                </button>

                {expandedMobile === tab.id && (
                  <div className="accordion-content">
                    {renderTabContent(tab.id)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="save-btn">
            <button
              onClick={handleNext}
              disabled={saving}
              className="btn btn-transperant d-inline-flex justify-content-center align-items-center px-4 py-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <LuLoader className="me-2 spinner-border spinner-border-sm" />
                  Saving...
                </>
              ) : (
                <>
                  Save & Next
                  <LuArrowRight className="ms-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFacilities;
