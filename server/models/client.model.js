import mongoose from 'mongoose';
const {Schema} = mongoose;

const ClientSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    dob: Date,
})


export default mongoose.model('Client', ClientSchema)