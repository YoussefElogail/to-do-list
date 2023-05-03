import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";

import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
// Level 3
import "./Home.css";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import HomeModal from "./modal";
import AllTasksSection from "./AllTasksSection";
import { useTranslation } from "react-i18next";
import Snackbar from "shared/Snackbar";
import { t } from "i18next";

const Home = () => {
  const { i18n } = useTranslation();
  const [user, loading, error] = useAuthState(auth);


  // ===============================
  //    FUNCTIONS of Modal
  // ===============================
  const [showModal, setshowModal] = useState(false);
  const [showLoading, setshowLoading] = useState(false);
  const [showMessage, setshowMessage] = useState(false);
  const [taskTitle, settitle] = useState("");
  const [array, setarray] = useState([]);
  const [subTask, setsubTask] = useState("");
  const [sendMasdg, setSendMasdg] = useState("Send email again");

  const closeModal = () => {
    setshowModal(false);
    settitle("");
    setarray([]);
  };

  const titleInput = (eo) => {
    settitle(eo.target.value);
  };

  const detailsInput = (eo) => {
    setsubTask(eo.target.value);
  };

  const addBTN = (eo) => {
    eo.preventDefault();

    if (!array.includes(subTask)) {
      array.push(subTask);
    }
    setsubTask("");
  };

  const submitBTN = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);
    const taskId = new Date().getTime();
    if (taskTitle.length>0) {
      await setDoc(doc(db, user.uid, `${taskId}`), {
        title: taskTitle,
        details: array,
        id: taskId,
        completed: false,
      });
      setshowMessage(true);
    }
    setshowLoading(false);
    settitle("");
    setarray([]);

    setshowModal(false);
    

    setTimeout(() => {
      setshowMessage(false);
    }, 4000);
  };
  const sendAgain =  () => {
    sendEmailVerification(auth.currentUser).then(() => {
      setSendMasdg("has been sent")
      setTimeout(() => {
        setSendMasdg("Send email again")
      }, 3000);
      // ...
    });
    
  };

  if (error) {
    return <h1>Error : {error.message}</h1>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>
          {t("home")}
          </title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
        </Helmet>

        <Header />

        <main>
          <h1 style={{ fontSize: "28px" }}>
            {i18n.language===("ar")&&("مرحبًا بك في موقع قائمة المهام")}
            {i18n.language===("en")&&("Welcome to the To Do List website")}
            {i18n.language===("fr")&&("Bienvenue sur le site de la liste des choses à faire")}
            <span></span>{" "}
          </h1>
          <p className="pls">
            {i18n.language===("ar")&&("  من فضلك")}
            {i18n.language===("en")&&("Please ")}
            {i18n.language===("fr")&&("S'il te plaît ")}
            <Link style={{ fontSize: "30px" }} to="/signin">
              {i18n.language===("ar")&&("  قم بتسجيل الدخول  ")}
              {i18n.language===("en")&&("sign in")}
              {i18n.language===("fr")&&("s'identifier")}
            </Link>{" "}
            {i18n.language===("ar")&&( "للمتابعة")}
            {i18n.language===("en")&&("to continue...")}
            {i18n.language===("fr")&&("continuer...")}
        
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>
            {t("home")}
            </title>
            <meta name="description" content="HOME Page" />
            <meta http-equiv="refresh" content="30" />
          </Helmet>

          <Header />

          <main dir="auto">
            <p>
          
              {i18n.language===("ar")&&("مرحباً")}
              {i18n.language===("en")&&("Welcome")}
              {i18n.language===("fr")&&("Bienvenu")}
              : {user.displayName}
              
                <i style={{margin:"0 5px"}} className="fa-solid fa-heart"></i>{" "}
              
            </p>

            <p>
              {i18n.language===("ar")&&("يرجى التحقق من بريدك الإلكتروني للمتابعة ✋")} 
              {i18n.language===("en")&&("Please verify your email to continue ✋")} 
              {i18n.language===("fr")&&("Veuillez vérifier votre e-mail pour continuer ✋")} 
            </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete"
            >
              {i18n.language===("ar")&&(sendMasdg==="Send email again"?"أرسل رسالة التأكيد مرة أخرى":null)}
              {i18n.language===("ar")&&(sendMasdg==="has been sent"?"تم الارسال":null)}
              {i18n.language===("en")&&sendMasdg}
              {i18n.language===("fr")&&sendMasdg==="Send email again"?"Envoyer à nouveau l'e-mail":null}
              {i18n.language===("en")&&sendMasdg==="has been sent"?"a été envoyé":null}
            </button>
          </main>

          <Footer />
        </>
      );
    }

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>
            {t("home")}
            </title>
          </Helmet>

          <Header />

          <main className="home">
            {/* SHOW all tasks */}
            <AllTasksSection user={user} />

            {/* Add new task BTN */}
            <section className="mt">
              <button
                dir="auto"
                onClick={() => {
                  setshowModal(true);
                }}
                className="add-task-btn"
              >
                {i18n.language === "en" && "Add new task"}
                {i18n.language === "ar" && "أضف مهمة جديدة"}
                {i18n.language === "fr" && "Ajouter une nouvelle tâche"}

                <i className="fa-solid fa-plus"></i>
              </button>
            </section>

            {showModal && (
              <HomeModal
                closeModal={closeModal}
                titleInput={titleInput}
                detailsInput={detailsInput}
                addBTN={addBTN}
                submitBTN={submitBTN}
                taskTitle={taskTitle}
                subTask={subTask}
                array={array}
                showLoading={showLoading}
              />
            )}

            <Snackbar showMessage={showMessage} i18n={i18n} />
          </main>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
