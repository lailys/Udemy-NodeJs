const path = require('path');

const express = require('express');


const errorController = require('../controllers/error');

const router = express.Router();

// /admin/add-product => GET
router.get('/404', errorController.get404);



module.exports = router;
