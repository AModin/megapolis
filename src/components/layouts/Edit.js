import * as React from "react";
import { ListContext } from "../../context/ListContext";
import { useParams, useHistory } from "react-router-dom";
import Button from "../kit/Button";

export const Edit = () => {
  const [title, setTitle] = React.useState();
  const [initialTitle, setInitialTitle] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const { state, updateNote } = React.useContext(ListContext);
  const [isErrorShowed, showError] = React.useState(false);
  let history = useHistory();
  let { id } = useParams();
  React.useEffect(() => {
    const noteToEdit = state.list.filter(item => {
      return item.id === parseInt(id, 10);
    });
    if (noteToEdit[0]) {
      setTitle(noteToEdit[0].title);
      setInitialTitle(noteToEdit[0].title);
      setLoading(false);
      return;
    }
    history.push("/");
  }, [id, state, history]);

  const update = async (title, id) => {
    if (title.trim() === "") return showError(true);
    showError(false);
    await updateNote({ title, id });
    history.goBack();
  };

  if (loading) {
    return <div />;
  }

  return (
    <div className="edit-holder">
      <h3>Задача№ {id}</h3>
      <div className="modal-title">Краткое описание</div>
      <input value={title} onChange={e => setTitle(e.currentTarget.value)} />
      <div className="error">
        {isErrorShowed && "Заголовок не может быть пустым"}&nbsp;
      </div>
      <div className="modal-button-holder">
        {initialTitle === title ? (
          <Button onClick={() => history.push("/")}>Назад к списку</Button>
        ) : (
          <Button onClick={() => update(title, id)}>Сохранить</Button>
        )}
      </div>
    </div>
  );
};
