const express=require('express')

const route=express();

const userController=require('../controller/userController')
const expenseController=require('../controller/expenseController')

route.post('/user/signup', userController.signupUser)

route.post('/user/login',userController.loginUser);

//PUT
route.post('/user/add-expense', expenseController.addExpense);

//GET

route.get('/user/get-expense', expenseController.getExpense);

//DELETE
route.delete('/user/delete-expense/:id', expenseController.deleteExpense);

module.exports=route;