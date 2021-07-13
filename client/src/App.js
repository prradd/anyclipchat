import React from 'react';
import Chat from "./components/Chat";
import {createMuiTheme} from '@material-ui/core/styles';
import {MuiThemeProvider} from "@material-ui/core";
import {ChatProvider} from "./ChatContext";
import './App.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#aaaaaa',
            main: '#000',
            dark: '#454545',
            contrastText: '#c8c8c8',
        }
    },

});


function App() {

    return (
        <MuiThemeProvider theme={theme}>
            <ChatProvider>
                <div className="App">
                    <Chat/>
                </div>
            </ChatProvider>
        </MuiThemeProvider>

    );
}

export default App;
