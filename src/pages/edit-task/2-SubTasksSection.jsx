import React, { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Moment from "react-moment";
 

const SubTasksSection = ({ user, stringId, completedCheckbox, trashIcon,i18n }) => {
  const [value] = useDocument(doc(db, user.uid, stringId));
  const [showAddNewTask, setshowAddNewTask] = useState(false);
  const [subTitle, setsubTitle] = useState("");

  if (value) {
    return (
      <section dir={i18n.language===("ar")?"rtl":null} className="sub-task mtt">
        <div className="parent-time">
          <p className="time">
            {i18n.language===("ar")&&("تم انشائة :")}
            {i18n.language===("en")&&("Created : ")}
            {i18n.language===("fr")&&("Créé : ")}
             <Moment  ago fromNow date={value.data().id} />
          </p>
          <div>
            <input 
              onChange={async (eo) => {
                completedCheckbox(eo);
              }}
              checked={value.data().completed}
              id="checkbox"
              type="checkbox"
            />
            <label htmlFor="checkbox">
              {i18n.language===("ar")&&("مكتمل")}
              {i18n.language===("en")&&("Completed")}
              {i18n.language===("fr")&&("Complété")}
            </label>
          </div>
        </div>

        <ul>
          {value.data().details.map((item) => {
            return (
              <li key={item} className="card-task flex">
                <p> {item} </p>
                <i
                  onClick={() => {
                    trashIcon(item);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
        </ul>

        {showAddNewTask && (
          <form style={{flexDirection: "row"}} className="add-new-task flex">
            <input
              value={subTitle}
              onChange={(eo) => {
                // @ts-ignore
                setsubTitle(eo.target.value);
              }}
              className="add-task"
              type="text"
            />

            <button
              onClick={async (eo) => {
                eo.preventDefault()
                setsubTitle("");
                await updateDoc(doc(db, user.uid, stringId), {
                  details: arrayUnion(subTitle),
                });

              
              }}
              className="add"
            >
              {i18n.language===("ar")&&("أضف")}
              {i18n.language===("en")&&("Add")}
              {i18n.language===("fr")&&("ajouter")}
            </button>

            <button
              onClick={(eo) => {
                eo.preventDefault()
                setshowAddNewTask(false);
              }}
              className="cancel"
            >
              {i18n.language===("ar")&&("تراجع")}
              {i18n.language===("en")&&("Cancel")}
              {i18n.language===("fr")&&("Annuler")}
            </button>
          </form>
        )}

        <div className="center mttt">
          <button
            onClick={() => {
              setshowAddNewTask(true);
            }}
            className="add-more-btn"
          >
            {i18n.language===("ar")&&("أضف المزيد من التفاصيل")}
            {i18n.language===("en")&&("Add more details")}
            {i18n.language===("fr")&&("Ajouter plus de détails")}
             <i style={{margin:"0 5px"}} className="fa-solid fa-plus"></i>
          </button>
        </div>
      </section>
    );
  }
};

export default SubTasksSection;
