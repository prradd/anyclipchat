import React, {useContext} from 'react';
import {ChatContext} from "../ChatContext";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

const JoinChat = () => {

    const {setUser} = useContext(ChatContext);

    const onJoinChat = (e) => {
        e.preventDefault();
        const userName = e.target.username?.value;
        if (userName) setUser({userName});


    }

    return (
        <Card style={{width: '80%'}}>
            <CardHeader title="Join a chat"/>
            <CardContent>
                <form action="" id="join-chat" onSubmit={onJoinChat}>
                    <FormControl fullWidth >
                        <Grid container direction="row" justify="flex-start" alignItems="flex-start"
                              spacing={2}>
                            <Grid item sm={8}>
                                <TextField fullWidth id="username" label="Username" variant="outlined"/>
                            </Grid>
                            <Grid item sm={4}>
                                <Button type='submit' color='primary' fullWidth style={{height:'55px'}} variant="contained">Join</Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </form>
            </CardContent>
        </Card>
    );
};

export default JoinChat;