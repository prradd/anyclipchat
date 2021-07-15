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
    ? process.env.REACT_APP_SERVER_URL : "http://localhost:4000";

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
            socketRef.current.emit('joinChat', user?.userName);

            // Get chat users
            socketRef.current.on('chatUsers', users => {
                setAllUsers(users );
            });

            // Update messages
            socketRef.current.on("message", (message) => {
                setMsgArr((oldMsgsArr) => [...oldMsgsArr, message]);
            })
            return () => socketRef.current.disconnect()
        }, [])


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

            // Scroll to the last message
            resetScrollEffect({ element: scrollRef });

            // Focus on message area
            textRef.current.focus();
        }
    }


    return (
        <>
            <Box ref={scrollRef} width='90%' style={{height: '80vh', overflow: 'auto'}}>
                {msgArr.map((msg, index) => <MessageBlock key={index} props={msg}/>)}
            </Box>
            <Box width='100%'>
                <form action=""
                      id="chat-message"
                      style={{display: 'flex', alignItems: 'center', margin: '15px'}}
                      onSubmit={onSendMessage}
                >
                    <FormControl fullWidth >
                        <Grid container direction="row" justify="flex-start" alignItems="flex-start"
                              spacing={2}>
                            <Grid item sm={10}>
                                <TextField fullWidth
                                           multiline
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
