import * as React from "react";
import Button from "../kit/Button";
import MdClose from "react-ionicons/lib/MdClose";

export const Modal = ({ closeModal, addNote }) => {
  const [title, setTitle] = React.useState("");
  const [isErrorShowed, setError] = React.useState(false);
  const tryToSend = async () => {
    if (title.trim() === "") {
      setError(true);
      return null;
    }
    await addNote(title);
    closeModal();
  };
  return (
    <div className="modal-wrapper">
      <button className="button-icon modal-close" onClick={closeModal}>
        <MdClose />
      </button>
      <div className="modal-title">Краткое описание</div>
      <div className="modal-input-holder">
        <input value={title} onChange={e => setTitle(e.currentTarget.value)} />
      </div>
      <div className="error">
        {isErrorShowed && "Заголовок не может быть пустым"}&nbsp;
      </div>
      <div className="modal-button-holder">
        <Button styleType="success" onClick={e => tryToSend()}>
          Создать
        </Button>
      </div>
    </div>
  );
};
