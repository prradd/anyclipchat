import React from 'react';
import Chat from "./components/Chat";
import {createTheme} from '@material-ui/core/styles';
import {MuiThemeProvider} from "@material-ui/core";
import {ChatProvider} from "./ChatContext";
import './App.css';

const theme = createTheme({
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

    console.log('env', process.env.PUBLIC_URL);
    console.log(process.env.REACT_APP_PUBLIC_URL);

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
