import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
  {
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'Auth',
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Cart', cartSchema);
