import mongoose from "mongoose";
const orderSchema = mongoose.Schema({
    user: String,
    name: String,
    phoneNumber: String,
    district: String,
    commune: String,
    locationDetail: String,
    totalPrice: Number,
    status: {
      type: String,
      default:"Đang chờ duyệt"
    },
    totalprice: Number,
    city: String,
    productOrder: [
        {
          productId: String,
        },
      ],
},
    {
        timestamps: true
    }
)
export default mongoose.model("Order", orderSchema)