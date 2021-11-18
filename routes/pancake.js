var express = require('express');
const pancake_controlers= require('../controllers/pancake'); 
var router = express.Router();

/* GET home page. */
router.get('/', pancake_controlers.pancake_view_all_Page );

router.get('/detail', pancake_controlers.pancake_view_one_Page); 
module.exports = router;