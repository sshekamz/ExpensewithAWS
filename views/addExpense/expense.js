// network call 
async function addExpense(event){
    try {
    
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    

    const obj={
        amount,
        category,
        description
    };
    //console.log(obj);
        const token=localStorage.getItem('token')
        let post= await axios.post("http://localhost:4000/user/add-expense",obj,{headers:{"Authorization":token}})
        showExpense(post.data.newExpenseDetail);
    
    } catch (error) {
        console.log(error);
    }    
}

//
window.addEventListener("DOMContentLoaded", async () => {
  
    try {
        const token=localStorage.getItem('token')
        let getData = await axios.get("http://localhost:4000/user/get-expense",{headers:{"Authorization":token}})
        for(let i=0;i<getData.data.allExpenses.length;i++){
            showExpense(getData.data.allExpenses[i]);
        }

    } catch (error) {
        console.log(error);
    }
    
    
})

function showExpense(expense){
    document.getElementById('amount').value='';
    document.getElementById('description').value='';
    document.getElementById('amount').value='';


    const parentNode=document.getElementById('expenseList');
    const childHTML=`<li id=${expense.id}> ${expense.amount} - ${expense.description} - ${expense.category}
                     <button onclick=deleteExpense('${expense.id}')>Delete</button>
                     </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}



  async function deleteExpense(eId){
    try {
    const token=localStorage.getItem('token')
    let deleteE=await axios.delete(`http://localhost:4000/user/delete-expense/${eId}`,{headers:{"Authorization":token}})
        //console.log(deleteE);
        removeExpenseFromScreen(eId)
    } catch (error) {
        console.log(error);
    }

}
function removeExpenseFromScreen(expId){
    const parentNode = document.getElementById('expenseList');
    const childNodeToBeDeleted = document.getElementById(expId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}