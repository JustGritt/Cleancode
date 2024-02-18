const UserRepository = require('../repositories/user.repository');
const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

describe('User Authentication', () => {
    let userService;
    let userRepository;
    let user;

    beforeAll(async () => {
        const filename = path.join(__dirname, './data/test_users.json');
        await fs.promises.writeFile(filename, '[]');
        userRepository = new UserRepository(filename);
        userService = new UserService(userRepository);
        user = await userService.register('JohnDoe', 'Password');
    });

    it('Should authenticate a user with valid credentials', async () => {
        const authenticatedUser = await userService.authenticate('JohnDoe', 'Password');
        expect(authenticatedUser).toBeDefined();
        expect(authenticatedUser.username).toBe('JohnDoe');
    });

    it('Should not authenticate a user with invalid username', async () => {
        try {
            await userService.authenticate('JohnWick', 'Password');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty('message', 'Invalid username');
        }
    });

    it('Should not authenticate a user with invalid password', async () => {
        try {
            await userService.authenticate('JohnDoe', 'NotMyPassword');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty('message', 'Invalid password');
        }
    });

    it('Should hash the password before saving the user to the database', async () => {
        const isMatch = await bcrypt.compare('Password', user.password);
        expect(isMatch).toBe(true);
    });

    it('Should login a user with valid credentials', async () => {
        const authenticatedUser = await userService.authenticate('JohnDoe', 'Password');
        expect(authenticatedUser).toBeDefined();
        expect(authenticatedUser.username).toBe('JohnDoe');
    });

    it('Should not login a user with invalid username', async () => {
        try {
            await userService.authenticate('JohnWick', 'Password');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty('message', 'Invalid username');
        }
    });
});