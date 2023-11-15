import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { getAllOrder } from "../../Service/order.js";
const getAllOrders = catchAsync(async (req, res) => {
    const order = await getAllOrder()
    return res.status(status.OK).json(order)
})
export default getAllOrders