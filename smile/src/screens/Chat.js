import React, { useState, useEffect } from 'react';
import socketio from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';


const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin;
  
  
  useEffect(() => {
    const newSocket = socketio('http://localhost:3000');
    setSocket(newSocket);
  
    // Join the user to a unique room based on the user ID
    newSocket.emit('join room', userInfo._id);
  
    newSocket.on('chat message', (msg) => {
      setChatHistory((prevHistory) => [...prevHistory, msg]);
    });
  
    return () => {
      newSocket.disconnect();
    };
  }, []);
  


  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit('chat message', { sender: userInfo.name, message, roomId: userInfo._id });

    setMessage('');
   
  };


    

  return (
    <div className="chat-app">
        <h1 className="ChatTitle">Live Chat</h1>
      <ul className="chat-history">
        {chatHistory.map((message, index) => (
            
          <li key={index}>
            <strong>{message.sender}: </strong>
            {message.message}</li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;