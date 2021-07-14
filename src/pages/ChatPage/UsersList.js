import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase/app";

const UsersList = ({ setSelectedUser, currentUser, currentUserData }) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const ref = firebase.firestore().collection("users")
      ref.onSnapshot(query => {   
        const res = query.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setUsers(res);
      })
    };
    
    getUsers();
  }, []);

  const handleUser = (user) => {
    setSelectedUser(user);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <UserListContainer>
      <div>
        <p>
          {/* solução para mostrar user normal ou user googleAuth */}
          Bem vindo, {currentUserData?.name || currentUser?.displayName}!
          <button onClick={handleLogout}>
            Logout
          </button>
        </p>
      </div>
      <h4>Conversas</h4>
      {users?.filter(user => user.id !== currentUser?.uid)
        .map((user) => {
          return (
            <div key={user.name} onClick={() => handleUser(user)}>
              <p>{user.name}</p>
            </div>
          );
        })}
    </UserListContainer>
  );
};

export default UsersList;

const UserListContainer = styled.div`
  border-right: 1px solid black;
  padding: 0 16px;

  > div {
    :first-of-type {
      height: 60px;
      display: flex;
      align-items: center;
      border-bottom: 2px solid grey;
    }

    :nth-of-type(2n) {
      margin: 8px 0;
    }
  }

  h4 {
    margin-top: 8px;
  }
`;
