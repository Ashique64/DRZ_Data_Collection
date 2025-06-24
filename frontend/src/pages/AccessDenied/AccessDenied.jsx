import React from "react";
import { AlertTriangle } from "lucide-react";
import "./AccessDenied.scss";

const AccessDenied = () => {
  return (
    <div id="form">
      <div className="container form-container">
        <div className="row form-row">
          <div className="col-md-12 form-col">
            <div className="access-denied-container">
              <div className="access-denied-item">
                <AlertTriangle
                  style={{ width: "50px", height: "50px", color: "#dc3545" }}
                />
                <h1>Access Denied</h1>
                <p>
                  This form link is either invalid, expired, or has already been
                  used. Please contact the administrator for a new link.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
