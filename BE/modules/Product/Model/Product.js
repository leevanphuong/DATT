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
        images: {
            type: Array,
            default: [],
        },
        AuthorId: {
            type: mongoose.Types.ObjectId,
            ref: 'Author',
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
        },
    },
    {
        timestamps: true,
    },
)

export default mongoose.model('Product', productSchema)