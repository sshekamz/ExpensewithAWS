const express=require('express');
const purchaseController = require('../controller/purchaseController');

const userAuthenticate=require('../middleware/authenticate')

const router=express();

router.get('/purchase/premiummembership', userAuthenticate.authenticate,purchaseController.purchasepremium);

router.post('/purchase/updatetransactionstatus', userAuthenticate.authenticate, purchaseController.updateTransactionStatus)

module.exports= router;