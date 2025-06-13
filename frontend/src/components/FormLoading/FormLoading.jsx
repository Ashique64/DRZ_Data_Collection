import React from "react";

const FormLoading = () => {
  return (
    <div id="form">
      <div className="container form-container">
        <div className="row form-row">
          <div className="col-md-12 form-col">
            <div
              className="loading-container"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
                flexDirection: "column",
                width:"100%"
              }}
            >
              <div
                className="spinner"
                style={{
                  width: "40px",
                  height: "40px",
                  border: "4px solid #f3f3f3",
                  borderTop: "4px solid #3498db",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginBottom: "20px",
                }}
              ></div>
              <div style={{ fontSize: "18px", color: "#666" }}>
                Verifying access...
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
    </div>
  );
};

export default FormLoading;
