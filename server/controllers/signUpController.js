const bcrypt = require('bcrypt');

// Import singleton
const SQLiteSingleton = require('../sqliteSingleton');
// create an instance
const dbInstance = new SQLiteSingleton('../imdb.db');

const saltRounds = 10;

module.exports.SignupController = async(req,res) => {
    try {
        const { user_name,password } = req.body;

        console.log("user_name",user_name,"password",password);

        const query = "INSERT INTO Users (user_name,password) VALUES (?,?)";

        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const options = [user_name,hashedPassword];
        
        const rows = await dbInstance.insert(query, options);
       
        res.status(200).json({"message":"SIgned up","data":rows});
        
    } catch (error) {
        console.error('Signup failed',error)
        res.status(500).json({ error: 'Signup failed' });
    }
}