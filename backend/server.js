import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import connectDB from './config/mongodb.config.js'
import connectCloudinary from './config/cloudinary.config.js'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'



/* STEPS: BASIC
    1. import express, cors 
    2. App, port config
    3. middleware setup
    4. API endpoint setup
    5. server listening setup
*/

//.2
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()


//3. middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//4. api endpoits
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

app.get('/api/status', (req, res) => {
    res.send('API Working')
})


//.5
app.listen(port, () => {
    console.log('Server is listening on port', port);
})