import React from "react";
import { Helmet } from "react-helmet-async";

const Snackbar = ({ showMessage,i18n }) => {
  return (
    <div>
      <Helmet>
        <style type="text/css">{`
            
            .home .show-message {
              background-color: whitesmoke;
              font-size: 18px;
              color: #1b1b1b;
              padding: 8px 12px;
              font-weight: normal;
              border-radius: 5px;
              position: fixed;
              top: 100px;
              transition: 1s;
            }
            .home .fa-circle-check {
              color: rgb(30, 200, 200);
              margin: 0 5px;
            }
            
            `}</style>
      </Helmet>

      <p dir="auto"
        style={{
          right: showMessage ? "20px" : "-200vw",
        }}
        className="show-message"
      >
        {i18n.language===("ar")&&"تمت إضافة المهمة بنجاح"}
        {i18n.language===("en")&&"Task added successfully"}
        {i18n.language===("fr")&&"Tâche ajoutée avec succès"}
         <i className="fa-regular fa-circle-check"></i>
      </p>
    </div>
  );
};

export default Snackbar;
