import { useState } from 'react';
import './App.css';
import io from "socket.io-client";
import Chat from './Chat';

const socket=io.connect("http://localhost:3001");

function App() {
   
  const[username,setUsername]=useState("");
  const[room,setRoom]=useState("");
  const[showchat,setShowchat]=useState(false);

  const joinRoom = () =>{
    if(username!=="" && room!=="" )
    {
      socket.emit("join_room",room);
    setShowchat(true);
  }
  };

  return (
    <div className="App">
      {!showchat ?
      (<div className='joinChatContainer'>
      <h3>JOIN A CHAT</h3>
      <input type="text" placeholder='Arsh...' onChange={(e)=>{
        setUsername(e.target.value)
      }}></input>
      <input type="text" placeholder='Room ID'  onChange={(e)=>{
        setRoom(e.target.value)
      }}></input>
      <button onClick={joinRoom}>JOIN THE ROOM</button>
      </div>)
        :(
      <Chat socket={socket} username={username} room={room}/>
        )
    }
    </div>

  );
}

export default App;
