const User=require('../model/signupTable');
const jwt=require('jsonwebtoken');

const authenticate=(req,res,next)=>{
    try {
        const token=req.header('Authorization');
        const user=jwt.verify(token,'bigerkey12345')
        User.findByPk(user.userId).then(user=>{
            req.user=user;
            next();
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({success:false});
        
    }
}

module.exports={
    authenticate
}