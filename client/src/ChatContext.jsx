import React, {useState, createContext} from "react";

export const ChatContext = createContext({});

export const ChatProvider = props => {
    const [user, setUser] = useState({userName: ''});
    const [allUsers, setAllUsers] = useState([])

    return (
        <ChatContext.Provider value={{ user, setUser, allUsers, setAllUsers }}>
            {props.children}
        </ChatContext.Provider>
        )
}