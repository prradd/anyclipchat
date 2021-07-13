import React, {useContext} from 'react';
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import {ChatContext} from "../ChatContext";

const Sidebar = () => {
    const {allUsers} = useContext(ChatContext);

    return (
        <AppBar position="relative" style={{height: '100%'}}>

            <List>
                <ListSubheader color='inherit' style={{textAlign: 'left'}}>
                    Users on line:
                </ListSubheader>
                {
                    allUsers.map(user => {
                        return (
                            <ListItem ><ListItemText primary={user.username}/></ListItem>
                        )
                    })
                }
            </List>

        </AppBar>
    );
};

export default Sidebar;
