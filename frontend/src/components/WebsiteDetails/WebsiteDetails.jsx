import React from "react";
import {
  LuFileText,
  LuGlobe,
  LuLink,
  LuList,
  LuLock,
  LuType,
  LuUser,
} from "react-icons/lu";
import { FaWhatsapp, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const WebsiteDetails = () => {
  return (
    <div className="tab-panel">
      <div className="row details-row">
        <div className="title-section">
          <h3>Website Informations</h3>
        </div>

        <div className="form-section">
          <div className="row first_row">
            <h4 className="mb-5">Web Page informations</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="choose_file_wrapper">
                <label htmlFor="">Property Logo</label>
                <div className="choose_file_items">
                  <input type="file" />
                  <p>
                    Upload high quality logo image. (supported file format -
                    png, jpeg, jpg, svg)
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Name of the Website</label>
                <div className="input_items">
                  <span>
                    <LuType />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Content for "About us" Page</label>
                <div className="input_items">
                  <span>
                    <LuFileText />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Additional Content</label>
                <div className="input_items">
                  <span>
                    <LuList />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <h4 className="my-5">Domain Related Informations</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Enter URL of your Domain Panel</label>
                <div className="input_items">
                  <span>
                    <LuGlobe />
                  </span>
                  <input
                    type="text"
                    placeholder=" Not purchased any domain yet, please write NA"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Password of the Domain</label>
                <div className="input_items">
                  <span>
                    <LuUser />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Username of the Domain</label>
                <div className="input_items">
                  <span>
                    <LuLock />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Existing Website Link</label>
                <div className="input_items">
                  <span>
                    <LuLink />
                  </span>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <h4 className="my-5">Social Media Informations</h4>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Whatsapp</label>
                <div className="input_items">
                  <span>
                    <FaWhatsapp />
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your Whatsapp Number with Country Code"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Facebook</label>
                <div className="input_items">
                  <span>
                    <FaFacebook />
                  </span>
                  <input type="text" placeholder="Enter your Facebook URL" />
                </div>
              </div>
            </div>
          </div>

          <div className="row first_row">
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Instagram</label>
                <div className="input_items">
                  <span>
                    <FaInstagram />
                  </span>
                  <input type="text" placeholder="Enter your Instagram URL" />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 item">
              <div className="input_wrapper">
                <label htmlFor="">Twitter</label>
                <div className="input_items">
                  <span>
                    <FaTwitter />
                  </span>
                  <input type="text" placeholder="Enter your Twitter URL" />
                </div>
              </div>
            </div>
          </div>

          <div className="save-btn">
            <button className="btn">save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetails;
