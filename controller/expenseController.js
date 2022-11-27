const Expense = require("../model/expensListTable");
const User = require("../model/signupTable");


//ADD expense
const addExpense= async(req,res,next)=>{
    try {
    const{amount,description,category}=req.body

    const data= await Expense.create(
        {amount,description,category,userId:req.user.id});
    res.status(201).json({newExpenseDetail:data});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }



};
//GET Expense
const getExpense=async(req,res,next)=>{

    try {
        await Expense.findAll({where:{userId:req.user.id}}).then(expenses=>{
            return res.status(200).json({allExpenses:expenses});
        })
            
    } catch (error) {
        //console.log(err);
        res.status(500).json(error);
    }

}
//Delete Expense

const deleteExpense=async(req,res)=>{
    //console.log("113");
    try {
        
        if(req.params.id=='undefined'){
            console.log('ID is missing');
            return res.status(404).json({err:'id is missing'})
        }
        const eId=req.params.id;
        await Expense.destroy({where:{id:eId,userId:req.user.id}}).then(data=>{
            if(data===0){
                return res.status(404).json({message:"Expense not belong to user"})
            } else{
                res.status(200).json({message:"Deleted Successfully"});
            }
            })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports={
    addExpense,
    getExpense,
    deleteExpense
}