async function login(event){
    try {
    
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const obj={
        email,
        password
    };
    
        await axios.post("http://localhost:4000/user/login",obj).then((response)=>{
            alert(response.data.message);
            localStorage.setItem('token',response.data.token)
            window.location.href='../addExpense/expense.html'
        })
        
    } catch (error) {
        console.log(error);
        
    }    
}
