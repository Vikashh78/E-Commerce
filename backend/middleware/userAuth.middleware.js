import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
    try {
        const token = req.headers.token;
            
        if(!token) {
            return res.status(401).json({success:false, message:'Unauthorized user'})
        }
        
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = decoded_token._id //added userId to body here

        next();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, message:error.message})
    }
}

export default authUser;