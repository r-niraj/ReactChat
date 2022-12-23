import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
function Register() {

  const [err,setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        // console.log(res);
        const storageRef = ref(storage, displayName);
        
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
                <input type="text" placeholder='display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password' />
                <input type="file" id="file" style={{display:'none'}}/>
                <label htmlFor="file">
                  <img src={Add} alt="" />
                  <span>Add an avatar</span>
                </label>
                <button>Sign up</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>You do have an account? Login</p>
        </div>
    </div>
  )
}

export default Register