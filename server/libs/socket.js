const formatMessage = require('../utils/messages');
const {userJoin, getCurrentUser, userLeave, getChatUsers} = require("../utils/users");

const db = require('../config/database');
const Message = require('../models/Message');

const botName = {username: 'AnyClip Bot'};

function socket(io) {
    io.on('connection', socket => {
        Message.findAll()
            .then(messages => console.log(messages))
            .catch(err => console.log(err));

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
            const newMessage = formatMessage(user, msg);
            console.log(newMessage)

            Message.create({
                socket_id: socket.id,
                username: newMessage.userName,
                avatar: newMessage.avatar,
                message_text: newMessage.text,
                time: newMessage.time
            })
                .then(message => {
                    io.emit('message', newMessage);
                })
                .catch((err => console.log(err)))


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