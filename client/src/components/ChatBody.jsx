import React, {useContext, useEffect, useRef, useState} from 'react';
import io from "socket.io-client";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {ChatContext} from "../ChatContext";
import MessageBlock from "./MessageBlock";

const serverUri = process.env.REACT_APP_SERVER_URL
    ? process.env.REACT_APP_SERVER_URL : "";

const ChatBody = () => {

    const {user, setAllUsers} = useContext(ChatContext);
    const [msg, setMsg] = useState('');
    const [msgArr, setMsgArr] = useState([]);
    const textRef = useRef();
    const scrollRef = useRef();

    const socketRef = useRef()

    const resetScrollEffect = ({ element }) => {
        element.current.scrollTop = element.current.scrollHeight;
    }

    useEffect(
        () => {
            socketRef.current = io.connect(serverUri);

            // Join chat
            socketRef.current.emit('joinChat', user);

            // Get previous messages
            socketRef.current.on('prevChatMessages', prevMessages => {
                setMsgArr((oldMsgsArr) => [...oldMsgsArr, ...prevMessages]);
            })

            // Get chat users
            socketRef.current.on('chatUsers', users => {
                setAllUsers((oldUsers) => [...oldUsers, ...users]);
            });

            // Update messages
            socketRef.current.on("message", (message) => {
                setMsgArr((oldMsgsArr) => [...oldMsgsArr, message]);
            })
            return () => socketRef.current.disconnect()
        }, [])


    useEffect(() => {
        // Scroll to the last message
        resetScrollEffect({ element: scrollRef });
    }, [msgArr])    

    const onTextChange = (e) => {
        setMsg(e.target.value)
    }

    // Message submit
    const onSendMessage = (e) => {
        e.preventDefault();

        if (!!msg){
            // Emit a message to server
            socketRef.current.emit('chatMessage', msg)

            // Reset message text
            setMsg('');

            // Focus on message area
            textRef.current.focus();
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            onSendMessage(e);
        }
    }


    return (
        <>
            <Box ref={scrollRef} width='90%' style={{height: '80vh', overflow: 'auto'}}>
                {msgArr.map((msg, index) => <MessageBlock key={index} {...msg} />)}
            </Box>
            <Box width='100%'>
                <form action=""
                      id="chat-message"
                      style={{display: 'flex', alignItems: 'center', margin: '15px'}}
                      onSubmit={onSendMessage}
                >
                    <FormControl fullWidth >
                        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start"
                              spacing={2}>
                            <Grid item sm={10}>
                                <TextField fullWidth
                                           multiline
                                           autoFocus={true}
                                           id="msg"
                                           inputRef={textRef}
                                           placeholder="Write your text here"
                                           value={msg}
                                           onChange={onTextChange}
                                           variant="outlined"
                                           rows={2}
                                           margin="normal"
                                           InputLabelProps={{
                                               shrink: false,
                                           }}
                                           onKeyDown={handleKeyDown}
                                />

                            </Grid>
                            <Grid item sm={2} style={{margin: 'auto'}}>
                                <Button type='submit'
                                        color='primary'
                                        fullWidth
                                        style={{height: '75px', marginTop: '6px', fontSize: 'large'}}
                                        variant="contained"
                                        endIcon={<PlayArrowIcon/>}

                                >send</Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </form>
            </Box>
        </>
    );
};

export default ChatBody;
