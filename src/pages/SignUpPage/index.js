import React, { useLayoutEffect, useState } from "react";
import MainArea from "../../components/MainFormArea";
import firebase from "firebase";
import { goToHome } from "../../router";
import { useHistory } from "react-router-dom";

const SignUpPage = ({currentUser}) => {
  const history = useHistory()
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  useLayoutEffect(() => {
      if(currentUser) {
          goToHome(history)
      }
  },[currentUser, history])

  const onChangeName = (e) => {
    setNameValue(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const submitSignup = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailValue, passwordValue)
      .then((data) => {
        return firebase.firestore().collection('users').doc(data.user.uid).set({
          name: nameValue,
        })
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage)
      });
  };

  return (
    <MainArea>
      <h1>Cadastro</h1>
      <form onSubmit={submitSignup}>
        <input type="text" value={nameValue} onChange={onChangeName} placeholder="nome do usuário" />
        <input type="email" value={emailValue} onChange={onChangeEmail}  placeholder="email" />
        <input type="password" value={passwordValue} onChange={onChangePassword} placeholder="senha" />
        <button type="submit">Cadastrar</button>
      </form>
    </MainArea>
  );
};

export default SignUpPage;
