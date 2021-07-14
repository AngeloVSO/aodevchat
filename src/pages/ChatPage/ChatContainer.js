import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import firebase from "firebase/app";

const mountChatId = (id1, id2) => {
  if (id1 > id2) {
    return `${id1}-${id2}`
  } else {
    return `${id2}-${id1}`
  }
}

const ChatContainer = ({ selectedUser, currentUserId, currentUserName }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const fileInputRef = useRef()

  useEffect(() => {
    const getMessages = async () => {
      const chatId = mountChatId(currentUserId, selectedUser.id)

      const ref = firebase.firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      
      ref.onSnapshot(querySnapShot => {
        const res = querySnapShot.docs.map(doc => {
          return doc.data();
        });
        setMessages(res)
      })
    };

    getMessages()
  }, [currentUserId,selectedUser]);

  const onChangeNewMessage = (e) => {
    setNewMessage(e.target.value)
  }

  const uploadFile = async () => {
    const file = fileInputRef.current.files[0]
    if (file) {
      const storageRef = firebase.storage().ref()
    
      const newFileRef = storageRef.child(file.name) 
  
      await newFileRef.put(file)

      return newFileRef.getDownloadURL()
    }
    return null
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    const chatId = mountChatId(currentUserId, selectedUser.id)

    const fileURL = await uploadFile()

    const ref = firebase.firestore()
    .collection('chats').doc(chatId).collection('messages')

    ref.add({
      createdAt: new Date(),
      text: newMessage,
      userName: currentUserName,
      image: fileURL
    })

    setNewMessage('')
  }

  return (
    <ChatArea>
      <Header>Conversando com {selectedUser.name}</Header>
      <Messages>
        {messages?.map(message => {
            return (
              <div key={message.createdAt}>
                <p>
                  {message.userName} - {message.text}
                  {message.image && <MessageImg src={message.image} alt="Foto enviado pelo usário"/>}
                </p>
              </div>)
        })}
      </Messages>
      <MessageInput onSubmit={sendMessage}>
        <input placeholder="nova mensagem" value={newMessage} onChange={onChangeNewMessage} />
        <input type='file' ref={fileInputRef}/>
        <button>enviar</button>
      </MessageInput>
    </ChatArea>
  );
};

export default ChatContainer;

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 60px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  padding-left: 16px;
`;
const Messages = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  padding-left: 16px;

  p {
    margin: 8px 0;
  }
`;
const MessageInput = styled.form`
  height: 70px;
  display: flex;
  padding: 8px;

  input {
    flex: 1;
    padding: 8px;
    font-size: 20px;
  }
`;

const MessageImg = styled.img`
max-width: 350px;
height: auto;
`
