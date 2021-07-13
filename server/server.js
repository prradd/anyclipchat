const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET"]
    }
});

const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getChatUsers} = require("./utils/users");

const botName = 'AnyClip Bot';

io.on('connection', socket => {
    socket.on('joinChat', username => {
        const user = userJoin(socket.id, username)

        // Welcome current user
        socket.emit('message', formatMessage(botName,'Welcome to AnyClip chat!'))

        // Broadcast when user connects
        socket.broadcast.emit('message', formatMessage(botName,`${username} has joined the chat`));

        // Send all users
        io.emit('chatUsers', getChatUsers());
    })

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.emit('message', formatMessage(user?.username, msg));
    })

    // When user disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.emit('message', formatMessage(botName,`${user.username} has left the chat`))

            // Send all users
            io.emit('chatUsers', getChatUsers());
        }
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

