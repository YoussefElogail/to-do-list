import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();

  const [user] = useAuthState(auth);
  const [showMenu, setShowMenu] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="myheader">
      <header dir="auto" className="hide-when-mobile ali ">
        <h1>
          <Link to="/">
            {" "}
            {i18n.language === "ar" && "قائمة المهام"}
            {i18n.language === "en" && "To do list"}
            {i18n.language === "fr" && "liste de choses à faire"}
          </Link>
        </h1>

        <div className="show-larg">
          <i
            onClick={() => {
              toggleTheme(theme === "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-moon"
          ></i>
          <i
            onClick={() => {
              toggleTheme(theme === "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-sun"
          ></i>
        </div>


          <nav style={{display : showMenu ? "block":"none"}} className="parint-of-links">
            <div className="toggle-theme">
              <i
                onClick={() => {
                  toggleTheme(theme === "Light" ? "Dark" : "Light");
                }}
                className="fa-solid fa-moon"
              ></i>
              <i
                onClick={() => {
                  toggleTheme(theme === "Light" ? "Dark" : "Light");
                }}
                className="fa-solid fa-sun"
              ></i>
            </div>
            <ul className="flex">
              {!user && (
                <li className="main-list">
                  <NavLink className="main-link" to="/signin">
                    {i18n.language===("ar")&&("تسجيل الدخول")}
                    {i18n.language===("en")&&("Sign-in")}
                    {i18n.language===("fr")&&("S'identifier")}
                    
                  </NavLink>
                </li>
              )}

              {!user && (
                <li className="main-list">
                  <NavLink className="main-link" to="/signup">
                    {i18n.language===("ar")&&("انشاء حساب")}
                    {i18n.language===("en")&&("Sign-up")}
                    {i18n.language===("fr")&&("S'inscrire")}
                  </NavLink>
                </li>
              )}

              {user && (
                <li
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        console.log("Sign-out successful.");
                      })
                      .catch((error) => {
                        // An error happened.
                      });
                  }}
                  className="main-list"
                >
                  <button className="main-link signout">{t("signout")}</button>
                </li>
              )}

          

              {user && (
                <li className="main-list">
                  <NavLink className="main-link" to="/profile">
                    {t("account")}
                  </NavLink>
                </li>
              )}
              <li className="main-list lang flex">
                {t("lang")}  <div className="arow-lang">&#10094;</div>
                <ul style={{display: showLang ?"block":"none"}} className="lang-box">
                  
                  <li
                    onClick={() => {
                      i18n.changeLanguage("ar");
                    }}
                    dir="rtl"
                  >
                    <p> العربية</p>
                    {i18n.language === "ar" && (
                      <i className="fa-solid fa-check"></i>
                    )}
                  </li>

                  <li
                    onClick={() => {
                      i18n.changeLanguage("en");
                    }}
                  >
                    <p>English</p>

                    {i18n.language === "en" && (
                      <i className="fa-solid fa-check"></i>
                    )}
                  </li>
                  <li
                    onClick={() => {
                      i18n.changeLanguage("fr");
                    }}
                  >
                    <p>French</p>

                    {i18n.language === "fr" && (
                      <i className="fa-solid fa-check"></i>
                    )}
                  </li>
                </ul>{" "}
                <i style={{display:showLang?"none":"block"}} onClick={() => {
                  setShowLang(true)
                }}  className="fa-solid fa-plus"></i>
                <i style={{display:showLang?"block":"none"}} onClick={() => {
                  setShowLang(false)
                }} className="fa-solid fa-xmark"></i>
              </li>
            </ul>
          </nav>
        
        <i
          style={{ display: showMenu ? "none" : "block", fontSize: "18px" }}
          onClick={() => {
            setShowMenu(true);
          }}
          className="fa-solid fa-bars"
        ></i>
        <i
          style={{ display: showMenu ? "block" : "none", fontSize: "18px" }}
          onClick={() => {
            setShowMenu(false);
          }}
          className="fa-solid fa-xmark"
        ></i>
      </header>
    </div>
  );
};

export default Header;
