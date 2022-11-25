const User=require('../model/signupTable');

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
        const user= await User.findAll({where:{email}}).then(user=>{
            if(isStringValid(name)||isStringValid(email)||isStringValid(password)){
                return res.status(400).json({message:"Something is missing"})
            }
            else if(user[0].email===email){
                res.status(404).json({message:"email Already Exist"})
            } else {
            const data=  User.create({name,email,password});
            res.status(201).json({newUser:data});
            
            }
        })
        
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
                if(user[0].password===password){
                    res.status(200).json({message:"User logged successfully"})
                
                } else{
                    return res.status(400).json({message:"Password not matching"})
                }
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