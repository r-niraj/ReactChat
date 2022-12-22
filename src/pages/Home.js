import React, {useState, useEffect}from 'react'
import Sidebar from "../components/Sidebar"
import Chat from "../components/Chat"


function Home() {
  const [mySidebar, showMySidebar]=useState(true);

  useEffect(()=>{
    window.addEventListener('resize',function(){
      window.innerWidth>480?showMySidebar(true):showMySidebar(false);
    })
  },[mySidebar]);
  return (
    <div className="home">
      <div className="container">
      {mySidebar?<Sidebar/>:null}        
        <Chat chkSidebar={()=>showMySidebar(!mySidebar)}/>
      </div>
    </div>
  )
}

export default Home