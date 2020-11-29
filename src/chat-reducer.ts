import {MessageType} from "./App";
import {api} from "./api";

type InitialStateType = {
    messages: MessageType[];
}

const initialState: InitialStateType = {
    messages: []
};

export const chatReducer = (state:InitialStateType = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case "messages-received": {
            return {...state, messages: action.messages}
        }
        case "new-message-received": {
            return {...state, messages: [...state.messages, action.message]}
        }
        default: {
            return state;
        }
    }
}

const messagesReceived = (messages: MessageType[]) => ({type: "messages-received", messages});
const newMessageReceived = (message: MessageType) => ({type: "new-message-received", message});

export const createConnection = () => (dispatch: any) => {

    api.createConnection();
    api.subscribe(
        (messages: MessageType[]) => {
            console.log('\x1b[34m%s\x1b[0m','/* Line 30 1: ',
                1 ,
                '*/');
            dispatch(messagesReceived(messages))
        },
        (message: MessageType) => {
            console.log('\x1b[34m%s\x1b[0m','/* Line 30 1: ',
                1 ,
                '*/');
            dispatch(newMessageReceived(message))
        })
}
export const destroyConnection = () => (dispatch: any) => {
    api.destroyConnection();
}

export const sendClientName = (name: string) => (dispatch: any) => {
    api.sendName(name);
}
export const sendMessage = (message: string) => (dispatch: any) => {
    api.sendMessage(message);
}