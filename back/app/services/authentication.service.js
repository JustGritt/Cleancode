const { readUsers, writeUsers } = require('../utils/user.utils.js');

class AuthenticationService {
    authenticateUser(username, password) {
        const users = readUsers();
        const user = users.find(u => u.username === username);

        if (user && user.password === password) {
            return {
                success: true,
                userId: user.userId
            };
        } else {
            return {
                success: false,
                message: 'Authentication failed'
            };
        }
    }

    registerUser(username, password) {
        const users = readUsers();
        const user = users.find(u => u.username === username);

        if (user) {
            return {
                success: false,
                message: 'Username already exists'
            };
        } else {
            const userId = users.length + 1;
            users.push({ userId, username, password });
            writeUsers(users);
            return {
                success: true,
                userId
            };
        }
    }
}

module.exports = new AuthenticationService();