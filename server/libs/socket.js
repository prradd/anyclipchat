const formatMessage = require('../utils/messages');
const {userJoin, getCurrentUser, userLeave, getChatUsers} = require("../utils/users");

const botName = {username: 'AnyClip Bot'};

function socket(io) {
    io.on('connection', socket => {
        socket.on('joinChat', user => {
            const userJoined = userJoin(socket.id, user.userName, user.avatar)

            // Welcome current user
            socket.emit('message', formatMessage(botName,'Welcome to AnyClip chat!'))

            // Broadcast when user connects
            socket.broadcast.emit('message', formatMessage(botName,`${userJoined.username} has joined the chat`));

            // Send all users
            io.emit('chatUsers', getChatUsers());
        })

        // Listen for chatMessage
        socket.on('chatMessage', (msg) => {
            const user = getCurrentUser(socket.id);
            console.log(user);
            io.emit('message', formatMessage(user, msg));
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
}

module.exports = socket;