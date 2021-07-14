import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import firebase from "firebase";

export default function App() {
  const [currentUser, setCurrentUser] = useState()
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
      setAuthLoading(false)
    })
  }, [])

  return (
    <Router>
        {!authLoading && 
        <Switch>
          <Route path="/login">
            <LoginPage currentUser={currentUser}/>
          </Route>
          
          <Route path="/signup">
            <SignUpPage currentUser={currentUser}/>
          </Route>
        
          <Route path="/">
            <ChatPage currentUser={currentUser}/>
          </Route>
        </Switch>}
    </Router>
  );
}
