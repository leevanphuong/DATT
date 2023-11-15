import {addOrder} from "../../Service/order.js"
import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";
const addOrders= catchAsync(async (req, res) => {
    const order = await addOrder(req)
    return res.status(status.OK).json(order)
})
export default addOrders