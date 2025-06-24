import React from "react";

const Overview = () => {
  const propertyDetails = [
    "Property / Business Name",
    "Property Address",
    "Property City",
    "Property State / Province",
    "Zip/Pin/Postal Code",
    "Property Country",
    "Bill To Company / Organization",
    "GST Number",
    "Property Phone Number",
    "Reservation Phone Number",
    "Property Email",
    "Property Website URL",
  ];
  const Gallery = [
    "Primary Images",
    "Secondary Images",
    "Primary Videos",
    "Secondary Videos",
    "Videos Link",
  ];

  const contactDetails = [
    {
      "Operational / Support Related Matters": [
        "Contact Person Name",
        "Designation",
        "Email Address",
        "Mobile Number",
      ],
    },
    {
      "Property Owner / Manager": [
        "Contact Person Name",
        "Designation",
        "Email Address",
        "Mobile Number",
      ],
    },
    {
      "Billing / Invoice Related Matters": [
        "Contact Person Name",
        "Designation",
        "Email Address",
        "Mobile Number",
      ],
    },
  ];

  const websiteDetails = [
    {
      "Web Page informations": [
        "Property Logo",
        "Name of the Website",
        "Content for 'About us' Page",
        "Additional Content",
      ],
    },
    {
      "Domain Related Informations": [
        "Enter URL of your Domain Panel",
        "Password of the Domain",
        "Username of the Domain",
        "Existing Website Link",
      ],
    },
    {
      "Social Media Informations": [
        "Whatsapp",
        "Facebook",
        "Instagram",
        "Twitter",
      ],
    },
  ];

  const chunkSize = Math.ceil(propertyDetails.length / 3);
  const columns = Array.from({ length: 3 }, (_, i) =>
    propertyDetails.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  const galleryChunkSize = Math.ceil(Gallery.length / 3);
  const galleryColumns = Array.from({ length: 3 }, (_, i) =>
    Gallery.slice(i * galleryChunkSize, (i + 1) * galleryChunkSize)
  );

  return (
    <div className="tab-panel">
      <div className="row details-row">
        <div className="title-section">
          <h3>Overview Of Data You Have Filled</h3>
        </div>

        <div className="form-section">
          <div className="row first_row">
            <h4 className="mb-3">Property Details</h4>
            <div className="col-md-12 item">
              <div className="row items_listing_row">
                {columns.map((col, colIndex) => (
                  <div className="col-md-4 items_listing_col" key={colIndex}>
                    <ul>
                      {col.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row first_row">
            <h4 className="mb-3 mt-lg-5 mt-3">Contact Details</h4>
            <div className="col-md-12 item">
              <div className="row items_listing_row">
                {contactDetails.map((section, index) => {
                  const title = Object.keys(section)[0];
                  const items = section[title];

                  return (
                    <div className="col-md-4 items_listing_col" key={index}>
                      <h6 className="mb-2">{title}</h6>
                      <ul>
                        {items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <h4 className="mb-3">Gallery</h4>
            <div className="col-md-12 item">
              <div className="row items_listing_row">
                {galleryColumns.map((col, colIndex) => (
                  <div className="col-md-4 items_listing_col" key={colIndex}>
                    <ul>
                      {col.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row first_row">
            <h4 className="mb-3 mt-lg-5 mt-3">Website Details</h4>
            <div className="col-md-12 item">
              <div className="row items_listing_row">
                {websiteDetails.map((section, index) => {
                  const title = Object.keys(section)[0];
                  const items = section[title];

                  return (
                    <div className="col-md-4 items_listing_col" key={index}>
                      <h6 className="mb-2">{title}</h6>
                      <ul>
                        {items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="terms">
            <input type="checkbox" />
            <p>
              I have read and agreed to the{" "}
              <span className="terms-link">Terms and Conditions</span>
            </p>
          </div>

          <div className="save-btn mt-5">
            <button className="btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
