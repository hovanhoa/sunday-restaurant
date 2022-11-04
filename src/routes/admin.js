const express = require('express');
const router = express.Router();
const authUser = require('../controllers/AuthenticateUser');
const adminController = require('../controllers/AdminController');

// API
router.post('/listAccount',  authUser('A'), adminController.listAccount);
router.post('/listFood',  authUser('A'), adminController.listFood);
router.post('/listPayment',  authUser('A'), adminController.listPayment);
router.post('/listOrder',  authUser('A'), adminController.listPayment);



router.get('/',  authUser('A'), adminController.showDashboard);
router.get('/chart',  authUser('A'), adminController.showChart);
router.get('/order',  authUser('A'), adminController.showOrder);
router.get('/revenue',  authUser('A'), adminController.showRevenue);
router.get('/user',  authUser('A'), adminController.showUser);
router.post('/deleteUser',  authUser('A'), adminController.deleteUser);
router.post('/deleteRevenue',  authUser('A'), adminController.deleteRevenue);
router.post('/deleteOrder',  authUser('A'), adminController.deleteOrder);

// GO TO LIST OF FOOD
router.get('/menu',  /*authUser('A'),*/ adminController.store);

// ADD NEW FOOD
router.post('/menu/add',  /*authUser('A'),*/ adminController.add);

// EDIT A FOOD IN THE LIST 
router.get('/menu/edit/:id', /* authUser('A') ,*/ adminController.edit);
router.post('/menu/update/:id', /* authUser('A') ,*/ adminController.update);

// DELETE A FOOD
router.get('/menu/delete/:id', /* authUser('A') ,*/ adminController.delete);







module.exports = router;