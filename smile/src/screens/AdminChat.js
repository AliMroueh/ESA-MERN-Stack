/*import React, { useState, useEffect } from 'react';
import socketio from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';

const AdminChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatUserId, setCurrentChatUserId] = useState(null);
  const [displayChatHistory, setDisplayChatHistory] = useState(false);

  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin;

  useEffect(() => {
    const newSocket = socketio('http://localhost:3000');
    setSocket(newSocket);

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
    socket.emit('chat message', { sender: "Server", message, roomId: userInfo._id });
    setChatHistory((prevHistory) => [...prevHistory, { sender: "You", message }]);
    setMessage('');
  };

  const handleChatUserClick = (userId) => {
    setCurrentChatUserId(userId);
    setDisplayChatHistory(true);
  };

  const handleBackButtonClick = () => {
    setCurrentChatUserId(null);
    setDisplayChatHistory(false);
  };

  return (
    <div>
      <div className="Adminchat-app">
        <h1 className="AdminChatTitle">Live Chat</h1>
        {displayChatHistory ? (
          <div>
            <button onClick={handleBackButtonClick}>Back</button>
            <ul className="Adminchat-history">
              {chatHistory.map((message, index) => {
                if (message.sender === userInfo._id || message.roomId === userInfo._id) {
                  return (
                    <li key={index}>
                      <strong>{message.sender === "Server" ? "You" : message.sender}: </strong>
                      {message.message}
                    </li>
                  );
                } else {
                  return null;
                }
              })}

            </ul>
            <form onSubmit={handleSendMessage}>
              <input type="text" value={message} onChange={handleMessageChange} />
              <button type="submit">Send</button>
            </form>
          </div>
        ) : (
          <ul className="contact-list">
            {chatHistory.map((msg, indx) => (
              <li key={indx} className="contact" onClick={() => handleChatUserClick(msg.sender)}>
                <img className="ClientImg" src="../images/pf.jpg" alt="Avatar" />
                <div className="details">
                  <div className="ClientName">{msg.sender}</div>
                  <div className="message-preview">{msg.message}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminChatPage;*/
