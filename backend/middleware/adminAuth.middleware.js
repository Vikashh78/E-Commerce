import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        // const { token } = req.headers;  // here token is an object

        const token = req.headers.token; //here token is string

        if(!token) {
            return res.status(401).json({success:false, message: "Not Authorized Login Again"})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if(decodedToken !== (process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)) {
            return res.status(401).json({success:false, message: "Not Authorized Login Again"})
        }

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:error.message})
    }
}

export default adminAuth;