const { Router } = require('express');

// Import controller
const initDbPopulater  = require('../admin/initDbPopulater');

const router = Router();

router.route('/update').get(initDbPopulater); 

module.exports = router;