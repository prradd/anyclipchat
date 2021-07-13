import React from 'react';
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const Header = () => {

    return (
        <AppBar position="static" style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Toolbar>
                <IconButton>
                    <img
                        src="https://cdn.shortpixel.ai/spai/w_175+q_glossy+ret_img+to_webp/https://anyclip.com/wp-content/uploads/2021/05/AnyClip_Logo_2021-05-06-2021_Primary_White.png"
                        alt="Logo"
                    />
                </IconButton>

                <Typography variant="h5">
                    Chat
                </Typography>
            </Toolbar>
            <Toolbar>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
