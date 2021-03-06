const moment = require('moment');

function formatMessage(user, text) {
    return {
        userName: user?.username,
        avatar: user?.avatar,
        text,
        time: user?.time ?? moment().format('h:mm a'),
    }
}

module.exports = formatMessage;