const jwt=require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    let token;
    const authHeader=req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token=authHeader.split(" ")[1];
        if(!token)
        {
            res.status(401).json({'message': 'No token, authorization denied'});
        }
        else
        {
            try{
                const decode=jwt.verify(token,process.env.JWT_SECRET);
                req.user=decode;
                console.log("The decoded user is: ",req.user);
                next();
            }
            catch(error)
            {
                res.status(400).json({'message': "Token is not valid"});
            }
        }
    }
    else
    {
        res.status(401).json({'message': 'No token, authorization denied'});   
    }
}

module.exports=verifyToken;