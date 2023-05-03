
import Header from "./header";
import Footer from "./Footer";
import  './Loading.css';



import React from 'react';
import { Helmet } from "react-helmet-async";
import { t } from "i18next";

const Loading = () => {
  return (
    <div> 
      <Helmet>
            <title>
            {t("Loading")}
            </title>
          </Helmet>
        <Header />

        <main>
          <div className="loading"></div>
        </main>
        <Footer />
      </div>
  );
}

export default Loading;
