import React, { useState } from "react";
import UploadModal from "../UploadModal/UploadModal";

const GalleryDetails = () => {
  const [uploadType, setUploadType] = useState("");
  const [currentSection, setCurrentSection] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (type, section) => {
    setUploadType(type);
    setCurrentSection(section);
    setShowModal(true);
  };

  const handleUpload = (files, type, section) => {
    console.log("Uploading", files, "as", type, "in", section);
    // Here you can add your database save logic later
    setShowModal(false);
  };

  return (
    <div className="tab-panel">
      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          onUpload={(files) => handleUpload(files, uploadType, currentSection)}
          maxFiles={uploadType === "images" ? 10 : 3}
          maxSizeMB={uploadType === "images" ? 5 : 30}
          type={uploadType}
          section={currentSection}
        />
      )}
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
                  <button
                    className="btn"
                    onClick={() => handleOpenModal("images", "primary")}
                  >
                    Open
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="upload_wrapper">
                <label htmlFor="">Secondary Images</label>
                <div className="upload_button">
                  <button
                    className="btn"
                    onClick={() => handleOpenModal("images", "secondary")}
                  >
                    Open
                  </button>
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
                  <button
                    className="btn"
                    onClick={() => handleOpenModal("videos", "primary")}
                  >
                    Open
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="upload_wrapper">
                <label htmlFor="">Secondary Videos</label>
                <div className="upload_button">
                  <button
                    className="btn"
                    onClick={() => handleOpenModal("videos", "secondary")}
                  >
                    Open
                  </button>
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
