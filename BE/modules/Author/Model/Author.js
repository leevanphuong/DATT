import mongoose from 'mongoose';
const cartSchema = new mongoose.Schema({
    name: String,
}, {
    timestamps: true
});

export default mongoose.model('Author', cartSchema);


