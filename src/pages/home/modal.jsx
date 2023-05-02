import React from "react";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";
import Modal from "shared/Modal";

const HomeModal = ({
  closeModal,
  titleInput,
  detailsInput,
  addBTN,
  submitBTN,
  taskTitle,
  subTask,
  array,
  showLoading,
}) => {
  const { i18n ,t} = useTranslation();

  return (
    <Modal closeModal={closeModal}>
      <div dir={i18n.language===("ar")?"rtl":null} style={{textAlign:"start"}}  className="model-content">
        <input
          value={taskTitle}
          onChange={(eo) => {
            titleInput(eo);
          }}
          required
          placeholder={t("AddTitle")}
          type="text"
          dir={i18n.language===("ar")?"rtl":null}
        />

        <div>
          <input
            onChange={(eo) => {
              detailsInput(eo);
            }}
            placeholder={t("Details")}
            type="text"
            value={subTask}
            dir={i18n.language===("ar")?"rtl":null}
          />

          <button
          style={{margin:"8px"}}
            onClick={(eo) => {
              addBTN(eo);
            }}
          >
            {i18n.language===("ar")&&"أضف"}
            {i18n.language===("en")&&"Add"}
            {i18n.language===("fr")&&"Ajouter"}
          </button>
        </div>

        <ul>
          {array.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <button
          style={{ marginBottom: "33px" }}
          onClick={async (eo) => {
            submitBTN(eo);
          }}
        >
          {showLoading ? (
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={20}
              width={20}
            />
          ) : (
            t("AddTheTask")
          )}
        </button>
      </div>
    </Modal>
  );
};

export default HomeModal;
