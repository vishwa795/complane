export const authorizeUser = async (accessToken,callback) =>{
    try{
        const response = await fetch('http://localhost:4000/users/authorize',{
                    method:'GET',
                    headers:{'Content-Type':'application/json',
                'Authorization':'Bearer '+accessToken}
                })
                .then(res => res.json());
        localStorage.setItem('accessToken',response.accessToken);
        callback(response.user);
    }
    catch(error){
        console.log(error);
    }
}