const UserService = require('../services/user.service');

class UserController {
    constructor() {
        this.userService = UserService;
    }

    async register(req, res) {
        const { username, password } = req.body;
        try {
            const user = await this.userService.register(username, password);
            res.status(201).json({ userId: user.userId });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await this.userService.authenticate(username, password);
            res.status(200).json({ userId: user.userId });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = new UserController();