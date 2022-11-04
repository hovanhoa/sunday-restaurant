const express = require('express');
// const User = require('../models/user');
const UserController = require('../controllers/UserController');
const router = express.Router();

// const user = new User();
router.get('/', UserController.showRegister);

// Post register data
router.post('/',UserController.register);
module.exports = router;