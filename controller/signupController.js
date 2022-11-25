const userSignup=require('../model/signupTable');

const addUser= async(req,res,next)=>{
    
    try {
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    const data= await userSignup.create(
        {name:name,
        email:email,
        password:password
    });

    res.status(201).json({newUser:data});
    
        
} catch (error) {
        console.log(error);
}


};

module.exports={
    addUser
}