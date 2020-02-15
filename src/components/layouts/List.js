import * as React from "react";
import { ListContext } from "../../context/ListContext";
import Button from "../kit/Button";
import { Modal } from "./Modal";
import { useHistory } from "react-router-dom";
import MdCreate from "react-ionicons/lib/MdCreate";
import MdTrash from "react-ionicons/lib/MdTrash";
import ReactDOM from "react-dom";

export const List = ({ setViewType }) => {
  const { getNotesList, addNote, state, removeNote } = React.useContext(
    ListContext
  );
  let history = useHistory();
  const [isModalShowed, toggleModal] = React.useState(false);
  React.useEffect(() => {
    getNotesList();
  }, [getNotesList]);
  return (
    <>
      <div className="header">
        <h3>Список задач</h3>
        <div onClick={() => toggleModal(!isModalShowed)}>
          <Button styleType="success">Добавить</Button>
        </div>
      </div>
      {(state?.list?.length &&
        state.list.map((item, index) => {
          return (
            <div className="list-wrapper" key={item.id}>
              <div className="list-item_1">Задача № {index + item.id}</div>
              <div className="list-item_2">{item.title}</div>
              <div className="list-item_3">
                <button
                  className="button-icon"
                  onClick={() => history.push(`/${item.id}`)}
                >
                  <MdCreate color="#666666" />
                </button>
                <button
                  className="button-icon"
                  onClick={() => removeNote(item.id)}
                >
                  <MdTrash color="#F4583F" />
                </button>
              </div>
            </div>
          );
        })) || <div />}
      {isModalShowed &&
        ReactDOM.createPortal(
          <div className="modal-holder">
            <Modal closeModal={() => toggleModal(false)} addNote={addNote} />
          </div>,
          document.body
        )}
    </>
  );
};
