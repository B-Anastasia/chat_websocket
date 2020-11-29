import io from "socket.io-client";
import {MessageType} from "./App";

// const socket = io("https://chat-back-io.herokuapp.com/");

export const api = {
    socket: null as null | SocketIOClient.Socket,

    createConnection() {
        this.socket = io("http://localhost:3009/");
    },
    subscribe(initMessagesHandler: (messages: MessageType[]) => void,
              newMessageSentHandler: (message: MessageType) => void) {
        debugger
        this.socket?.on("init-messages-published", initMessagesHandler);
        this.socket?.on("new-message-sent", newMessageSentHandler);
    },
    destroyConnection() {
        this.socket?.disconnect();
        this.socket = null;
    },
    sendName(name:string){
        this.socket?.emit("client-name-sent", name);
    },
    sendMessage(message:string){
        this.socket?.emit("client-message-sent", message);
    }
};