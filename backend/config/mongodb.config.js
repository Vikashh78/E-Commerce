import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log(`DB Connected !! DB HOST : ${mongoose.connection.host}`);
        })
        
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        
    } catch (error) {
        console.error('MongoDB connection error', error)
        process.exit(1)
    }
}

export default connectDB;