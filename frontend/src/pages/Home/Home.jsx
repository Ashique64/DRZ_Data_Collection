import React, { useState } from "react";
import "./Home.scss";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import BaseURL from "../../API/BaseURLS";

const Home = () => {
  const [clientEmail, setClientEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(
        `${BaseURL}/api/email/send-invitation/`,
        {
          email: clientEmail,
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error sending email.");
      console.error(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="home">
        <div className="container">
          <div className="row title-row">
            <div className="col-md-12 title-col">
              <h2>Send mail to your client</h2>
            </div>
          </div>

          <div className="row sent-mail-row">
            <div className="col-md-12 sent-mail-col">
              <div className="row mail-items-row">
                <div className="col-md-6 col-lg-8 col_1">
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
                    Send
                  </button>
                </div>
              </div>
              {message && <p className="text-info mt-3">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
