import * as React from "react";

const initialState = {
  list: []
};

function reducer(state, action) {
  switch (action.type) {
    case "addNote":
      return { list: [...state.list, action.payload] };
    case "removeNote":
      const updatedList = state.list.filter(item => {
        return item.id !== action.payload;
      });
      return { list: [...updatedList] };
    case "updateNote":
      const upadtedList = state.list.map(item => {
        if (item.id === action.payload.id) {
          return {
            id: item.id,
            title: action.payload.title
          };
        }
        return item;
      });
      return { list: [...upadtedList] };
    case "getAllNotes":
      return { list: action.payload };
    default:
      throw new Error();
  }
}

const ListContext = React.createContext();

const ListContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const getNotesList = React.useCallback(async () => {
    const response = await fetch("https://test.megapolis-it.ru/api/list").then(
      res => res.json()
    );
    const { data } = response;
    dispatch({
      type: "getAllNotes",
      payload: data
    });
  }, []);

  const addNote = React.useCallback(async title => {
    const response = await fetch("https://test.megapolis-it.ru/api/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title
      })
    }).then(res => res.json());
    const { id } = response;
    dispatch({
      type: "addNote",
      payload: {
        id: id,
        title: title
      }
    });
    return;
  }, []);

  const updateNote = React.useCallback(async ({ title, id }) => {
    await fetch(`https://test.megapolis-it.ru/api/list/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        title: title
      })
    });
    dispatch({
      type: "updateNote",
      payload: {
        id,
        title
      }
    });
  }, []);

  const removeNote = React.useCallback(async id => {
    await fetch(`https://test.megapolis-it.ru/api/list/${id}`, {
      method: "DELETE"
    });
    dispatch({
      type: "removeNote",
      payload: id
    });
  }, []);

  return (
    <ListContext.Provider
      value={{ state, getNotesList, addNote, removeNote, updateNote }}
    >
      {children}
    </ListContext.Provider>
  );
};

export { ListContext, ListContextProvider };
