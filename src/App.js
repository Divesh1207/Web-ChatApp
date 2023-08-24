import React, { useState,useRef} from "react";

import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import "./App.css";
import { signOut } from "firebase/auth";
import {auth} from "./firebase-config";
const cookies = new Cookies();


function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("divesh-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef=useRef(null);

  const signUserOut=async ()=>{
    await signOut(auth)
    cookies.remove("divesh-token")
    setIsAuth(false)
    setRoom(null)
  };
  if (!isAuth) {
    return (
      <div>
        <Auth  setIsAuth={setIsAuth}/>
        {/* paasing the value as a props and set cookies true */}
      </div>
    );
  }
  return (
    <>
      {room ? (
      <Chat room={room}/>
      //paasing the value as props so that we know from which rooms it belong to because
      //there were the multiple rooms
      ) : (
          <div className="room">
            <label> Enter Room Name:</label>
            <input ref={roomInputRef} />
            {/* //set room is a function which is initally changes 
            //it states automatically.so we have to change the initial state we have to do this setRoom(e.target.value) */}
         
         
         
            <button onClick={()=>setRoom(roomInputRef.current.value)}>Enter chat</button>
          </div>
        )}

        <div className="sign-out">
          <button onClick={signUserOut}>Sign Out</button>
        </div>
    </>
    );

}


export default App;
