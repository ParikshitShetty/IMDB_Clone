const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config()

// Import singleton
const SQLiteSingleton = require('../sqliteSingleton');
// create an instance
const dbInstance = new SQLiteSingleton('../imdb.db');

module.exports.LogOutController = async(req,res) => {
    try {
        const { userId } = req;
        console.log("user_id",userId);
        res.clearCookie('access_token').status(200).json({"USER":"Logged Out"});
    } catch (error) {
        console.error("Error while login:",error);
        res.status(500).json({ error: 'Logout failed' });
    }
}