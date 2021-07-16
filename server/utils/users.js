const users = [];

// Join user to chat
function userJoin(id, username, avatar) {
    const userJoined = { id, username, avatar};

    users.push(userJoined);

    return userJoined;
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get chat users
function getChatUsers() {
    return users;
}

console.log(users)

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getChatUsers
}