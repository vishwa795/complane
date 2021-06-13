export const authorizeUser = async (accessToken,callback) =>{
    try{
        console.log("This is getting called");
        const response = await fetch('http://localhost:4000/users/authorize',{
                    method:'GET',
                    headers:{'Content-Type':'application/json',
                'Authorization':'Bearer '+accessToken}
                })
                .then(res => res.json());
        console.log(response);
        localStorage.setItem('accessToken',response.accessToken);
        callback(response.user);
    }
    catch(error){
        console.log(error);
    }
}