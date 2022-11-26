const Expense = require("../model/expensListTable");


//ADD expense
const addExpense= async(req,res,next)=>{
    try {
    const{amount,description,category}=req.body

    const data= await Expense.create(
        {amount,description,category});
    res.status(201).json({newExpenseDetail:data});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }



};
//GET Expense
const getExpense=async(req,res,next)=>{

    try {
        const expenses= await Expense.findAll();
    res.status(200).json({allExpenses:expenses});
    } catch (error) {
        console.log(err);
        res.status(500).json(error);
    }

}
//Delete Expense

const deleteExpense=async(req,res)=>{
    console.log("113");
    try {
        
        if(req.params.id=='undefined'){
            console.log('ID is missing');
            return res.status(404).json({err:'id is missing'})
        }
        const eId=req.params.id;
        await Expense.destroy({where:{id:eId}});
        res.sendStatus(200);
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