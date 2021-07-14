import React, { useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MainArea from "../../components/MainFormArea";
import { goToHome, goToSignup } from "../../router";
import firebase from "firebase";

const LoginPage = ({currentUser}) => {
  const history = useHistory();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  useLayoutEffect(() => {
    if(currentUser) {
        goToHome(history)
    }
  },[currentUser,history])

  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(emailValue, passwordValue)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage)
      });
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then((data) => {
      console.log('deu bom', data)

      //solução para criar user com login do google
      const docRef = firebase.firestore().collection("users")
      .doc(data.user.uid);

      docRef.get().then(doc=> {
          if (!doc.exists) {
            return firebase.firestore().collection('users').doc(data.user.uid).set({
              name: data.user.displayName,
            })
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });


    }).catch((err) => {
      console.log('deu merda', err)
    })
  }

  return (
    <MainArea>
      <h1>Login</h1>
      <form onSubmit={submitLogin}>
        <input
          value={emailValue}
          onChange={onChangeEmail}
          type="email"
          placeholder="email"
        />
        <input
          value={passwordValue}
          onChange={onChangePassword}
          type="password"
          placeholder="password"
        />
        <button type="submit">Login</button>
        <button onClick={() => goToSignup(history)}>Cadastro</button>
        <button type='button' onClick={loginWithGoogle}>Login com Google</button>
      </form>
    </MainArea>
  );
};

export default LoginPage;
