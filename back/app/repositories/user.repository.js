const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

class UserRepository {
    constructor(filename) {
        this.filename = filename;
    }

    async create(user) {
        const users = await this._read();
        user.userId = users.length > 0 ? users[users.length - 1].userId + 1 : 1;
        users.push(user);
        await this._write(users);
        return user;
    }

    async findUserByUsername(username) {
        const users = JSON.parse(await fs.readFile(this.filename, 'utf-8'));
        return users.find(user => user.username === username);
    }

    async saveUser(user) {
        const users = JSON.parse(await fs.readFile(this.filename, 'utf-8'));
        users.push(user);
        await fs.writeFile(this.filename, JSON.stringify(users));
    }

    async _read() {
        try {
            const usersData = await fs.promises.readFile(this.filename, 'utf-8');
            return JSON.parse(usersData);
        } catch (error) {
            return [];
        }
    }

    async _write(users) {
        await fs.promises.writeFile(this.filename, JSON.stringify(users, null, 2));
    }
}

module.exports = UserRepository;