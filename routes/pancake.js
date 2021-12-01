var express = require('express');
const pancake_controlers= require('../controllers/pancake'); 
var router = express.Router();
const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  } 
/* GET home page. */
router.get('/', pancake_controlers.pancake_view_all_Page );

router.get('/detail', pancake_controlers.pancake_view_one_Page); 
router.get('/create', pancake_controlers.pancake_create_Page); 
router.get('/update',secured, pancake_controlers.pancake_update_Page);
router.get('/delete', pancake_controlers.pancake_delete_Page); 


module.exports = router;