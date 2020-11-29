import io from "socket.io-client";
import {MessageType} from "./App";

// const socket = io("https://chat-back-io.herokuapp.com/");

export const api = {
    socket: null as null | SocketIOClient.Socket,

    createConnection() {
        // this.socket = io("http://localhost:3009/");
        this.socket = io("https://chat-back-io.herokuapp.com/");
    },
    subscribe(initMessagesHandler: (messages: MessageType[], fn:(data: string)=>void) => void,
              newMessageSentHandler: (message: MessageType) => void,
              userTypingHandler: (user:any)=>void) {
        this.socket?.on("init-messages-published", initMessagesHandler);
        this.socket?.on("new-message-sent", newMessageSentHandler);
        this.socket?.on("user-typing", userTypingHandler);
    },
    destroyConnection() {
        this.socket?.disconnect();
        this.socket = null;
    },
    sendName(name:string){
        this.socket?.emit("client-name-sent", name);
    },
    sendMessage(message:string){
        this.socket?.emit("client-message-sent", message, (err:string)=>{err && alert(err)});
    },
    typeMessage(){
        this.socket?.emit("client-typed");
    }
};