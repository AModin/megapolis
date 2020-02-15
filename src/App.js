import React from "react";
import "./styles.css";
import { List } from "./components/layouts/List";
import { ListContextProvider } from "./context/ListContext";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Edit } from "./components/layouts/Edit";

export default function App() {
  return (
    <div className="App">
      <ListContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact>
              <List />
            </Route>
            <Route path="/:id">
              <Edit />
            </Route>
          </Switch>
        </Router>
      </ListContextProvider>
    </div>
  );
}
