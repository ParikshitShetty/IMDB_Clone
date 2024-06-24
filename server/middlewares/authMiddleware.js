// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const env = require('dotenv').config()
// console.log(`Secret Key is ${env.parsed.Secret_Key}`);

function verifyToken(req, res, next) {
    try {
        const cookie = req.cookies;
        const access_token = cookie.access_token;
        console.log("access_token",access_token);
        if (!access_token.token) return res.status(401).json({ error: 'Access denied' });

        const decoded = jwt.verify(access_token.token, env.parsed.Secret_Key);
        console.log("decoded",decoded)
        req.user_name = decoded.user_name;
        req.userId = access_token.userId;
        next();
    } catch (error) {
        console.error("error reading token:",error.message)
        if (error.message.includes('expired')) {
            res.status(401).json({ error: 'Token expired' });
            return
        }
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;