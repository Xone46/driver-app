const express = require('express')
const router = express.Router();
const postControllers = require('../controllers/postControllers');
const checkAuth = require('../middleware/checkAuth');




router.get('/public',checkAuth , postControllers.public);
router.get('/private', postControllers.private);





module.exports = router;