import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import defaultPic from "../img/default-avatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate,Link } from "react-router-dom";
function Register() {
  const [err,setErr] = useState(false);
  const [loader,setLoader] = useState(false);
  const [imgAlert,showImgAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{

    e.preventDefault();
    if(document.querySelector('input#file').value.length===0){
      // alert('Please Select Image');
      showImgAlert(true);
      return;
    }
    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];
    
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const storageRef = ref(storage, displayName);
        setLoader(true);
        uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                await updateProfile(res.user,{
                  displayName,
                  photoURL:downloadURL,
                });

                
                await setDoc(doc(db,"users",res.user.uid),{
                  uid:res.user.uid,
                  displayName,
                  email,
                  photoURL:downloadURL,
                });
                await setDoc(doc(db,"userChats",res.user.uid),{});
                setLoader(false);
                navigate("/");
            });
          }
        );
      } catch (err) {
        setErr(true);
      }
  }

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className='logo'>Annon Chat</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Username' required/>
                <input type="email" placeholder='Email' required/>
                <input type="password" placeholder='Password@123' required/>
                <input type="file" id="file"/>
                <label htmlFor="file">
                  <img src={Add} alt="" />
                  <span>Add an avatar</span>
                </label>
                <button>Sign up</button>
                {err && <span>Something went wrong</span>}
            </form>
            {loader&&"Registering..please wait"}
            <p>You do have an account? <Link to="/login">Login</Link></p>
        </div>
        {imgAlert && <div className="ImgAlert">
          <img src={defaultPic} alt="" />
          <p>Please upload your profile picture</p>
          <button id="clsImgPop" onClick={()=>showImgAlert(false)}>Close</button>
        </div>}
    </div>
  )
}

export default Register