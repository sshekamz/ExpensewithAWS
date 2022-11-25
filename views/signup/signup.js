// network call 
async function signup(event){
    try {
    
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const obj={
        name,
        email,
        password
    };
    
        let post= await axios.post("http://localhost:4000/user/signup",obj)
        
        
    
    } catch (error) {
        console.log(error);
        
    }    
}
