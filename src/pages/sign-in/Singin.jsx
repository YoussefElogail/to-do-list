import Header from "../../comp/header";
import Footer from "../../comp/Footer";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import Modal from "shared/Modal";
import ReactLoading from "react-loading";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const Signin = () => {
  const [showLoading, setshowLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [resetPass, setresetPass] = useState("");
  const [password, setpassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [showSendEmail, setshowSendEmail] = useState(false);
  const { i18n } = useTranslation();

  const signInBTN = async (eo) => {
    setshowLoading(true);
    eo.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;

        sethasError(true);

        switch (errorCode) {
          case "auth/operation-not-allowed":
            setfirebaseError(t("This-step-is-not-allowed"));
            break;

          case "auth/invalid-email":
            setfirebaseError(t("Wrong-Email"));
            break;

          case "auth/user-not-found":
            setfirebaseError(t("user-not-found"));
            break;
          case "auth/wrong-password":
            setfirebaseError(t("Wrong-Password"));
            break;

          case "auth/too-many-requests":
            setfirebaseError(t("too-many-requests"));
            break;

          default:
            setfirebaseError(t("Please-check"));
            break;
        }
      });

    setshowLoading(false);
  };

  // LEVEL3
  const [showModal, setshowModal] = useState(false);
  const forgotPassword = () => {
    setshowModal(true);
  };

  const closeModal = () => {
    setshowModal(false);
  };

  return (
    <>
      <Helmet>
        <title>
          {t("sign-in")}
        </title>
      </Helmet>
      <Header />

      <main>
        {showModal && (
          <Modal closeModal={closeModal}>
            <input style={{width:"250px"}}
              onChange={(eo) => {
                setresetPass(eo.target.value);
              }}
              required
              placeholder={t("E-mail")}
            type="email"
            dir={i18n.language === "ar" ? "rtl" : null}
            />
            <button
              onClick={(eo) => {
                eo.preventDefault();

                sendPasswordResetEmail(auth, resetPass)
                  .then(() => {
                    console.log("send email");
                    setshowSendEmail(true);
                  })
                  .catch((error) => {
                    // ..
                  });
                  setTimeout(() => {
                    setshowSendEmail(false)
                  }, 10000);
              }}
            >
              {i18n.language===("ar")&&("إعادة تعيين كلمة المرور")}
              {i18n.language===("en")&&("Reset Password")}
              {i18n.language===("fr")&&("Réinitialiser le mot de passe")}
            </button>
            {showSendEmail && (
              <p className="check-email">
                {i18n.language===("ar")&&"يرجى التحقق من بريدك الإلكتروني لإعادة تعيين كلمة المرور الخاصة بك."}
                {i18n.language===("en")&&"Please check your email to reset your password."}
                {i18n.language===("fr")&&"Veuillez vérifier votre e-mail pour réinitialiser votre mot de passe."}
              </p>
            )}
          </Modal>
        )}

        <form style={{alignItems:"center",maxWidth:"300px"}}>
          <input style={{width:"100%"}}
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
            required
            placeholder={t("E-mail")}
            type="email"
            dir={i18n.language === "ar" ? "rtl" : null}
          />

          <input
          style={{width:"100%"}}
            onChange={(eo) => {
              setpassword(eo.target.value);
            }}
            required
            placeholder={t("Password")}
            type="password"
            dir={i18n.language === "ar" ? "rtl" : null}
          />

          <button
            onClick={(eo) => {
              signInBTN(eo);
            }}
          >
            {showLoading ? (
              <div style={{ justifyContent: "center" }} className="flex">
                <ReactLoading
                  type={"spin"}
                  color={"white"}
                  height={20}
                  width={20}
                />
              </div>
            ) : (
              t("sign-in")
            )}
          </button>
          <p className="account">
            {i18n.language === "ar" && " لا تملك حسابا"}
            {i18n.language === "en" && "Don't hava an account "}
            {i18n.language === "fr" && "Ai pas de compte "}
            <Link to="/signup">
              {i18n.language === "ar" && " قم بأنشاء حساب "}
              {i18n.language === "en" && " create an account"}
              {i18n.language === "fr" && " créer un compte"}
            </Link>
          </p>

          <p
            onClick={() => {
              forgotPassword();
            }}
            className="forgot-pass mt"
          >
            {i18n.language === "ar" && "هل نسيت كلمة المرور ؟"}
            {i18n.language === "en" && "Forgot password ?"}
            {i18n.language === "fr" && "Mot de passe oublié ?"}
          </p>
        </form>
        {hasError && <h6>{firebaseError}</h6>}
      </main>
      <Footer />
    </>
  );
};

export default Signin;
