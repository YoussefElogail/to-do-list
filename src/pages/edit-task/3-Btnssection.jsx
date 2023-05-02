import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";

const Btnssection = ({ user, stringId, deleteBTN ,i18n}) => {
  const [value] = useCollection(collection(db, user.uid));

if (value) {
  return (
    <section className="center mt">
      <div>
        <button
          onClick={() => {
            deleteBTN();
          }}
          className="delete"
        > 
          {i18n.language===("ar")&&("حذف المهمة")}
          {i18n.language===("en")&&("Delete Task")}
          {i18n.language===("fr")&&("Supprimer la tâche")}
        </button>
      </div>
    </section>
  );
}
};

export default Btnssection;
