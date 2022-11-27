const express=require('express')

const userAuthenticate=require('../middleware/authenticate')

const route=express();

const userController=require('../controller/userController')
const expenseController=require('../controller/expenseController')

route.post('/user/signup', userController.signupUser)

route.post('/user/login',userController.loginUser);

//POST
route.post('/user/add-expense',userAuthenticate.authenticate, expenseController.addExpense);

//GET

route.get('/user/get-expense',userAuthenticate.authenticate ,expenseController.getExpense);

//DELETE
route.delete('/user/delete-expense/:id',userAuthenticate.authenticate, expenseController.deleteExpense);

module.exports=route;