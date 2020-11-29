import {MessageType} from "./App";
import {api} from "./api";

type InitialStateType = {
    messages: MessageType[];
    typingUsers: any[];
}

const initialState: InitialStateType = {
    messages: [],
    typingUsers: [],
};

export const chatReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case "messages-received": {
            return {...state, messages: action.messages}
        }
        case "new-message-received": {
            return {...state, messages: [...state.messages, action.message],
            typingUsers: state.typingUsers.filter(u=>u.id!==action.message.userId)}
        }
        case "typing-user-added": {
            return {
                ...state,
                typingUsers: [...state.typingUsers.filter(u => u.id !== action.user.id), action.user]
            }
        }
        default: {
            return state;
        }
    }
}

const messagesReceived = (messages: MessageType[]) => ({type: "messages-received", messages});
const newMessageReceived = (message: MessageType) => ({type: "new-message-received", message});
const typingUsersAdded = (user: any) => ({type: "typing-user-added", user});

export const createConnection = () => (dispatch: any) => {

    api.createConnection();
    api.subscribe(
        (messages: MessageType[]) => {
            dispatch(messagesReceived(messages))
        },
        (message: MessageType) => {
            dispatch(newMessageReceived(message))
        },
        (user) => {
            dispatch(typingUsersAdded(user))
        }
    )
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

export const typeMessage = () => (dispatch: any) => {
    api.typeMessage();
}