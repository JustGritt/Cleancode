const UserController = require('./user.controller.js');

exports.loginUser = UserController.login;
exports.registerUser = UserController.register;