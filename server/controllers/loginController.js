const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config()

// Import singleton
const SQLiteSingleton = require('../sqliteSingleton');
// create an instance
const dbInstance = new SQLiteSingleton('../imdb.db');

module.exports.LoginController = async(req,res) => {
    try {
        const { user_name,password } = req.body;
    
        const query = `SELECT * FROM Users WHERE user_name="${user_name}"`;
           
        const rows = await dbInstance.select(query, []);
        console.log("rows",rows);
        const match = await bcrypt.compare(password, rows[0].password);
        
        if (match) {
            // Passwords match, authentication successful
            console.log('Passwords match! User authenticated.');
            const token = jwt.sign({ user_name: user_name }, env.parsed.Secret_Key, {
                expiresIn: '12h',
            });
            const id = rows[0].user_id;
            const cookie = {
                user_name : user_name,
                token : token,
                userId : id,
            };
            const cookieOptions = {
                secure: env.parsed.NODE_ENV === 'production', // Set to true in production with HTTPS
                httpOnly: true,
                maxAge: 90000000,
                domain: env.parsed.NODE_ENV === 'production' ? '.vercel.app' : 'localhost',
                sameSite: env.parsed.NODE_ENV === 'production' ? 'None' : 'Lax',
                path: '/',
            };
            res.cookie("access_token",cookie,cookieOptions).status(200).json({ "message":"Authenticated.", "token":token, "user_id":id });
        } else {
            // Passwords don't match, authentication failed
            console.log('Passwords do not match! Authentication failed.');
            return res.status(401).json({ "message": 'Authentication failed' });
        }    
    } catch (error) {
        console.error("Error while login:",error);
        res.status(500).json({ error: 'Login failed' });
    }
}