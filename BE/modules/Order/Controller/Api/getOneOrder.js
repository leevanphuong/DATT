import catchAsync from "../../../../utils/catchAsync.js";
import { getOneOrder } from "../../Service/order.js";
import status from "http-status"
const getOneOrders = catchAsync(async(req, res)=> {
    const orders = await getOneOrder(req)
    return res.status(status.OK).json(orders)
})

export default getOneOrders