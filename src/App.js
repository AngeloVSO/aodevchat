import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ChatPage from "./pages/ChatPage";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/about">
          </Route>
          <Route path="/users">
          </Route>
          <Route path="/">
            <ChatPage />
          </Route>
        </Switch>
    </Router>
  );
}
