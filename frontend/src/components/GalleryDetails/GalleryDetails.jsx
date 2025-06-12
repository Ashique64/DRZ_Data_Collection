import React from "react";

const GalleryDetails = () => {
  return (
    <div className="tab-panel">
      <div className="row details-row">
        <div className="title-section">
          <h3>Photos & Videos </h3>
        </div>

        <div className="form-section">
          <div className="row first_row">
            <h4 className="mb-3">Upload Images</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="upload_wrapper">
                <label htmlFor="">Primary Images</label>
                <div className="upload_button">
                  <button className="btn">Open</button>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="upload_wrapper">
                <label htmlFor="">Secondary Images</label>
                <div className="upload_button">
                  <button className="btn">Open</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row first_row">
            <h4 className="mb-3 mt-5">Upload Videos</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="upload_wrapper">
                <label htmlFor="">Primary Videos</label>
                <div className="upload_button">
                  <button className="btn">Open</button>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="upload_wrapper">
                <label htmlFor="">Secondary Videos</label>
                <div className="upload_button">
                  <button className="btn">Open</button>
                </div>
              </div>
            </div>
          </div>

          <div className="save-btn mt-5">
            <button className="btn">save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryDetails;
