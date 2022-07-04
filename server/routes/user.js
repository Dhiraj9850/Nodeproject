const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers')

router.get('/',userControllers.view);
router.post('/',userControllers.find);
router.get('/adduser',userControllers.form);
router.post('/adduser',userControllers.create);
router.get('/edituser/:id',userControllers.edit);
router.post('/edituser/:id',userControllers.update);
router.get('/:id',userControllers.delete);
router.get('/viewuser/:id',userControllers.viewall)

module.exports = router;