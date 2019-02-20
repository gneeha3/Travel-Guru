var express = require('express');
var app = express();
var router = express.Router();
var cntrMain = require('../controllers/main');
/* GET home page. */
router.get('/', cntrMain.home)
module.exports = router;
