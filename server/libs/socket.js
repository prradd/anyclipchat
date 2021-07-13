const formatMessage = require('../utils/messages');
const {userJoin, getCurrentUser, userLeave, getChatUsers} = require("../utils/users");

const botName = 'AnyClip Bot';

function socket(io) {
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
}

module.exports = socket;