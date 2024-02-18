const User = require('../models/user.model');
const bcrypt = require('bcrypt');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(username, password) {
        // Quick exit if the user already exists
        const existingUser = await this.userRepository.findUserByUsername(username);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Create the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(username, hashedPassword);

        // Save the user to the repository
        await this.userRepository.saveUser(user);
        return user;
    }

    async authenticate(username, password) {
        const user = await this.userRepository.findUserByUsername(username);
        if (!user) {
            throw new Error('Invalid username');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid password');
        }

        return user;
    }
}

module.exports = UserService;