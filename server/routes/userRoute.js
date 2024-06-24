const { Router } = require('express');

// Import controller
const { UsersGetterController }  = require('../controllers/userController');
const { SignupController } = require('../controllers/signUpController');
const { LoginController } = require('../controllers/loginController');
const { LogOutController } = require('../controllers/logOutController');
// Import Middleware
const verifyToken = require('../middlewares/authMiddleware');

const router = Router();

router.route('/getter').get(UsersGetterController);

router.route('/signup').post(SignupController); 
router.route('/login').post(LoginController); 
router.route('/logout').get(verifyToken,LogOutController); 

module.exports = router;