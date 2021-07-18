const formatMessage = require('../utils/messages');
const {userJoin, getCurrentUser, userLeave, getChatUsers} = require("../utils/users");

const Message = require('../models/Message');

const botName = {username: 'AnyClip Bot'};

function socket(io) {
    io.on('connection', socket => {
        // Send previous messages before before user connected
        Message.findAll({
            limit: 10,
            where: {},
            order: [['id', 'DESC']]
        })
            .then(messages => {
                const prevMessages = messages.map(message => {
                    return formatMessage({
                        username: message?.username,
                        avatar: message?.avatar,
                        time: message?.time
                    }, message?.message_text)
                });
                socket.emit('prevChatMessages', prevMessages.reverse())
            })
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