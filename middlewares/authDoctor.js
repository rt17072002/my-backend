import jwt from "jsonwebtoken";

//doctor authentication middleware
const authDoctor = async (req, res, next)=>{
    try{
        const dToken = req.headers.dtoken
        if(!dToken){
            return res.json({success:false, message:"Not authorized login again"});
        }
        const token_decode = jwt.verify(dToken, process.env.JWT_SECRET);

        req.docId = token_decode.id
        next();
    }catch(err){
        console.log(err);
        res.json({success:false, message:err.message});
    }
}

export default authDoctor;