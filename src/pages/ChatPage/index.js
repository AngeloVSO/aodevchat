import React, { useEffect, useState } from "react";
import UsersList from "./UsersList";
import ChatContainer from "./ChatContainer";
import styled from "styled-components";
import { goToLogin } from "../../router";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";

const ChatPage = ({ currentUser }) => {
  const [selectedUser, setSelectedUser] = useState();
  const history = useHistory();
  const [currentUserData, setCurrentUserdata] = useState();

  useEffect(() => {
    if (currentUser) {
      firebase.firestore().collection('users')
      .doc(currentUser.uid).get().then((doc) => {
        setCurrentUserdata(doc.data())
      })
    }
  }, [currentUser])

  useEffect(() => {
    if (!currentUser) {
      goToLogin(history);
    }
  }, [currentUser,history]);

  return (
    <ChatPageArea>
      <UsersList 
        setSelectedUser={setSelectedUser} 
        currentUser={currentUser} 
        currentUserData={currentUserData}
      />
      {selectedUser && (
        <ChatContainer 
          currentUserId={currentUser?.uid} 
          currentUserName={currentUserData?.name} 
          selectedUser={selectedUser} 
        />
      )}
    </ChatPageArea>
  );
};

export default ChatPage;

const ChatPageArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  min-height: 100vh;
`;
