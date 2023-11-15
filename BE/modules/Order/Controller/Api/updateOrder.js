import catchAsync from "../../../../utils/catchAsync.js";
import status from "http-status"
import { updateOrder } from "../../Service/order.js";
const updateOrders = catchAsync(async(req,res)=>{
    const order = await updateOrder(req)
    return res.status(status.OK).json(order)
})
export default updateOrders