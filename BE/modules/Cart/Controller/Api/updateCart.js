import catchAsync from "../../../../utils/catchAsync.js";
import { updateCart } from "../../Service/cart.js";
import status from "http-status"

const updateCarts = catchAsync(async(req,res)=>{
    const update = await updateCart(req)
    return res.status(status.OK).json(update)
})
export default updateCarts