import React, { useEffect, useState } from "react";
import "./Home.scss";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import BaseURL from "../../API/BaseURLS";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import useAutoLogout from "../../components/useAutoLogout";

const Home = () => {
  const [clientEmail, setClientEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleSendEmail = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setMessage("No authentication token found. Please login again.");
      setMessageType("error");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
      return;
    }

    // Validate email format more thoroughly
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!clientEmail || !emailRegex.test(clientEmail)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${BaseURL}/api/email/send-invitation/`,
        { email: clientEmail },
        { name: clientName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message || "Invitation sent successfully!");
      setMessageType("success");
      setClientEmail("");
      setClientName("");
    } catch (error) {
      console.error("Email send error:", error);

      // Default error message
      let errorMessage = "Error sending email. Please try again.";

      if (error.response) {
        // Use server-provided error message if available
        errorMessage =
          error.response.data.error ||
          error.response.data.message ||
          errorMessage;

        // Handle specific status codes
        if (error.response.status === 403 || error.response.status === 401) {
          errorMessage = "Session expired. Please login again.";
          clearAuthDataAndRedirect();
        }
      }

      setMessage(errorMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const clearAuthDataAndRedirect = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
  };

  useAutoLogout();
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  return (
    <>
      <NavBar />
      <div className="home">
        <div className="container" data-aos="fade-up">
          <div className="row title-row">
            <div className="col-md-12 title-col">
              <h2>Send mail to your client</h2>
            </div>
          </div>

          <div className="row sent-mail-row">
            <div className="col-md-12 sent-mail-col">
              <div className="row mail-items-row">
                <div className="col-md-6 col-lg-3 col_1">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Your Client Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 col-lg-6 col_1">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Enter Your Client Email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 col-lg-2 col_2">
                  <button className="btn" onClick={handleSendEmail}>
                    {loading ? (
                      <div className="spinner-container">
                        <span className="spinner"></span>
                      </div>
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </div>
              {message && (
                <p
                  className={`mt-3 ${
                    messageType === "success" ? "text-success" : "text-danger"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
