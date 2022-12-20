import React from 'react'
import Sidebar from "../components/Sidebar"
import Chat from "../components/Chat"


function Home() {
  const [mySidebar, showMySidebar]=React.useState(true);
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