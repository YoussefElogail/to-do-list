import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Erroe404 from "../pages/erroe404";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
 

const Signup = () => {
  const [showLoading, setshowLoading] = useState(false);

  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [userName, setuserName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const { i18n } = useTranslation();

  // Loading    (done)
  // NOT sign-in  (done)
  // sign-in without Email verification   (done)
  // (sign-in && verified email) => navigate(/)    (done)

  useEffect(() => {
    if (user) {
      if (!user.emailVerified||user.emailVerified) {
        navigate("/");
      }
    }
  });
  //
  const signUpBTN = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);
  await  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        sendEmailVerification(auth.currentUser).then(() => {
          //
        });

        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            // ...
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        sethasError(true);

        switch (errorCode) {
          case "auth/invalid-email":
            setfirebaseError(t("WrongEmail-R"));
            break;
            case "auth/email-already-in-use":
            setfirebaseError(t("email-already-in-use"));
            break;

          case "auth/operation-not-allowed":
            setfirebaseError(t("This-step-is-not-allowed"));
            break;

          case "auth/weak-password":
            setfirebaseError(t("weakPassword"));
            break;

          case "auth/too-many-requests":
            setfirebaseError(t("too-many-requests"));
            break;

          default:
            setfirebaseError(t("too-many-requests"));
            break;
        }
      });

    setshowLoading(false);
  };

  if (error) {
    return <Erroe404 />;
  }

  if (loading) {
    return <Loading />;
  }



  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <Header />

        <main>
          <form dir="auto" style={{alignItems:"center",maxWidth:"300px"}}>
            <p style={{ fontSize: "23px", marginBottom: "22px" }}>
              {i18n.language===("ar")&&"انشاء حساب جديد  "}
              {i18n.language===("en")&&"Create a new account "}
              {i18n.language===("fr")&&"Créer un nouveau compte "}
              <span>🧡</span>{" "}
            </p>

            <input style={{width:"100%"}}
              onChange={(eo) => {
                setuserName(eo.target.value);
              }}
              required
              placeholder={t("UserName")}
              type="text"
            />

            <input style={{width:"100%"}}
              onChange={(eo) => {
                setemail(eo.target.value);
              }}
              required
              placeholder={t("E-mail")}
              type="email"
            />

            <input style={{width:"100%"}}
              onChange={(eo) => {
                setpassword(eo.target.value);
              }}
              required
              placeholder={t("Password")}
              type="password"
            />

            <button 
              onClick={(eo) => {
                signUpBTN(eo);
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
                t("Sign-up")
              )}
            </button>
            <p className="account">
              {i18n.language===("ar")&&"بالفعل لديك حساب قم بي "}
              {i18n.language===("en")&&"You already have an account "}
              {i18n.language===("fr")&&"Avez vous déjà un compte "}
              <Link to="/signin">
                 {t("sign-in")}
                 </Link>
            </p>
          </form>
          {hasError && <h6 dir="auto" className="mt">{firebaseError}</h6>}
        </main>
        <Footer />
      </>
    );
  }
};

export default Signup;
