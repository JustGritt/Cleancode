const authenticationService = require('../services/authentication.service.js');

exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    const result = authenticationService.authenticateUser(username, password);

    if (result.success) {
        res.status(200).json({ message: 'Authentication successful', userId: result.userId });
    } else {
        res.status(401).json({ message: result.message });
    }
}

exports.registerUser = (req, res) => {
    const { username, password } = req.body;
    console.log("Trying to register with parameters:", username, password);
    const result = authenticationService.registerUser(username, password);

    if (result.success) {
        res.status(200).json({ message: 'Registration successful' });
    } else {
        res.status(401).json({ message: result.message });
    }
}