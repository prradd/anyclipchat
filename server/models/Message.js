const Sequelize = require('sequelize');
const db = require('../config/database');

const Message = db.define('message', {
    socket_id: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING
    },
    message_text: {
        type: Sequelize.STRING
    },
    time: {
        type: Sequelize.STRING
    },
})

module.exports = Message;