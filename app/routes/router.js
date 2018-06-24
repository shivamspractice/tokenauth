var router=require('express').Router();
var apiRoutes=require('./api/router');
var tokenController=require('../controllers/TokenController');

router.get('/',tokenController.homePage);
router.get('/setup',tokenController.setup);

router.use('/api',apiRoutes);

module.exports=router;