import React, {useState, createContext} from "react";
import defAvatar from './assets/img/AnyClip_Default_Avatar_flat.png';


export const ChatContext = createContext({});

export const ChatProvider = props => {
    const [user, setUser] = useState({userName: '', avatar: defAvatar});
    const [selectedImage, setSelectedImage] = useState(defAvatar);
    const [allUsers, setAllUsers] = useState([])

    return (
        <ChatContext.Provider value={{ user, setUser, selectedImage, setSelectedImage, allUsers, setAllUsers }}>
            {props.children}
        </ChatContext.Provider>
        )
}