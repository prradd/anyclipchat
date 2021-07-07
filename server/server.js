const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET"]
    }
});
const path = require('path');

io.on('connection', socket => {

    // Welcome current user
    socket.emit('message', 'Welcome to AnyClip chat!')

    // Broadcast when user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // When user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })
})

http.listen(4000, () => {
    console.log('listening on port 4000');
})



// const { Sequelize } = require('sequelize').default;

// const host = 'sql11.freesqldatabase.com';
// const database = 'sql11423120';
// const username = 'sql11423120';
// const password = 'TIUjRBenqR';

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

