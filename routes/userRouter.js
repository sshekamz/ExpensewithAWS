const express=require('express')

const route=express();

const userController=require('../controller/userController')

route.post('/user/signup', userController.signupUser)

route.post('/user/login',userController.loginUser);

module.exports=route;