import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        sale: Number,
        long: String,
        page: Number,
        wide: String,
        heavy: String,
        description: String,
        quantity: Number,
        language: String,
        images: {
            type: Array,
            default: [],
        },
        AuthorId: String,
        categoryId:String,
    },
    {
        timestamps: true,
    },
)

export default mongoose.model('Product', productSchema)