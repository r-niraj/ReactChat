import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [userAlert, showUserAlert] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  
  const handleSend = async () => {
    if(data.user.displayName===undefined){
      showUserAlert(true);
      return;
    }
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                img: downloadURL,
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const sendByEntr = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  }
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Select user and type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={sendByEntr}
        />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="Imagefile"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="Imagefile">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend} id="sndMsg">Send</button>
      </div>
      {userAlert && <div className="userSlctAlert">
          <p>Please select a user to chat with</p>
          <button id="clsImgPop" onClick={()=>showUserAlert(false)}>Close</button>
        </div>}
    </div>
  );
};

export default Input;
