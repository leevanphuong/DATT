import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
    name: String,
    images: {
        type: Array,
        default:"",
    },
},
    {
        timestamps: true
    })
export default mongoose.model('Category', categorySchema)
