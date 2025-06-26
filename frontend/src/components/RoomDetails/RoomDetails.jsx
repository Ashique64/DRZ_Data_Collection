import React, { useState, useEffect } from "react";
import axios from "axios";
import BaseURL from "../../API/BaseURLS";
import {
  LuArrowRight,
  LuLoader,
  LuHouse,
  LuUsers,
  LuCoins,
  LuNotepadText,
  LuLink,
  LuPlus,
  LuMinus,
} from "react-icons/lu";

const RoomDetails = ({ sessionId, onNext, onSave, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const [rooms, setRooms] = useState([
    {
      id: 1,
      room_type: "",
      occupancy: "",
      room_price: "",
      room_image: "",
      description: "",
      room_additional_info: "",
    }
  ]);

  const roomTypes = [
    "Standard",
    "Deluxe",
    "Superior",
    "Presidential",
    "Family",
    "Suite",
    "Single",
    "Double",
    "Twin",
    "Twin/Double",
    "Triple",
    "Quadruple",
    "Studio",
    "Apartment",
    "Dormitory room",
    "Bed in Dormitory",
    "Mixed Dorm",
    "Female Dorm",
  ];

  const loadExistingData = async () => {
    if (!sessionId) {
      console.log("No sessionId provided");
      return;
    }

    console.log("Loading existing data for sessionId:", sessionId);
    setLoading(true);

    try {
      const response = await axios.get(
        `${BaseURL}/api/room/room-details/${sessionId}/`
      );

      // console.log("API Response:", response.data);

      if (response.data.success && response.data.data) {
        if (Array.isArray(response.data.data) && response.data.data.length > 0) {
          // console.log("Loading existing rooms:", response.data.data);
          setRooms(response.data.data.map((room, index) => ({
            ...room,
            id: index + 1
          })));
        } else if (!Array.isArray(response.data.data) && Object.keys(response.data.data).length > 0) {
          
          // console.log("Loading single room (backward compatibility):", response.data.data);
          setRooms([{ ...response.data.data, id: 1 }]);
        } else {
          // console.log("No existing room data, using default room");
          setRooms([{
            id: 1,
            room_type: "",
            occupancy: "",
            room_price: "",
            room_image: "",
            description: "",
            room_additional_info: "",
          }]);
        }
      } else {
        // console.log("No data in response, using default room");
        setRooms([{
          id: 1,
          room_type: "",
          occupancy: "",
          room_price: "",
          room_image: "",
          description: "",
          room_additional_info: "",
        }]);
      }
    } catch (error) {
      // console.error("Error loading existing room data:", error);
      console.error("Error details:", error.response?.data);
      setRooms([{
        id: 1,
        room_type: "",
        occupancy: "",
        room_price: "",
        room_image: "",
        description: "",
        room_additional_info: "",
      }]);
    } finally {
      setLoading(false);
      setDataLoaded(true);
      console.log("Data loading completed");
    }
  };

  useEffect(() => {
    console.log("First useEffect - initialData:", initialData, "sessionId:", sessionId, "dataLoaded:", dataLoaded);
    
    if (initialData && Object.keys(initialData).length > 0) {
      // console.log("Using initialData");
      if (Array.isArray(initialData)) {
        setRooms(initialData.map((room, index) => ({
          ...room,
          id: index + 1
        })));
      } else {
        setRooms([{ ...initialData, id: 1 }]);
      }
      setDataLoaded(true);
    } else if (sessionId && !dataLoaded) {
      // console.log("Loading data from API");
      loadExistingData();
    } else if (!sessionId && !dataLoaded) {
      // console.log("No sessionId, setting default room");
      setRooms([{
        id: 1,
        room_type: "",
        occupancy: "",
        room_price: "",
        room_image: "",
        description: "",
        room_additional_info: "",
      }]);
      setDataLoaded(true);
    }
  }, [sessionId]);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0 && !dataLoaded) {
      if (Array.isArray(initialData)) {
        setRooms(initialData.map((room, index) => ({
          ...room,
          id: index + 1
        })));
      } else {
        setRooms([{ ...initialData, id: 1 }]);
      }
    }
  }, [initialData]);

  const handleInputChange = (roomId, field, value) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === roomId 
          ? { ...room, [field]: value }
          : room
      )
    );

    if (errors[`${roomId}_${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${roomId}_${field}`]: "",
      }));
    }
  };

  const addRoom = () => {
    const newId = Math.max(...rooms.map(room => room.id)) + 1;
    setRooms(prev => [...prev, {
      id: newId,
      room_type: "",
      occupancy: "",
      room_price: "",
      room_image: "",
      description: "",
      room_additional_info: "",
    }]);
  };

  const removeRoom = (roomId) => {
    if (rooms.length > 1) {
      setRooms(prev => prev.filter(room => room.id !== roomId));
      
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(`${roomId}_`)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    rooms.forEach(room => {
      if (!room.room_type.trim()) {
        newErrors[`${room.id}_room_type`] = "Room type name is required";
      }

      if (!room.occupancy.trim()) {
        newErrors[`${room.id}_occupancy`] = "Max occupancy is required";
      }

      if (!room.room_price.trim()) {
        newErrors[`${room.id}_room_price`] = "Room price is required";
      }

      if (!room.room_image.trim()) {
        newErrors[`${room.id}_room_image`] = "Image link is required";
      }

      if (!room.description.trim()) {
        newErrors[`${room.id}_description`] = "Room description is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveData = async (showMessage = true) => {
    if (!validateForm()) {
      return false;
    }

    setSaving(true);
    try {
      const response = await axios.post(
        `${BaseURL}/api/room/room-details/${sessionId}/`,
        { rooms: rooms },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      if (result.success) {
        if (showMessage) {
          setMessage("Room Information saved successfully!");
          setTimeout(() => setMessage(""), 3000);
        }

        if (onSave) {
          onSave("room", rooms);
        }

        return true;
      } else {
        setMessage(result.error || "Failed to save room details");
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

  const renderRoomForm = (room, index) => (
    <div key={room.id} className="form-section" style={{ marginBottom: '30px', padding: '20px', borderRadius: '8px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Room {index + 1}</h5>
        <div className="d-flex gap-2">
          {index === rooms.length - 1 && (
            <button
              type="button"
              onClick={addRoom}
              className="btn btn-sm btn-outline-success d-flex align-items-center"
              title="Add Room"
            >
              <LuPlus size={16} />
            </button>
          )}
          {rooms.length > 1 && (
            <button
              type="button"
              onClick={() => removeRoom(room.id)}
              className="btn btn-sm btn-outline-danger d-flex align-items-center"
              title="Remove Room"
            >
              <LuMinus size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="row first_row">
        <div className="col-md-12 col-lg-6 item">
          <div className="input_wrapper">
            <label htmlFor={`room_type_${room.id}`}>Room Type Name</label>
            <div className="input_items">
              <span>
                <LuHouse />
              </span>
              <select
                name={`room_type_${room.id}`}
                id={`room_type_${room.id}`}
                value={room.room_type}
                onChange={(e) => handleInputChange(room.id, 'room_type', e.target.value)}
              >
                <option value="" disabled>
                  Select Room Type
                </option>
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {errors[`${room.id}_room_type`] && (
              <div className="invalid-feedback d-block">
                {errors[`${room.id}_room_type`]}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-12 col-lg-6 item">
          <div className="input_wrapper">
            <label htmlFor={`occupancy_${room.id}`}>Max Occupancy</label>
            <div className="input_items">
              <span>
                <LuUsers />
              </span>
              <input
                type="text"
                name={`occupancy_${room.id}`}
                id={`occupancy_${room.id}`}
                value={room.occupancy}
                onChange={(e) => handleInputChange(room.id, 'occupancy', e.target.value)}
              />
            </div>
            {errors[`${room.id}_occupancy`] && (
              <div className="invalid-feedback d-block">
                {errors[`${room.id}_occupancy`]}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row first_row">
        <div className="col-md-12 col-lg-6 item">
          <div className="input_wrapper">
            <label htmlFor={`room_price_${room.id}`}>Room Price</label>
            <div className="input_items">
              <span>
                <LuCoins />
              </span>
              <input
                type="text"
                name={`room_price_${room.id}`}
                id={`room_price_${room.id}`}
                value={room.room_price}
                onChange={(e) => handleInputChange(room.id, 'room_price', e.target.value)}
                className={errors[`${room.id}_room_price`] ? "is-invalid" : ""}
              />
            </div>
            {errors[`${room.id}_room_price`] && (
              <div className="invalid-feedback d-block">
                {errors[`${room.id}_room_price`]}
              </div>
            )}
          </div>
        </div>

        <div className="col-md-12 col-lg-6 item">
          <div className="input_wrapper">
            <label htmlFor={`room_image_${room.id}`}>Room Image Link</label>
            <div className="input_items">
              <span>
                <LuLink />
              </span>
              <input
                type="text"
                name={`room_image_${room.id}`}
                id={`room_image_${room.id}`}
                value={room.room_image}
                onChange={(e) => handleInputChange(room.id, 'room_image', e.target.value)}
                placeholder="Share Your Drive Link"
              />
            </div>
            {errors[`${room.id}_room_image`] && (
              <div className="invalid-feedback d-block">
                {errors[`${room.id}_room_image`]}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row first_row">
        <div className="col-md-12 col-lg-6 item">
          <div className="input_wrapper">
            <label htmlFor={`description_${room.id}`}>Room Description</label>
            <div className="input_items">
              <span>
                <LuNotepadText />
              </span>
              <textarea
                name={`description_${room.id}`}
                id={`description_${room.id}`}
                value={room.description}
                onChange={(e) => handleInputChange(room.id, 'description', e.target.value)}
                className={errors[`${room.id}_description`] ? "is-invalid" : ""}
              />
            </div>
            {errors[`${room.id}_description`] && (
              <div className="invalid-feedback d-block">
                {errors[`${room.id}_description`]}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-12 col-lg-6 item">
          <div className="input_wrapper">
            <label htmlFor={`additional_info_${room.id}`}>If you want to provide additional information...</label>
            <div className="input_items">
              <span>
                <LuNotepadText />
              </span>
              <textarea
                name={`additional_info_${room.id}`}
                id={`additional_info_${room.id}`}
                value={room.room_additional_info}
                onChange={(e) => handleInputChange(room.id, 'room_additional_info', e.target.value)}
                className={errors[`${room.id}_room_additional_info`] ? "is-invalid" : ""}
              />
            </div>
            {errors[`${room.id}_room_additional_info`] && (
              <div className="invalid-feedback d-block">
                {errors[`${room.id}_room_additional_info`]}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // console.log("Component render - rooms:", rooms, "loading:", loading, "dataLoaded:", dataLoaded);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "16rem" }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "2rem", height: "2rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3 text-muted">Loading room details...</span>
      </div>
    );
  }

  return (
    <div className="tab-panel">
      <div className="row details-row">
        <div className="title-section">
          <h3>Rooms Details</h3>
        </div>

        {message && (
          <div className="alert alert-success mb-4" role="alert">
            {message}
          </div>
        )}

        {rooms.map((room, index) => renderRoomForm(room, index))}

        <div className="save-btn-2">
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
  );
};

export default RoomDetails;