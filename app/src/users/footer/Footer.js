import React from "react";
import logo from "./logo.png"

function Footer() {
  return (

    <footer className="footer-distributed">

      <div className="footer-left">

        <img className="footer-logo" src={logo} alt="logo" />

        <p className="footer-links">

        </p>


      </div>

      <div className="footer-center">

        <div>
          <i className="fa fa-map-marker"></i>
          <p>54 Nguyen Luong Bang, Danang VietNam</p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+84 0924299026</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p><a href="mailto:support@company.com">support@kamehouse.com</a></p>
        </div>

      </div>

      <div className="footer-right">

        <p className="footer-company-about">
          <p>About us</p>
          The website of garages colection.
        </p>

        <div className="footer-icons">

        </div>

      </div>
      <div className="footer-company-name">Kamehouse © 2021</div>

    </footer>
  );
}

export default Footer;
