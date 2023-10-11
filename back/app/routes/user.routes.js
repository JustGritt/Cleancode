module.exports = (app) => {
    const AuthController = require("../controllers/authentication.controller.js");

    app.post('/login', AuthController.loginUser);
    app.post('/register', AuthController.registerUser);
};
