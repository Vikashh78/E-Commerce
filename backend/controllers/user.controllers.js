import { User } from '../models/user.models.js'
import validate from 'validator'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/token.utils.js'
import jwt from 'jsonwebtoken'


// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // check for valid email
        const user = await User.findOne({email})
        if(!user) {
            return res
            .status(401)
            .json({success: false, message: 'User does not exits'})
        }

        // match the password with tha database password
        const isMatched = await bcrypt.compare(password, user.password)

        if(isMatched) {
            const token = generateToken(user._id)

            return res
            .status(200)
            .json({
                success: true,
                data: user,
                message: "Logged in successfully",
                Token: token
            })

        } else {
            return res
            .status(401)
            .json({
                success: false,
                message: "Invalid credentials"
            })
        }
        
    } catch (error) {
        console.error(error.message);
        res
        .status(500)
        .json({success:false, message: error.message})
    }
}

// Route for register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
    
        // check for existed user
        const existedUser = await User.findOne({email})
        if(existedUser) {
            return res
            .status(401)
            .json({success: false, message: 'User already exits for this email'})
        }
    
        // validate email and password
        if(!validate.isEmail(email)) {
            return res
            .status(401)
            .json({success: false, message: "Please enter a valid email"})
        }
        if(password.length < 8) {
            return res
            .status(401)
            .json({success: false, message: "Password length must be greater or equal to 8"})
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
    
        //create a new user in db
        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        })
        
        //generate token
        const token = generateToken(newUser._id)

        //return res after successfully account creation
        return res
        .status(200)
        .json({
            success: true,
            data: newUser,
            token,
            message: 'Account created successfully'
        })

    } catch (error) {
        console.log(error.message)
        return res
        .status(500)
        .json({success: false, message: error.message})
    }

}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)

            return res
            .status(200)
            .json({
                success: true,
                token, //this token will be stored in headers after res
                message: "Logged in successfully"
            })
        }

        else {
            return res.status(401).json({success: false, message: "Invalid admin credentials"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({succes:false, message:error.message})
    }
}

export {
    loginUser,
    registerUser,
    adminLogin
}