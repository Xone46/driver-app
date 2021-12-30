const express = require('express')
const router = express.Router();
const authControllers = require('../controllers/authContollers');
const { body, validationResult } = require('express-validator');




router.post('/signup', body('email').isEmail(), body('password').isLength({ min: 6 }), authControllers.signup);
router.route('/signin').post(authControllers.signin);




module.exports = router;