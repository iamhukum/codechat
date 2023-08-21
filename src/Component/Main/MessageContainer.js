import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RiAttachment2 } from "react-icons/ri";
import { MdSend } from "react-icons/md";
import { conversation } from "../../data/conversation";
import { users } from "../../data/users";
import "./messageContainer.scss";
import Avatar from "../Avatar/Avatar";


function Message() {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [conversations, setconversations] = useState([]);
  const [inputValue, setinputValue] = useState("");
  const [my_message, setmy_message] = useState([]);
  const [isSubmit , setisSubmit] = useState(false);
  const [localStorageMessage, setlocalStorageMessage] = useState([]);
  
  // set conversation
  useEffect(() => {
     setconversations(conversation.filter((data) => data.userid === userId));
     setUser(users.filter((data) => data.id === userId));
  }, [userId]);
 

  // handleSubmit
  useEffect(() => {
     if(my_message.length > 0) {
        localStorage.setItem('messages' , JSON.stringify(my_message));
     }
  },[isSubmit ,my_message]);

  function handleSubmit(e) {
      e.preventDefault();
      // creating obj
      let data = {};
      data.id = userId;
      data.text = inputValue;
      data.img_url = "https://cdn-icons-png.flaticon.com/512/4825/4825062.png";
      setmy_message([...my_message , data]);

      // reset input value
      setinputValue("");
      setisSubmit(!isSubmit);

      setlocalStorageMessage(JSON.parse(localStorage.getItem('messages')));
  }

    // get Mesages form localStorage
    useEffect(() => {
      let localMessage = JSON.parse(localStorage.getItem('messages'));
      if(localMessage != null) {
        setlocalStorageMessage(localMessage.filter(msg => msg.id === userId));
      }
    },[userId , isSubmit]);
  
  
  function SetChats() {
   return conversations.map((data) => {
      return data.Chats.map((chat , idx) => {
         return (
            <React.Fragment key={idx}>
            <div className="frd_message">
              <ul>
                {
                  chat.friend_message.map(({ img_url, content } , idx) => (
                    <li className="message-wrapper left" key={idx}>
                      {img_url && <Avatar img_url={img_url} size="20" />}
                      <div className="left-message">
                        <p>{content}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="my_message">
              <ul>
                {
                  chat.my_message.map(({ img_url, content } , idx) => (
                    <li className="message-wrapper right" key={idx}>
                      <div className="right-message">
                        <p>{content}</p>
                      </div>
                      {img_url && <Avatar img_url={img_url} size="20" />}
                    </li>
                ))}
                {
                  localStorageMessage ? localStorageMessage.map((msg , idx) => (
                    <li className="message-wrapper right" key={idx}>
                    <div className="right-message">
                      <p>{msg.text}</p>
                    </div>
                    {msg.img_url && <Avatar img_url={msg.img_url} size="20" />}
                  </li>
                  )) : my_message.map((msg , idx) => (
                    <li className="message-wrapper right" key={idx}>
                    <div className="right-message">
                      <p>{msg.text}</p>
                    </div>
                    {msg.img_url && <Avatar img_url={msg.img_url} size="20" />}
                  </li>
                  ))
                }
              </ul>
            </div>
            </React.Fragment>
         )
      });
    });
  }


  return (
    <main>
      <header className="main-header">
        {user[0] && (
          <React.Fragment>
            {user[0].img_url && <Avatar img_url={user[0].img_url} size="30" />}
            <p className="name">{user[0].name}</p>
          </React.Fragment>
        )}
      </header>
      <div className="message-container">
       {SetChats()}
      </div>
      <footer>
        <div className="input-wrapper">
          <form type="submit" onSubmit={handleSubmit}>
            <span className="input-attachment-logo">
              <RiAttachment2 />
            </span>
            <input
              type="text"
              className="input-box"
              placeholder="Enter message here..."
              onChange={(e) => setinputValue(e.target.value)}
              value={inputValue}
            />
            <button type="submit">
              <MdSend className="send-icon"/>
            </button>
          </form>
        </div>
      </footer>
    </main>
  );
}

export default Message;
