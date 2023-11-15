import mongoose from 'mongoose'
const authSchema = mongoose.Schema({
    name: String,
    phoneNumber:{
        type: String,
        default: '',
        unique: true
    },
    email: {
        type: String,
        default: '',
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 8
    },
    address: {
        type: String,
        default: "",
        require: true
    },
    role: {
        type: String,
        default: "USER"
    }
}, {
    timestamps: true
})
export default mongoose.model("Auth", authSchema)