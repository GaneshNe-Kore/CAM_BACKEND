const express = require('express');
const metaController = require('./Controllers/metaController.js');

const router = express.Router();

// Import controllers

// Define routes
router.get('/meta', metaController.getMeta);
router.post('/meta', metaController.postMeta);

module.exports = router;
