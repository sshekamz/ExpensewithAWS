const User=require('../model/signupTable');
const brcypt=require('bcrypt')
const jwt=require('jsonwebtoken')

function generateToken(id,name){
    return jwt.sign({userId:id,name:name},'bigerkey12345')
}

function isStringValid(string){
    if(string===undefined||string.length===0){
        return true
    } else{
        return false
    }
}

const signupUser= async(req,res,next)=>{
    try {
        const{name,email,password}=req.body;
        const user= await User.findAll({where:{email}})
            
            if(isStringValid(name)||isStringValid(email)||isStringValid(password)){
                return res.status(400).json({message:"Something is missing"})
            }
            else {
                brcypt.hash(password,10, async(err,hash)=>{
                    await User.create({name,email,password:hash});
                    res.status(201).json({message:"User created successfully"})
                })
            
            }
        
        
} catch (error) {
        console.log(error);

}
};

const loginUser=async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        if(isStringValid(email)||isStringValid(password)){
            return res.status(400).json({message:"Something is missing"})
        }
        const user= await User.findAll({where:{email}}).then(user=>{
            if(user.length>0){
                brcypt.compare(password,user[0].password,(err,result)=>{
                    if(err){
                        throw new Error('Something went wrong')

                    }
                    if(result===true){
                        res.status(200).json({message:"logged Successfully",token:generateToken(user[0].id,user[0].name)})
                    }
                
                 else{
                    return res.status(400).json({message:"Password not matching"})
                }
            })
            } else{
                return res.status(404).json({message:"User not exist"})
            }
        })

    } catch (error) {
        res.status(500).json({message:error});
    }
}

module.exports={
    signupUser,
    loginUser
}