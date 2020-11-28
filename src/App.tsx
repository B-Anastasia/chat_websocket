import React, {useState} from 'react';
import './App.css';
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
const socket = io("http://localhost:3009/");

function App() {
    const [messages] = React.useState([{
        id: uuidv4(),
        message: "Hello Dima",
        userId: uuidv4(),
        name: "Nastya"
    },
        {id: uuidv4(), message: "Hello Nastya", userId: uuidv4(), name: "Dima"},
    ]);

    const [message, setMessage] = useState("Hello");

    return (
        <div className="App">
            <div className="App-content">
                <div className="messages">
                    {messages.map(m => {
                        return <div key={uuidv4()}>
                            <b>{m.name}:</b>{m.message}
                        </div>
                    })}
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
