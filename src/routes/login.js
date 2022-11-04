const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.showLogin);

// Post login data
router.post('/', UserController.login);

module.exports = router;