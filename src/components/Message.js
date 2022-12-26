import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
    let timeNowInSecs = new Date().getTime() / 1000;
    let msgMins= Number(Math.floor((timeNowInSecs-message.date.seconds)/60));
    let dayValue="mins";
    if(msgMins>=1440){
        msgMins= Math.floor(msgMins/1440);
        dayValue="days";
    }else if(msgMins>=60){
      msgMins= Math.floor(msgMins/60);
      dayValue="hrs";
    }

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{`${msgMins} ${dayValue} ago`}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
