const express = require('express');
const router = express.Router();

const controller = require('./Controller')

router.get('/font/:font', controller.font)
router.get('/css', controller.css);
router.get('/img/:imgg', controller.img);
router.get('/app/:jsfiles', controller.script);

module.exports = router;