import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {v4 as uuidv4} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {createConnection, destroyConnection, sendClientName, sendMessage, typeMessage,} from "./chat-reducer";
import {AppStateType} from "./index";

export type MessageType = {
    id: string;
    name: string;
    userId: string;
    message: string;
}


function App() {
    console.log('rendered');
    const messages = useSelector<AppStateType, MessageType[]>((state) => state.chat.messages);
    const typingUsers = useSelector<AppStateType, any[]>((state) => state.chat.typingUsers);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("Hello");
    const [name, setName] = useState("Nastya");
    const [autoScrollActive, setAutoScrollActive] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const myRefAnchor = useRef<HTMLDivElement>(null);
    useEffect(() => {
        dispatch(createConnection());
        return () => {
            dispatch(destroyConnection());
        }
    }, [dispatch]);

    useEffect(() => {
        if (autoScrollActive) {
            myRefAnchor.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [messages,typingUsers, autoScrollActive]);

    return (

        <div className="App">
            <div className="App-content">
                <div className="messages" onScroll={(e) => {
                    let element = e.currentTarget;
                    const maxScrollPosition = element.scrollHeight - element.clientHeight;
                    if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 10) {
                        setAutoScrollActive(true);
                    } else {
                        setAutoScrollActive(false);
                    }
                    setLastScrollTop(element.scrollTop);
                }}>
                    {messages.map((m: MessageType) => {
                        return <div key={uuidv4()}>
                            <b>{m.name}:</b>{m.message}
                        </div>
                    })}
                    {typingUsers.map(u=>{
                        return <div>
                            <b>{u.name}</b> ...
                        </div>
                    })}
                    <div ref={myRefAnchor}/>
                </div>
                <div>
                    <input value={name} onChange={e => setName(e.currentTarget.value)}/>
                    <button onClick={() => {
                        dispatch(sendClientName(name));
                    }}>Send name
                    </button>
                </div>
                <div className="message">
                    <textarea value={message}
                              onKeyPress={()=>{
                                  dispatch(typeMessage())
                              }}
                              onChange={(e) => setMessage(e.currentTarget.value)}
                              cols={20}
                              rows={5}/>
                    <button onClick={() => {
                        dispatch(sendMessage(message));
                        setMessage("");
                    }}>Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
