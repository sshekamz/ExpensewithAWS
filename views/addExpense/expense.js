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

//RazorPay actions
document.getElementById('rzp-button1').onclick = async function (e) {
    const token=localStorage.getItem('token');
    const response  = await axios.get('http://localhost:4000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "YorCabs",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Yorcabs",
       "email": "test.user@yorcabs.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:4000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')

         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}