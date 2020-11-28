import React, {useEffect, useState} from 'react';
import './App.css';
import {io} from "socket.io-client";

const socket = io("http://localhost:3009/");

function App() {
    const [messages, setMessages] = React.useState([{
        id: "hkjhkk",
        message: "Hello Dima",
        userId: "hhkl",
        name: "Nastya"
    },
        {id: "hkjhkk", message: "Hello Nastya", userId: "hhkl", name: "Dima"},
    ]);

    const [message, setMessage] = useState("Hello");

    useEffect(() => {
        // const socket = io("http://localhost:3009/");
        // const socket = io("https://chat-back-io.herokuapp.com/");
    }, []);
    return (
        <div className="App">
            <div className="App-content">
                <div className="messages">
                    {messages.map(m => {
                        return <div>
                            <b>{m.name}:</b>{m.message}
                        </div>
                    })}
                </div>
                <div className="message">
                    <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)} cols={20}
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
