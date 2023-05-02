import React from "react";
import "./Footer.css";

import { useTranslation } from "react-i18next";

const Footer = () => {
  const {  i18n } = useTranslation();


    return (
      <div className="myfooter">
        <footer dir="auto" className="ali">
          {i18n.language===("ar")&&" تصميم و تطوير "}
          {i18n.language===("en")&&" Designed and developed by "}
          {i18n.language===("fr")&&" Conçu et développé par "}
          <a  className="my-site" rel="noopener noreferrer" target="_blank" href="https://youssef-elogail.firebaseapp.com/">
          Youssef El Ogail
          </a>
          <span>
            <i style={{margin:"0 5px"}} className="fa-solid fa-heart"></i>{" "}
          </span>
        </footer>
      </div>
    );





};

export default Footer;
