import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/Loading";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import Moment from "react-moment";
import { deleteUser } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const { i18n } = useTranslation();












  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }

    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

  const DeleteBTN = () => {
    deleteUser(user)
      .then(() => {
        //
        console.log("User deleted.");
      })
      .catch((error) => {
        // An error ocurred
        console.log(error.message);
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Helmet>
          <title>
            {t("account")}
          </title>

          <style type="text/css">{` 
        main{
          flex-direction: column;
          align-items: flex-start;
  
    width: fit-content;
    margin: auto;
        }


        
        `}</style>
        </Helmet>
        <Header />

        <main dir="auto">
          <h6>
            {t("E-mail")}
            {user.email}
            </h6>
          <h6>
            {t("UserName")} 
            {user.displayName}
            </h6>

          <h6>
            {i18n.language===("ar")&&"آخر تسجيل دخول : "}
            {i18n.language===("en")&&"Last Sign-in : "}
            {i18n.language===("fr")&&"Dernière connexion : "}
            {" "}
            <Moment ago fromNow date={user.metadata.lastSignInTime} />{" "}
          </h6>

          <h6>
            {i18n.language===("ar")&&"تم إنشاء الحساب : "}
            {i18n.language===("en")&&"Account Created : "}
            {i18n.language===("fr")&&"Compte créé : "}
            <Moment ago fromNow date={user.metadata.creationTime} />
          </h6>
          <button
            onClick={() => {
              DeleteBTN();
            }}
            className="delete"
          >
            {i18n.language===("ar")&&"حذف الحساب"}
            {i18n.language===("en")&&"Delete account"}
            {i18n.language===("fr")&&"Supprimer le compte"}
          </button>
        </main>
        <Footer />
      </>
    );
  }
};

export default Profile;

 
