const express=require('express')

const route=express();

const signUpController=require('../controller/signupController')

route.post('/user/signup', signUpController.addUser)

module.exports=route;