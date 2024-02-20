const jwt = require("jsonwebtoken");

exports.authenticationGuard = (options) => async function (req, res, next) {

    const jwtAuthEnabled = options.JWTAuth;

    // early next if jwtAuth is not enabled
    if (!jwtAuthEnabled) {
        return next();
    }

    const authorizationHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Verify the token and attach the decoded payload to the request object
        const token = authorizationHeader.replace('Bearer ', '');
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;                                                                                                          
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        } else {
            // Handle other errors
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

