import React from "react";
import "./Home.scss";
import NavBar from "../../components/NavBar/NavBar";

const Home = () => {
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
                    required
                  />
                </div>
                <div className="col-md-6 col-lg-2 col_2">
                  <button className="btn">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
