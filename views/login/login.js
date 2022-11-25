async function login(event){
    try {
    
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const obj={
        email,
        password
    };
    
        let post= await axios.post("http://localhost:4000/user/login",obj)
        // if(post.response.status===200){
        //     alert(post.response.message)
        // }
        
        
    
    } catch (error) {
        console.log(error);
        
    }    
}
