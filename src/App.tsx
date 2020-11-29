import React, {useEffect, useState} from 'react';
import './App.css';
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
const socket = io("http://localhost:3009/");
// const socket = io("https://chat-back-io.herokuapp.com/");

type MessageType = {
    id: string;
    name: string;
    userId: string;
    message: string;
}

function App() {

    const [messages, setMessages] = useState<MessageType[]>([]);
    const [message, setMessage] = useState("Hello");
    const [name, setName] = useState("Nastya");

    useEffect(()=>{
        socket.on("init-messages-published", (messages:MessageType[])=>{
            setMessages(messages);
        })
        socket.on("new-message-sent", (message: MessageType)=>{
            setMessages(messages=>[...messages, message]);
        })
    },[])

    return (
        <div className="App">
            <div className="App-content">
                <div className="messages">
                    {messages.map((m:MessageType) => {
                        return <div key={uuidv4()}>
                            <b>{m.name}:</b>{m.message}
                        </div>
                    })}
                </div>
                <div>
                    <input value={name} onChange={e=>setName(e.currentTarget.value)}/>
                    <button onClick={()=>{
                        socket.emit("client-name-sent", name);
                    }}>Send name</button>
                </div>
                <div className="message">
                    <textarea value={message}
                              onChange={(e) => setMessage(e.currentTarget.value)}
                              cols={20}
                              rows={5}></textarea>
                    <button onClick={() => {
                        socket.emit("client-message-sent", message);
                        setMessage("");
                    }}>Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
