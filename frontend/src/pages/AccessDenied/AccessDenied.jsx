import React from "react";
import { AlertTriangle } from "lucide-react";

const AccessDenied = () => {
  return (
    <div id="form">
      <div className="container form-container">
        <div className="row form-row">
          <div className="col-md-12 form-col">
            <div
              className="access-denied-container"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
                flexDirection: "column",
                textAlign: "center",
                padding: "40px 20px",
                width: "100%",
              }}
            >
              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                  borderRadius: "8px",
                  padding: "40px",
                  maxWidth: "500px",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <AlertTriangle
                  style={{ width: "50px", height: "50px", color: "#dc3545" }}
                />
                <h1
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#dc3545",
                    marginBottom: "20px",
                  }}
                >
                  Access Denied
                </h1>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#6c757d",
                    lineHeight: "1.5",
                    margin: "0",
                  }}
                >
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
