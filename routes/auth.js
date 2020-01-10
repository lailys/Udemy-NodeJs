const path = require('path');

const express = require('express');


const authController = require('../controllers/auth');
const router = express.Router();


router.get('/login', authController.getUserAuth );
router.post('/login', authController.postUserAuth );
router.get('/logout', authController.getLogout );
router.post('/logout', authController.postLogout );
router.get('/signup', authController.getUserInfo);
router.post('/signup', authController.postUserInfo);


module.exports = router;
