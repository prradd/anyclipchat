const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');


const PORT = 5000 || process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, '../client/public')));

// Run when client connects
io.on('connection', socket => {
    console.log('New WS connection')
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const { Sequelize } = require('sequelize').default;

const host = 'sql11.freesqldatabase.com';
const database = 'sql11423120';
const username = 'sql11423120';
const password = 'TIUjRBenqR';

// const sequelize = new Sequelize(database, username, password, {
//     host: host,
//     dialect: 'mysql'
// });
//
// // Connect to MySql
// sequelize.authenticate().then(res => {
//     console.log('Connection to DB has been established successfully.');
//
//     // Connect to Socket.io
//     client.on('connection', () => {
//         const chat = '';
//
//         // Create function to send status
//         const sendStatus = (s) => {
//
//         }
//     })
//
//
// }).catch(err => {
//     console.log(err);
// });

