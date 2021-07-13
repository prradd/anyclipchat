import React, {useContext} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import Sidebar from "./Sidebar";
import JoinChat from "./JoinChat";
import Typography from "@material-ui/core/Typography";
import {ChatContext} from "../ChatContext";
import ChatBody from "./ChatBody";

const Chat = () => {

    const {user} = useContext(ChatContext);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Header/>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{height: '80vh'}}>
                <Grid item xs={3}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={9} style={{maxHeight: "80vh"}}>
                    <Typography
                        component="div"
                        className="chat-main"
                    >
                        {!!user?.userName ? <ChatBody /> : <JoinChat />}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat
